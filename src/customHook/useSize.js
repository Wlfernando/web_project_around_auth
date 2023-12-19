import { useState, useEffect } from 'react';

export default function useSize(num = 1024) {
  const [viewPort, setViewPort] = useState(
    window.innerWidth >= num
      ? 'desktop'
      : 'other'
  )

  useEffect(()=> {
    window.onresize = (e) => {
      const reSize = e.currentTarget.innerWidth

      setViewPort(reSize >= num ? 'desktop' : 'other')
    }
  }, [num])

  return viewPort
}