"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  maxPrice: number;
  priceRange: number[];
  onPriceChange: (range: number[]) => void;
}

export function FilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  maxPrice,
  priceRange,
  onPriceChange,
}: FilterSidebarProps) {
  return (
    <aside className="lg:col-span-1">
      <Card className="sticky top-8 shadow-sm">
        <CardHeader>
          <CardTitle>Filter Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Price Range</Label>
            <Slider
              value={priceRange}
              onValueChange={onPriceChange}
              max={maxPrice}
              step={10}
              className="pt-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
