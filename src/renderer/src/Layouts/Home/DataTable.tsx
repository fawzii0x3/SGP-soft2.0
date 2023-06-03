import {
  useToast,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  IconButton,
  ButtonGroup,
  Tfoot
} from '@chakra-ui/react'
import { useMyOrderQuery, useRemoveItemMutation } from '../../hooks/graphql'
import { MinusIcon, DeleteIcon } from '@chakra-ui/icons'

const DataTable = () => {
  const [{ data, error, fetching }] = useMyOrderQuery()
  const [,removeItem] =useRemoveItemMutation()
  const toast = useToast()
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
  if (data?.MyOrder) {
    return (
      <>
        {data.MyOrder.soldItems.length > 0 ? (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Produit</Th>
                  <Th>Quantity</Th>
                  <Th>Prix</Th>
                  <Th>Totale</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.MyOrder.soldItems.map(({ name, quantity, id, soldPrice }) => {
                  return (
                    <Tr key={id}>
                      <Td width="fit-content">
                        <ButtonGroup size="sm" spacing="2">
                          <IconButton
                            onClick={async () => {
                              await removeItem({id})
                            }}
                            aria-label={'add'}
                            icon={<MinusIcon />}
                            colorScheme="purple"
                          />
                          <IconButton
                            onClick={async () => {}}
                            aria-label="delete"
                            variant="outline"
                            icon={<DeleteIcon />}
                            colorScheme="red"
                          />
                        </ButtonGroup>
                      </Td>
                      <Td>{name}</Td>
                      <Td textAlign="start">{quantity}</Td>
                      <Td textAlign="start">{soldPrice} D.T</Td>
                      <Td textAlign="start">{(soldPrice * quantity).toFixed(2)} D.T</Td>
                    </Tr>
                  )
                })}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th colSpan={4}>Total</Th>
                  <Th>
                    {data.MyOrder.soldItems
                      .reduce((a, b) => a + b.quantity * b.soldPrice, 0)
                      .toFixed(2)}
                    D.T
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        ) : null}
      </>
    )
  } else {
    return <></>
  }
}

export default DataTable
