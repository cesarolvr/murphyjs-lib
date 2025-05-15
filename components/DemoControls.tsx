import { useCallback } from "react";

interface DemoControlsProps {
  containerId: string;
}

export function DemoControls({ containerId }: DemoControlsProps) {
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
    <div className="demo-controls">
      <button onClick={handleReset} className="demo-button reset-button">
        Reset
      </button>
      <button onClick={handlePlay} className="demo-button">
        Play
      </button>
    </div>
  );
}
