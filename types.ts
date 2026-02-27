
export enum DeviceView {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  DESKTOP = 'DESKTOP',
  FULL = 'FULL'
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface AppState {
  currentView: DeviceView;
  isSidebarOpen: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  iframeUrl: string;
}
