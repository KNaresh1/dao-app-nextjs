import { Flex, Spacer, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";

const NavBar = ({ account }: { account: string | undefined }) => {
  return (
    <Flex align="center" gap="2" py="4">
      <Image src={logo} alt="Logo" style={{ width: "40px", height: "40px" }} />
      <Link href="/">
        <Text fontSize="lg">Decentralized App DAO</Text>
      </Link>
      <Spacer />
      {account && <Text fontSize="md">{account}</Text>}
    </Flex>
  );
};

export default NavBar;
