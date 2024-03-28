'use client';
import { Provider } from 'react-redux';
import { store } from '@/app/GlobalRedux/store';
import { persistor } from '@/app/GlobalRedux/store';
import { Toaster } from '@/components/ui/toaster';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import NavBar from '@/components/Navbar/Navbar';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default function App({ children }) {
  const pathname = usePathname();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SessionProvider>
            {!pathname.startsWith('/dashboard') && <NavBar />}

            {children}
          </SessionProvider>
          <Toaster />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
