export const COLORS = {
  primary: '#4bb050',
  white: '#fff',
  background: '#fff',
  text: '#333',
  textSecondary: '#676a71',
  textMuted: '#777',
  textLight: '#999',
  textGrey: '#666',
  border: '#f0f0f0',
  greyLight: '#f5f5f5',
  successLight: '#E8F5E8',
  warningLight: '#FFF3E0',
  success: '#4CAF50',
  star: '#FFD700',
  brandDark: '#1B4332',
  brandRed: '#2D1B1B',
  error: 'red',
} as const;

export type ColorType = typeof COLORS[keyof typeof COLORS];
