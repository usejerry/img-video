import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom';
import Loading from '@/components/loading/index'
import Header from '@/layout/header';

import './index.less';

const DrawImg = lazy(() => import('@/pages/drawImg/index'))
const DrawVideo = lazy(() => import('@/pages/drawVideo/index'))


const Index = () => {
  return <>
    <div className='home-box'>
      <Header></Header>
      <div className='main'>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<DrawImg />} />
            <Route path="/video" element={<DrawVideo />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  </>
}

export default Index