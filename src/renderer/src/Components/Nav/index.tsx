import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Left from "./Left";
import Right from "./Right";
import { DrawerProvider } from "./DrowerMenu";

export default function Nav() {
  return (
    <>
    <DrawerProvider>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Left />
          <Right />
        </Flex>
      </Box>
    </DrawerProvider>
    </>
  );
}
