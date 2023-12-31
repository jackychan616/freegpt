import '@/styles/globals.css'
import {MantineProvider,ColorSchemeProvider,ColorScheme} from "@mantine/core"
import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = (theme) =>
    setColorScheme(colorScheme === 'dark' ? 'gray' : 'dark');
  return (
  
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <Component {...pageProps} />
          <Analytics/>
        </MantineProvider>
      </ColorSchemeProvider>
  )

}
