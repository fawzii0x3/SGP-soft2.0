import {
  Icon,
  Text,
  TextProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { useDrawer } from "./DrowerMenu";

interface navLinkProps extends TextProps {
  children: ReactNode;
  href?: string;
}

const NavLink = ({ children, href, ...props }: navLinkProps) => {
  const { onClose } =   useDrawer();


  return (
    <RouterLink to={href || "/"}>
      <Text
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
        {...props}
        onClick={() => onClose()}
      >
        {children}
      </Text>
    </RouterLink>
  );
};

const NavLinks = () => {
  return (
    <>
      <NavLink >
        <Icon as={AiOutlineHome} />
      </NavLink>
      <NavLink href="/stoque" >STOQUE</NavLink>
      <NavLink href="/journalDeVente">JOURNAL DE VENTE</NavLink>
      <NavLink href="/chéque">CHÉQUE</NavLink>
      <NavLink href="/min-stock">MIN STOQUE</NavLink>
    </>
  );
};
export default NavLinks;
