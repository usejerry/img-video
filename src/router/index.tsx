import { lazy } from 'react'
import { createHashRouter, Navigate } from 'react-router-dom'

// 引入方法一
const Home = lazy(() => import('../pages/home/index'))

export default createHashRouter([
  {
    path: '/',
    element: <Navigate replace to="/home" />
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'video'
      }
    ],
  }
])
