export type Proposal = {
    id: number;
    name: string;
    amount: number;
    recipient: string;
    votes: number;
    finalized: boolean;
  };

  export type CreateProposalForm = {
    name: string;
    amount: string;
    recipient: string;
  }