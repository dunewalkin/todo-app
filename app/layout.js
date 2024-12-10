import '../styles/globals.scss'; 

export const metadata = {
  title: 'My App',
  description: 'My Next.js Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
