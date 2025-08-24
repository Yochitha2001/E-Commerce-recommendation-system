"use client";

import { useState, useMemo, useEffect } from "react";
import type { Product } from "@/lib/data";
import { FilterSidebar } from "./FilterSidebar";
import { ProductGrid } from "./ProductGrid";

interface ShopSavvyAppProps {
  products: Product[];
}

export function ShopSavvyApp({ products }: ShopSavvyAppProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 1000;
    return Math.ceil(Math.max(...products.map((p) => p.price)));
  }, [products]);

  const [priceRange, setPriceRange] = useState([0, maxPrice]);

  const categories = useMemo(() => {
    const allCategories = products.map((p) => p.category);
    return ["all", ...Array.from(new Set(allCategories))];
  }, [products]);

  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  useEffect(() => {
    let newFilteredProducts = products;
    
    if (selectedCategory !== "all") {
      newFilteredProducts = newFilteredProducts.filter(
        (p) => p.category === selectedCategory
      );
    }
    
    newFilteredProducts = newFilteredProducts.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    setFilteredProducts(newFilteredProducts);
  }, [selectedCategory, priceRange, products]);

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-4">
      <FilterSidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        maxPrice={maxPrice}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
