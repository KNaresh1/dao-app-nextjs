import {
  Button,
  Center,
  FormControl,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "ethers";
import { useForm } from "react-hook-form";
import { CreateProposalForm } from "./Types";
import useConnectStore from "./store";
import { parseUnits } from "./utils";

const CreateProposal = ({ dao }: { dao: Contract | undefined }) => {
  const { provider } = useWeb3React();

  const { setConnectStatus } = useConnectStore();

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
        ?.connect(signer || "0x0")
        .createProposal(name, formattedAmount, recipient);
      await transaction.wait();

      reset();

      setConnectStatus("Connecting");
    } catch (error) {
      console.log("Error while creating proposal. ", error);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Center>
        <Stack gap={3} w={"lg"} justify="center">
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
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
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
            variant="outline"
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
