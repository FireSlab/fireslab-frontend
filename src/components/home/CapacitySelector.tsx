'use client';

import { useState } from 'react';

export interface ProductVariant {
  id?: string;
  model_code: string;
  capacity_litres: number;
  diameter_mm?: number;
  height_mm?: number;
  connection_inch?: string;
  order_index?: number;
}

interface ProductWithVariants {
  id?: string;
  slug?: string;
  variants?: ProductVariant[];
}

const DEFAULT_MODELS: ProductVariant[] = [
  { model_code: 'FS-500P', capacity_litres: 500, diameter_mm: 750, height_mm: 1450, connection_inch: '1.5"' },
  { model_code: 'FS-1000P', capacity_litres: 1000, diameter_mm: 950, height_mm: 1850, connection_inch: '2.0"' },
  { model_code: 'FS-2000P', capacity_litres: 2000, diameter_mm: 1250, height_mm: 2150, connection_inch: '2.5"' },
  { model_code: 'FS-3000P', capacity_litres: 3000, diameter_mm: 1450, height_mm: 2450, connection_inch: '3.0"' },
  { model_code: 'FS-5000P', capacity_litres: 5000, diameter_mm: 1850, height_mm: 2850, connection_inch: '4.0"' },
];

export default function CapacitySelector({ products }: { products?: ProductWithVariants[] }) {
  // Extract all variants from products, or fallback to default sizing models
  const allVariants: ProductVariant[] = (() => {
    if (!products || products.length === 0) return DEFAULT_MODELS;
    const extracted = products
      .flatMap((p) => p.variants || [])
      .filter((v): v is ProductVariant => Boolean(v && v.capacity_litres));

    return extracted.length > 0 ? extracted : DEFAULT_MODELS;
  })();

  const [capacity, setCapacity] = useState<number>(5000);

  const filtered = allVariants.filter((m) => m.capacity_litres <= capacity);

  return (
    <section className="specs-section" aria-label="Select Your Capacity">
      <div className="container">
        <div className="specs-header">
          <h2>Select Your Capacity</h2>
          <div className="range-selector">
            <label htmlFor="capacity-filter">
              Capacity Range: <span id="range-val">{capacity}L</span>
            </label>
            <input
              type="range"
              id="capacity-filter"
              min="300"
              max="5000"
              step="100"
              value={capacity}
              onChange={(e) => setCapacity(parseInt(e.target.value, 10))}
              aria-label="Capacity filter slider"
            />
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Model</th>
                <th>Capacity (L)</th>
                <th>Diameter (mm)</th>
                <th>Height (mm)</th>
                <th>Connection (inch)</th>
              </tr>
            </thead>
            <tbody id="specs-body">
              {filtered.map((row, idx) => (
                <tr key={row.id || row.model_code || idx} data-cap={row.capacity_litres}>
                  <td style={{ fontWeight: 600, color: 'var(--green-light)' }}>{row.model_code}</td>
                  <td>{row.capacity_litres} L</td>
                  <td>{row.diameter_mm ? `${row.diameter_mm} mm` : '—'}</td>
                  <td>{row.height_mm ? `${row.height_mm} mm` : '—'}</td>
                  <td>{row.connection_inch || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
