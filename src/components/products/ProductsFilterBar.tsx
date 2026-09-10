'use client';

import { LayoutGrid, RotateCw } from 'lucide-react';

export interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

interface ProductsFilterBarProps {
  categories: CategoryOption[];
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
  viewMode: 'carousel' | 'grid';
  onChangeViewMode: (mode: 'carousel' | 'grid') => void;
  activeAppFilter?: string | null;
}

export default function ProductsFilterBar({
  categories,
  activeCategory,
  onSelectCategory,
  viewMode,
  onChangeViewMode,
  activeAppFilter,
}: ProductsFilterBarProps) {
  return (
    <div className="products-filter-bar">
      <div className="filter-chips">
        <button
          type="button"
          className={`filter-chip ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => onSelectCategory('all')}
        >
          All Products
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id || cat.slug}
            type="button"
            className={`filter-chip ${activeCategory === cat.slug ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.slug)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="view-toggles">
        <button
          type="button"
          className={`view-toggle-btn ${viewMode === 'carousel' ? 'active' : ''}`}
          onClick={() => onChangeViewMode('carousel')}
          title="3D Carousel View"
        >
          <RotateCw size={14} />
          <span>3D Wheel</span>
        </button>
        <button
          type="button"
          className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
          onClick={() => onChangeViewMode('grid')}
          title="Catalog Grid View"
        >
          <LayoutGrid size={14} />
          <span>Grid</span>
        </button>
      </div>
    </div>
  );
}
