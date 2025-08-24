"use client";

import { PackageOpen } from "lucide-react";
import type { Product } from "@/lib/data";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="lg:col-span-3">
      {products.length > 0 ? (
        <div className="grid animate-accordion-down grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex h-[50vh] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card">
          <PackageOpen className="mb-4 h-16 w-16 text-muted-foreground" />
          <h3 className="text-xl font-semibold">No Products Found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
