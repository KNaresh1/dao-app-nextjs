// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "./Token.sol";

/**
 * Governs Treasury
 */
contract DAO {
    address owner;
    Token public token;
    uint256 public quorum;
    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(address => mapping(uint256 => bool)) public votes;

    struct Proposal {
        uint256 id;
        string name;
        uint256 amount;
        address payable recipient;
        uint256 votes;
        bool finalized;
    }

    event Propose(
        uint256 id,
        uint256 amount,
        address recipient,
        address creator
    );

    event Vote(uint256 id, address investor);

    event Finalize(uint256 id);

    constructor(Token _token, uint256 _quorum) {
        owner = msg.sender;
        token = _token;
        quorum = _quorum;
    }

    // Allow contract to receive ether
    receive() external payable {}

    // Only investor
    modifier onlyDAOMember() {
        require(token.balanceOf(msg.sender) > 0, "Must be token holder");
        _;
    }

    // For eg. _name: Fund Website Development (propsal name)
    function createProposal(
        string memory _name,
        uint256 _amount,
        address payable _recipient
    ) external onlyDAOMember {
        require(address(this).balance >= _amount, "Not enough funds");

        proposalCount++;

        // Create Proposal
        proposals[proposalCount] = Proposal(
            proposalCount,
            _name,
            _amount,
            _recipient,
            0,
            false
        );

        emit Propose(proposalCount, _amount, _recipient, msg.sender);
    }

    function vote(uint256 _id) external onlyDAOMember {
        require(!votes[msg.sender][_id], "Already voted");

        Proposal storage proposal = proposals[_id];

        proposal.votes += token.balanceOf(msg.sender);

        votes[msg.sender][_id] = true;

        emit Vote(_id, msg.sender);
    }

    // Finalize proposal and transfer fund to recipient
    function finalizeProposal(uint256 _id) external onlyDAOMember {
        Proposal storage proposal = proposals[_id];

        require(!proposal.finalized, "Proposal already finalized");

        proposal.finalized = true;

        require(
            proposal.votes >= quorum,
            "Must reach quorum to finalize proposal"
        );

        require(address(this).balance >= proposal.amount);

        (bool sent, ) = proposal.recipient.call{value: proposal.amount}("");

        require(sent);

        emit Finalize(_id);
    }
}
