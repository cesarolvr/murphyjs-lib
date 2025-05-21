import { useCallback } from "react";

interface DemoControlsProps {
  containerId: string;
  isFixed?: boolean;
  group?: string;
  controlLabels?: {
    reset?: string;
    play?: string;
  };
}

export function DemoControls({ containerId, isFixed = false, group, controlLabels }: DemoControlsProps) {
  const handleReset = useCallback(() => {
    if (typeof window !== "undefined" && window.murphy) {
      window.murphy.reset(group);
    }
  }, [group]);

  const handlePlay = useCallback(() => {
    if (typeof window !== "undefined" && window.murphy) {
      window.murphy.play(group);
    }
  }, [group]);

  return (
    <div className={`demo-controls ${isFixed ? 'demo-controls-fixed' : ''}`}>
      <button onClick={handleReset} className="demo-button reset-button">
        {controlLabels?.reset || 'Reset'}
      </button>
      <button onClick={handlePlay} className="demo-button">
        {controlLabels?.play || 'Play'}
      </button>
    </div>
  );
}
 