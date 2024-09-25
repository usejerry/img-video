import { memo, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import './header.less'

const Header = () => {
  const router = useNavigate()
  const location = useLocation()

  const [nanAct, setNanAct] = useState('/home') // 默认当前路由

  const nanList = [
    { name: '图片', path: '/home' },
    { name: '视频', path: '/home/video' },
  ]

  function toDetail(path: string) {
    setNanAct(path)
    router(path)
  }
  // 初始化
  useEffect(() => {
    setNanAct(location.pathname)
  }, []);
  return (
    <div className='header-box'>
      {
        nanList.map((item, index) => (
          <div className={["nav-li", item.path === nanAct ? 'act' : ''].join(' ')} onClick={() => toDetail(item.path)} key={index}>{item.name}</div>
        ))
      }
    </div>
  )
}

export default memo(Header)