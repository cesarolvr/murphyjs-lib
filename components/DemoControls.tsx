import { useCallback } from 'react'

interface DemoControlsProps {
  containerId: string
}

export function DemoControls({ containerId }: DemoControlsProps) {
  const handlePlay = useCallback(() => {
    if (typeof window !== 'undefined' && window.murphy) {
      const container = document.getElementById(containerId)
      if (container) {
        const elements = container.querySelectorAll('[data-murphy]')
        elements.forEach(element => {
          element.classList.remove('murphy-animated')
          element.style.opacity = '0'
        })
        window.murphy.play()
      }
    }
  }, [containerId])

  return (
    <div className="demo-controls">
      <button onClick={handlePlay} className="demo-button">
        Play Animation
      </button>
    </div>
  )
} 