import type { ChatResponse } from '../types';

export async function sendMessage(
  messages: { role: string; content: string }[],
): Promise<ChatResponse> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to get response');
  }

  return data;
}

export async function checkHealth(): Promise<{ status: string; hasApiKey: boolean }> {
  const response = await fetch('/api/health');
  return response.json();
}
