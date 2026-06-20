export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export type JarvisState = 'idle' | 'listening' | 'thinking' | 'speaking';

export interface ChatResponse {
  message: string;
  error?: string;
}
