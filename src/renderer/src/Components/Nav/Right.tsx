import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Flex,
  Stack,
  Button,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Logo from "../../assets/logo.png";
import { useLogoutMutation } from "../../hooks/graphql";
import { useNavigate } from "react-router-dom";
type Props = {};

const Right = ({}: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [, logout] = useLogoutMutation();
  const navigate = useNavigate()

  return (
    <>
      <Flex alignItems={"center"}>
        <Stack direction={"row"} spacing={7}>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar size={"sm"} src={Logo} />
            </MenuButton>
            <MenuList alignItems={"center"}>
              <Center>
                <Avatar size={"2xl"} src={Logo} />
              </Center>
              <Center>
                <Text>Showroom Galerie phone</Text>
              </Center>
              <MenuDivider />
              <MenuItem>
                <Text>Profile</Text>
              </MenuItem>
              <MenuItem>
                <Text>Account Settings</Text>
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  await logout({});
                  navigate("/login")
                }}
              >
                <Text>Logout</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
    </>
  );
};

export default Right;
