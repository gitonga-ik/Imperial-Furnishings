'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductsClient({ products }) {
  const [query, setQuery] = useState('');

  const filtered = products.filter((product) => {
    const search = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(search) ||
      (product.category.name ?? '').toLowerCase().includes(search)
    );
  });

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search furniture..."
        className="w-full border border-[#d6cfc5] rounded-xl px-4 py-3 mb-8
                   font-dm-sans text-sm bg-white focus:outline-none
                   focus:ring-2 focus:ring-[#c05a2a] transition"
      />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl overflow-hidden shadow-sm bg-white border-none"
            >
              {product?.image && (
                <div className="relative h-60 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h5 className="font-playfair text-xl mb-1">{product.name}</h5>
                <p className="text-[#555] mb-3">
                  <b>Ksh.</b> {product.price}
                </p>
                
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-block bg-[#c05a2a] text-white text-sm font-medium
                             px-4 py-1.5 rounded no-underline
                             hover:bg-[#a64d24] transition-colors duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-8 text-[#888]">No products match your search.</p>
      )}
    </>
  );
}
