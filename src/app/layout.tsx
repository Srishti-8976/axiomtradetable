import "./globals.css";
import ReactQueryProvider from "./providers/ReactQueryProvider";

export const metadata = {
  title: "Axiom Trade Table",
  description: "Token discovery dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
