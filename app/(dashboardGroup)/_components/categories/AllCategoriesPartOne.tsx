import React from 'react'
import { CategoryWithProperties } from "../../_types/category_types";
import Link from 'next/link';
import { Home } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
const AllCategoriesPartOne = ({ categories }:{categories: CategoryWithProperties[]}) => {
  return (
    <section className="bg-muted/50 p-6 rounded-xl border">
      <h2 className="text-xl font-semibold mb-4 tracking-tight">
        Available Categories
      </h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`#${category.name.toLowerCase()}`}
            className="inline-flex items-center gap-2 bg-background hover:bg-primary hover:text-primary-foreground px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors shadow-sm"
          >
            <Home className="h-4 w-4" />
            {category.name}
            <Badge variant="secondary" className="ml-1 pointer-events-none">
              {category.properties.length}
            </Badge>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AllCategoriesPartOne