import "./globals.css";

export const metadata = {
  title: "Meal Port — Delicious meals, delivered fast",
  description:
    "Join the waitlist and be the first to experience premium food delivery that brings restaurant-quality meals straight to your door.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
