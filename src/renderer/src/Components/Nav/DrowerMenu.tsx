import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { PropsWithChildren, createContext, useContext, useRef } from "react";

interface Props extends PropsWithChildren {
}
interface DrawerDisclosure {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const DrawerContext = createContext<DrawerDisclosure | null>(null);

const DrawerProvider = ({ children }:PropsWithChildren) => {
  const drawerDisclosure = useDisclosure();

  return (
    <DrawerContext.Provider value={drawerDisclosure}>
      {children}
    </DrawerContext.Provider>
  );
};
const useDrawer = (): DrawerDisclosure => {
  const drawerDisclosure = useContext(DrawerContext);
  if (!drawerDisclosure) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return drawerDisclosure;
};

// DrawerMenu component
const DrawerMenu = ({ children }:Props) => {
  const drawerDisclosure = useDrawer();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        variant="ghost"
        icon={<FiMenu fontSize="1.25rem" />}
        aria-label="Open Menu"
        onClick={drawerDisclosure.onOpen}
        ref={btnRef}
      />
      <Drawer
        isOpen={drawerDisclosure.isOpen}
        placement="left"
        onClose={drawerDisclosure.onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Showroom Galerie phone</DrawerHeader>

          <DrawerBody>{children}</DrawerBody>
          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { DrawerProvider, useDrawer, DrawerMenu };

export default DrawerMenu;
