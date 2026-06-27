import "./globals.css";

export const metadata = {
  title: "Meal Port — Delicious meals, delivered fast",
  description:
    "Join the waitlist and be the first to experience premium food delivery that brings restaurant-quality meals straight to your door.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
