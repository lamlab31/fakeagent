import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export function render(initialIsMobile: boolean) {
  return renderToString(<App initialIsMobile={initialIsMobile} />);
}
