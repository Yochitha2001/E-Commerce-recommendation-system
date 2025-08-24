import { ShoppingBag } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4 md:px-6">
        <ShoppingBag className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-3xl font-bold text-primary">
          ShopSavvy
        </h1>
      </div>
    </header>
  );
}
