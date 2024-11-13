import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/config/fonts/fonts";
import { Provider } from "@/components";


export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop',
    default: 'Home - Teslo | Shop'
  },
  description: "Tienda de Teslo Shop, ropa urbana en parana entre rios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
