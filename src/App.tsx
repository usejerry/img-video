import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom';
import Loading from '@/components/loading/index'
import '@/assets/css/_reset.less';
import router from './router'
import './App.css'

function App() {

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  )
}

export default App
