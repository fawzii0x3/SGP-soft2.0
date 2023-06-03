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
  IconButton,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { dataTableHeader } from '../Stock/constant'
import { useHandelOrderMutation, useItemsQuery, useMeUserQuery } from '../../hooks/graphql'
import React from 'react'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { useFormik } from 'formik'

const UpperForm = () => {
  const [{ fetching, data, error }] = useItemsQuery()
  const [, handelOrder] = useHandelOrderMutation()
  const [user] = useMeUserQuery()
  const toast = useToast()
  const barCodeFormik = useFormik({
    initialValues: {
      id: ''
    },
    onSubmit(values, { resetForm }) {
      handelOrder({ id: values.id })
      resetForm()
    }
  })
  const serachFormik = useFormik({
    initialValues: {
      data: ''
    },
    onSubmit() {}
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
    const newData = data.items
      .map((itm) => {
        return {
          ...itm,
          brand: itm.brand.name,
          supplier: itm!.supplier!.name
        }
      })
      .filter(({ brand, model }) => {
        const searchWords = serachFormik.values.data.toLowerCase().trim().split(/\s+/)
        brand = brand.toLowerCase().trim()
        model = model.toLowerCase().trim()

        const combinedSearchWord = `${brand} ${model}` // Combine brand and model
        const reversedCombinedSearchWord = `${model} ${brand}` // Combine model and brand in reverse order

        return searchWords.every((word) =>
          [brand, model, combinedSearchWord, reversedCombinedSearchWord].some((value) =>
            value.includes(word)
          )
        )
      })
    return (
      <>
        <Flex justifyContent={'space-around'}>
          <form onSubmit={barCodeFormik.handleSubmit}>
            <FormControl isInvalid={!!barCodeFormik.errors.id && barCodeFormik.touched.id}>
              <FormLabel htmlFor="id">Code a barre</FormLabel>
              <Input
                id="id"
                name="id"
                type="text"
                variant="filled"
                value={barCodeFormik.values.id}
                onChange={barCodeFormik.handleChange}
                tabIndex={1}
              />
              <FormErrorMessage>{barCodeFormik.errors.id}</FormErrorMessage>
            </FormControl>
          </form>
          <form onSubmit={serachFormik.handleSubmit}>
            <FormControl isInvalid={!!serachFormik.errors.data && serachFormik.touched.data}>
              <FormLabel htmlFor="data">recherche</FormLabel>
              <InputGroup>
                <Input
                  id="data"
                  name="data"
                  type="text"
                  variant="filled"
                  value={serachFormik.values.data}
                  onChange={serachFormik.handleChange}
                  tabIndex={1}
                />
                <InputRightElement>
                  <IconButton aria-label="clear" icon={<CloseIcon/>} colorScheme='red' onClick={()=>{
                    serachFormik.setValues({data:""})
                  }}/>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{serachFormik.errors.data}</FormErrorMessage>
            </FormControl>
          </form>
        </Flex>
        {serachFormik.values.data.length > 0 && newData.length > 0 ? (
          <TableContainer>
            <Table variant="simple" size="sm">
              {/* <TableCaption>©Showroom galarie phone</TableCaption> */}
              <Thead>
                <Tr>
                  <Th></Th>
                  {dataTableHeader.map(({ value, check }, idx) => {
                    return check || user.data?.meUser?.privilege ? (
                      <React.Fragment key={idx}>
                        <Th>{value}</Th>
                      </React.Fragment>
                    ) : null
                  })}
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
                    maxPrice,
                    minQuantity
                  }) => {
                    return (
                      <Tr key={id}>
                        <Td>
                          <IconButton
                            onClick={async () => {
                              await handelOrder({
                                id
                              })
                            }}
                            aria-label={'add'}
                            icon={<AddIcon />}
                            colorScheme="purple"
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
                      </Tr>
                    )
                  }
                )}
              </Tbody>
              <Tfoot></Tfoot>
            </Table>
          </TableContainer>
        ) : null}
      </>
    )
  } else {
    return <p>un erreur</p>
  }
}
export default UpperForm
