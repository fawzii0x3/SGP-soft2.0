import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import LoginForm from '../Layouts/LoginForm'
import Stock from '../Layouts/Stock/Stock'
import Home from '../Layouts/Home/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement:<App />,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: '/stoque',
        element: <Stock />
      },
      {
        path: '/journalDeVente',
        element: <p>hello</p>
      },
      {
        path: '/chéque',
        element: <p>hello</p>
      },
      {
        path: '/min-stock',
        element: <p>hello</p>
      }
    ]
  },
  {
    path: '/login',
    element: <LoginForm />
  }
])
