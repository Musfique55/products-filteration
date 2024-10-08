import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Registration from './components/Registration/Registration.jsx'
import AuthProvider from './AuthProvider/AuthProvider.jsx'
import Login from './components/Login/Login.jsx'
import Layout from './Layout/Layout.jsx';
import Home from './components/Home/Home.jsx'
import SearchPage from './components/SearchPage/SearchPage.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'
const router = createBrowserRouter([
  {
    path : '/',
    element : <Layout></Layout>,
    children : [
      {
        path : '/',
        element  : <PrivateRoute><Home></Home></PrivateRoute>,
        loader : () =>  fetch('https://product-filteration-server.vercel.app/products-count')
      },
      {
        path : '/login',
        element  : <Login></Login>
      },
      {
        path : '/register',
        element  : <Registration></Registration>
      },
      {
        path : '/search/:id',
        element : <SearchPage></SearchPage>,
        loader : ({params}) => fetch(`https://product-filteration-server.vercel.app/search/${params.id}`)
      }
    ]
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router}>
    </RouterProvider>
    </AuthProvider>
    
  </StrictMode>,
)
