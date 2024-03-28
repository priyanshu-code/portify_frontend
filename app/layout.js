import './globals.css';
import { Inter } from 'next/font/google';
import { Roboto } from 'next/font/google';
import Provider from './GlobalRedux/provider';
import Footer from '@/components/Footer/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});
export const metadata = {
  title: 'Portify',
  description: 'Explore Portify: Your project showcasing website powered by Next.js. Revolutionize personal branding with diverse templates, a user-friendly dashboard, and analytics!',
  openGraph: {
    title: 'Portify',
    type: 'website',
    description: 'Explore Portify: Your project showcasing website powered by Next.js. Revolutionize personal branding with diverse templates, a user-friendly dashboard, and analytics!',
    url: 'https://portify.website',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_AWS_S3_URL}logoMeta.png`,
        width: 475,
        height: 316,
      },
    ],
  },
  twitter: {
    title: 'Portify',
    description: 'Explore Portify: Your project showcasing website powered by Next.js. Revolutionize personal branding with diverse templates, a user-friendly dashboard, and analytics!',
    images: [`${process.env.NEXT_PUBLIC_AWS_S3_URL}logoMeta.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <meta name='theme-color' />
      <Script async src='https://www.googletagmanager.com/gtag/js?id=G-7B8VQVXX8Y'></Script>
      <Script id='google-analytics'>
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-7B8VQVXX8Y');`}
      </Script>
      <title>Portify</title>
      <body className={`${roboto.className} `}>
        {/* Navbar is in provider.jsx in Global Redux */}
        <Provider>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
