interface Murphy {
  play: (group?: string) => void;
  pause: () => void;
  stop: () => void;
  reset: (group?: string) => void;
}

declare global {
  interface Window {
    murphy: Murphy;
  }
}

export {}; 