import "./globals.css";

export const metadata = {
  title: "Offshore in the Gray Zone",
  description:
    "Public demo for a QSS 20 project on Georgian elites, post-Soviet capital, and offshore secrecy strategies."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
