interface Murphy {
  play: () => void;
  pause: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    murphy: Murphy;
  }
}

export {}; 