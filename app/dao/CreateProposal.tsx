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
import { useForm } from "react-hook-form";
import useContractStore from "../store";
import { CreateProposalForm } from "../utils/types";
import { parseUnits } from "../utils/utils";

const CreateProposal = () => {
  const { provider } = useWeb3React();

  const dao = useContractStore((s) => s.dao);

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateProposalForm>();

  const onSubmit = handleSubmit(async (data) => {
    const { name, amount, recipient } = data;
    const formattedAmount = parseUnits(amount);

    try {
      const signer = await provider?.getSigner();
      const transaction = await dao
        .connect(signer || "0x0")
        .createProposal(name, formattedAmount, recipient);
      await transaction.wait();

      reset();
    } catch (error) {
      console.log("Error while creating proposal. ", error);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Center py={8}>
        <Stack gap={4} w={"lg"}>
          <FormControl isRequired>
            <Input
              id="name"
              placeholder="Enter Proposal Name"
              {...register("name")}
            />
          </FormControl>
          <FormControl isRequired>
            <NumberInput>
              <NumberInputField id="amount" {...register("amount")} />
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <Input
              id="recipient"
              placeholder="Enter Recipient Address"
              {...register("recipient")}
            />
          </FormControl>
          <Button
            mt={2}
            mb={2}
            width="lg"
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
