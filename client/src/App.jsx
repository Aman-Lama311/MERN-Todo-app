import React from 'react'
import SignIn from './Pages/SignIn'
import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import { RouterProvider } from 'react-router'
import Home from './Pages/Home'
import SignUp from './components/SignUp'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/signIn',
          element: <SignIn />
        },
        {
          path: '/signUp',
          element: <SignUp />
        }
        
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
