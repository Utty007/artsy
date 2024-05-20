import "./globals.css";
import Header from "./Components/Header";

export const metadata = {
  title: "Artsy",
  description: "By Utty",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
