import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Spinner,
  useToast,
  Checkbox,
  IconButton,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  Text
} from '@chakra-ui/react'
import { dataTableHeader, valuesKeys2 } from '../constant'
import {
  UpdateItemInput,
  useEditItemMutation,
  useItemsQuery,
  useMeUserQuery,
  useRemoveItemMutation
} from '../../../hooks/graphql'
import { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import React from 'react'
import { useFormik } from 'formik'

const DataTable = () => {
  const [{ fetching, data, error }] = useItemsQuery()
  const [user] = useMeUserQuery()
  const toast = useToast()
  const [checkedItems, setCheckedItems] = useState([false, false])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const deleteModel = useDisclosure()
  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked
  const [, EditItem] = useEditItemMutation()
  const [selectedItemId, setSelectedItemId] = useState<string>('')
  const [,removeItem] = useRemoveItemMutation()
  const { values, errors, touched, handleChange, handleSubmit, setValues } =
    useFormik<UpdateItemInput>({
      initialValues: {
        brandName: '',
        buyPrice: 0,
        color: '',
        maxPrice: 0,
        minPrice: 0,
        minQuantity: 0,
        model: '',
        quantity: 0,
        supplierName: ''
      },
      onSubmit: async (data) => {
        data.buyPrice = Number(data.buyPrice)
        data.minQuantity = Number(data.minQuantity)
        data.quantity = Number(data.quantity)
        data.minPrice = Number(data.minPrice)
        data.maxPrice = Number(data.maxPrice)
        await EditItem({
          data,
          id: selectedItemId
        })
        // if (res.data!.createItem.errors && res.data!.createItem.errors!.length > 0) {
        //   if (res.data!.createItem.errors[0].target === 'NaN') {
        //     console.log(res.data!.createItem.errors)
        //   } else {
        //     setErrors({
        //       [res.data!.createItem.errors[0].target]: res.data!.createItem.errors[0].message
        //     })
        //   }
        // } else {
        onClose()
        //   resetForm()
        // }
      }
    })
  if (fetching) {
    return <Spinner />
  }
  if (error) {
    toast({
      position: 'top-right',
      title: `${error.message}`,
      status: 'error',
      isClosable: true
    })
    return <p>{error.message}</p>
  }
  if (data?.items) {
    const newData = data.items.map((itm) => {
      return {
        ...itm,
        isChecked: true,
        brand: itm.brand.name,
        supplier: itm!.supplier!.name
      }
    })
    return (
      <>
        <TableContainer>
          <Table variant="simple" size="sm">
            {/* <TableCaption>©Showroom galarie phone</TableCaption> */}
            <Thead>
              <Tr>
                <Th>
                  <Checkbox
                    isChecked={allChecked}
                    isIndeterminate={isIndeterminate}
                    onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
                  />
                </Th>
                {dataTableHeader.map(({ value, check }, idx) => {
                  return check || user.data?.meUser?.privilege ? (
                    <React.Fragment key={idx}>
                      <Th>{value}</Th>
                    </React.Fragment>
                  ) : null
                })}
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {newData.map(
                ({
                  id,
                  brand,
                  model,
                  color,
                  supplier,
                  quantity,
                  minPrice,
                  buyPrice,
                  isChecked,
                  maxPrice,
                  minQuantity
                }) => {
                  return (
                    <Tr key={id}>
                      <Td>
                        <Checkbox
                          isChecked={isChecked}
                          onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
                        />
                      </Td>
                      <Td>{id}</Td>
                      <Td>{supplier}</Td>
                      <Td>{brand}</Td>
                      <Td>{model}</Td>
                      <Td>{color}</Td>
                      <Td>{quantity}</Td>
                      <Td>{minQuantity}</Td>
                      <Td>{buyPrice}</Td>
                      <Td>{minPrice}</Td>
                      <Td>{maxPrice}</Td>
                      <Td>
                        <Menu>
                          <MenuButton>
                            <IconButton
                              size="sm"
                              aria-label="Search database"
                              icon={<BsThreeDots />}
                            />
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              onClick={() => {
                                setSelectedItemId(id)
                                setValues({
                                  brandName: brand,
                                  buyPrice,
                                  color: color || '',
                                  maxPrice,
                                  minPrice,
                                  minQuantity,
                                  model,
                                  quantity,
                                  supplierName: supplier
                                })
                                onOpen()
                              }}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setSelectedItemId(id)
                                deleteModel.onOpen()
                              }}
                            >
                              delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  )
                }
              )}
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>
        <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Produit</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <Stack spacing="5">
                  <Text>Code a barre</Text>
                  <Text>{selectedItemId}</Text>
                </Stack>
                {valuesKeys2.map(({ key, Label }, idx) => {
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
                            value={values[key]}
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
                tabIndex={valuesKeys2.length + 1}
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
        <Modal isOpen={deleteModel.isOpen} onClose={deleteModel.onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Supprimer Produit</ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>

            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={async () => {
                  await removeItem({id:selectedItemId})
                  deleteModel.onClose()
                }}
              >
                Confirmer
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  } else {
    return <p>un erreur</p>
  }
}

export default DataTable
