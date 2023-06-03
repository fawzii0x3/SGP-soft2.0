import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Grid,
  GridItem,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  ModalFooter
} from '@chakra-ui/react'
import { CreateItemInput, useCreateItemMutation } from '@renderer/hooks/graphql'
import { useFormik } from 'formik'
import { initialValues, valuesKeys } from '../constant'

const AjouterProduit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [, createItem] = useCreateItemMutation()
  const { values, errors, touched, handleChange, handleSubmit } = useFormik<CreateItemInput>({
    initialValues,
    onSubmit: async (data, { resetForm, setErrors }) => {
      data.buyPrice = Number(data.buyPrice)
      data.minQuantity = Number(data.minQuantity)
      data.quantity = Number(data.quantity)
      data.minPrice = Number(data.minPrice)
      data.maxPrice = Number(data.maxPrice)
      const res = await createItem({
        data
      })
      if (res.data!.createItem.errors && res.data!.createItem.errors!.length > 0) {
        if (res.data!.createItem.errors[0].target === 'NaN') {
          console.log(res.data!.createItem.errors)
        } else {
          setErrors({
            [res.data!.createItem.errors[0].target]: res.data!.createItem.errors[0].message
          })
        }
      } else {
        onClose()
        resetForm()
      }
    }
  })
  return (
    <>
      <Button onClick={onOpen}>Ajouter Produit</Button>
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Produit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              {valuesKeys.map(({ key, Label }, idx) => {
                return (
                  <GridItem key={idx}>
                    <Stack spacing="5">
                      <FormControl isInvalid={!!errors[key] && touched[key]}>
                        <FormLabel htmlFor={key}>{Label}</FormLabel>
                        <Input
                          id={key}
                          name={key}
                          type={typeof values[key] === 'string' ? 'text' : 'number'}
                          variant="filled"
                          value={values[key]!.toString()}
                          onChange={handleChange}
                          tabIndex={idx + 1}
                        />
                        <FormErrorMessage>{errors[key]}</FormErrorMessage>
                      </FormControl>
                    </Stack>
                  </GridItem>
                )
              })}
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              tabIndex={valuesKeys.length + 1}
              w={'full'}
              onClick={async () => {
                handleSubmit()
              }}
            >
              Confirmer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AjouterProduit
