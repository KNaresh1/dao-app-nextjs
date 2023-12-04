import {
  Button,
  Center,
  FormControl,
  Input,
  NumberInput,
  NumberInputField,
  Stack,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useContractStore from "../store";
import { loadProposals } from "../utils";
import { CreateProposalForm } from "../utils/types";
import { parseUnits } from "../utils/utils";

const CreateProposal = () => {
  const { provider } = useWeb3React();

  const [dao, addProposals] = useContractStore((s) => [s.dao, s.addProposals]);

  const [proposalName, setProposalName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateProposalForm>();

  const onSubmit = handleSubmit(async () => {
    console.log("data....", proposalName, amount, recipient);
    const formattedAmount = parseUnits(amount);

    try {
      const signer = await provider?.getSigner();
      const transaction = await dao
        .connect(signer || "0x0")
        .createProposal(proposalName, formattedAmount, recipient);
      await transaction.wait();

      reset();
      loadProposals(dao, addProposals);
    } catch (error) {
      console.log("Error while creating proposal. ", error);
    }
  });

  const reset = () => {
    setProposalName("");
    setAmount("");
    setRecipient("");
  };

  return (
    <form onSubmit={onSubmit}>
      <Center py={8}>
        <Stack gap={4} w={"md"}>
          <FormControl isRequired>
            <Input
              id="proposalName"
              size="sm"
              placeholder="Proposal Name"
              value={proposalName}
              onChange={(e) => setProposalName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <NumberInput
              size="sm"
              value={amount}
              onChange={(value) => setAmount(value)}
            >
              <NumberInputField id="amount" placeholder="Amount" />
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <Input
              id="recipient"
              size="sm"
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </FormControl>
          <Button
            mt={2}
            mb={2}
            width="md"
            colorScheme="blue"
            isLoading={isSubmitting}
            type="submit"
          >
            Create Proposal
          </Button>
        </Stack>
      </Center>
    </form>
  );
};

export default CreateProposal;
