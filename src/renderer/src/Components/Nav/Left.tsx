import { useBreakpointValue, Flex } from "@chakra-ui/react";
import DrawerMenu from "./DrowerMenu";
import NavLinks from "./NavLinks";

type Props = {};

const Left = ({}: Props) => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <>
      {isDesktop ? (
        <Flex flex="1">
          <NavLinks />
        </Flex>
      ) : (
        <DrawerMenu>
          <NavLinks  />
        </DrawerMenu>
      )}
    </>
  );
};

export default Left;
