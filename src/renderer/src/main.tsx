import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'urql'
import client  from './utils/urql/client'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import { router } from './router'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac'
  }
}

const theme = extendTheme({ colors })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  // </React.StrictMode>
)
