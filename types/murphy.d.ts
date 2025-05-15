interface Murphy {
  play: () => void;
  pause: () => void;
  stop: () => void;
  reset: () => void;
}

declare global {
  interface Window {
    murphy: Murphy;
  }
}

export {}; 