import { useEffect } from 'react'

interface DemoContainerProps {
  children: React.ReactNode
  className?: string
}

export function DemoContainer({ children, className = '' }: DemoContainerProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.murphy) {
      window.murphy.play()
    }
  }, [])

  return (
    <div className={`demo-container ${className}`}>
      {children}
    </div>
  )
} 