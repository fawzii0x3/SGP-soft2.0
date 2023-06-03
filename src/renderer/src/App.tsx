import { Outlet, useNavigate } from 'react-router-dom'
import { useMeUserQuery } from './hooks/graphql'
import { Spinner } from '@chakra-ui/react'
import Nav from './Components/Nav'
import "./style.css"
function App(): JSX.Element {
  const [{ data, error, fetching }] = useMeUserQuery()
  const navigate = useNavigate()
  if (fetching) {
    return <Spinner />
  }
  if (!data?.meUser || error) {
    navigate('/login')
  }
  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}

export default App
