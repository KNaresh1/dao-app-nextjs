import { Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";

const NavBar = ({ account }: { account: string | undefined }) => {
  return (
    <nav className="flex space-x-3 mb-6 h-20 items-center">
      <Image src={logo} alt="Logo" style={{ width: "40px", height: "40px" }} />
      <Link href="/">
        <Text fontSize="md">Decentralized App DAO</Text>
      </Link>
      {account && <Text fontSize="md">{account}</Text>}
    </nav>
  );
};

export default NavBar;
