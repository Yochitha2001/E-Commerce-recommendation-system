"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, ThumbsDown, Bookmark, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";


interface ProductCardProps {
  product: Product;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-5 w-5",
          i < rating ? "text-accent fill-accent" : "text-muted-foreground/30"
        )}
      />
    ))}
  </div>
);

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="relative p-0">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={400}
          className="aspect-video w-full object-cover"
          data-ai-hint={product.aiHint}
        />
        <Badge variant="secondary" className="absolute top-3 right-3">{product.category}</Badge>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col p-4">
        <CardTitle className="mb-2 text-lg font-semibold">{product.name}</CardTitle>
        <CardDescription className="mb-4 flex-grow text-sm text-muted-foreground">
          {product.description}
        </CardDescription>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
          <StarRating rating={product.rating} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 bg-muted/30 p-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => setIsBookmarked(!isBookmarked)} aria-label="Save for later">
                <Bookmark className={cn('h-5 w-5 transition-colors', isBookmarked ? 'text-accent fill-accent' : 'text-muted-foreground hover:text-accent')} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Save for later</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
             <Button variant="ghost" size="icon" onClick={() => setIsLiked(!isLiked)} aria-label="Like">
                <Heart className={cn('h-5 w-5 transition-colors', isLiked ? 'text-destructive fill-destructive' : 'text-muted-foreground hover:text-destructive')} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Like</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => setIsDisliked(!isDisliked)} aria-label="Dislike">
                <ThumbsDown className={cn('h-5 w-5 transition-colors', isDisliked ? 'text-primary fill-primary' : 'text-muted-foreground hover:text-primary')} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Not for me</p>
          </TooltipContent>
        </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
