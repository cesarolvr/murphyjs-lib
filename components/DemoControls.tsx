import { useCallback } from "react";

interface DemoControlsProps {
  containerId: string;
  isFixed?: boolean;
}

export function DemoControls({ containerId, isFixed = false }: DemoControlsProps) {
  const handleReset = useCallback(() => {
    if (typeof window !== "undefined" && window.murphy) {
      window.murphy.reset();
    }
  }, []);

  const handlePlay = useCallback(() => {
    if (typeof window !== "undefined" && window.murphy) {
      window.murphy.play();
    }
  }, []);

  return (
    <div className={`demo-controls ${isFixed ? 'demo-controls-fixed' : ''}`}>
      <button onClick={handleReset} className="demo-button reset-button">
        Reset
      </button>
      <button onClick={handlePlay} className="demo-button">
        Play
      </button>
    </div>
  );
}
 