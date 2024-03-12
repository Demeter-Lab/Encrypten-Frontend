import "./globals.css";
import { WalletProvider } from "@/context/WalletContext";

export const metadata = {
  title: "Encrypten",
  description: "Encrypten - Voting with hidden votes until round completes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
