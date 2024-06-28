export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};
import "./layout.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}