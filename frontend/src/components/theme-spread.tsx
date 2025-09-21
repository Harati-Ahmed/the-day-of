'use client';

import { useTheme } from '@/contexts/theme-context';

interface ThemeSpreadProps {
  children: React.ReactNode;
}

export default function ThemeSpread({ children }: ThemeSpreadProps) {
  const themeContext = useTheme();

  if (!themeContext) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
