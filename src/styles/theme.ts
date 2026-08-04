export const theme = {
  colors: {
    brandGreen: '#018742',
    brandGreenLight: '#70dc8d',
    overlayStart: 'rgba(19, 19, 19, 0.4)',
    overlayEnd: 'rgba(19, 19, 19, 0.95)',
    surface: 'rgba(255, 255, 255, 0.08)',
    surfaceBorder: 'rgba(255, 255, 255, 0.1)',
    white: '#ffffff',
    ctaText: '#f9fff5',
    mutedText: '#bdcabc',
    textPrimary: '#e5e2e1',
    placeholderText: '#6b7280',
    cardBackground: '#201f1f',
    cardBorder: '#3e4a3f',
    inputBackground: '#0e0e0e',
    danger: '#ff6b6b',
  },
  fonts: {
    heading: "'Be Vietnam Pro', system-ui, sans-serif",
  },
  radii: {
    md: '12px',
    pill: '9999px',
  },
} as const;

export type Theme = typeof theme;
