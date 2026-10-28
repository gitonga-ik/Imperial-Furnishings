"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PopularProducts({ products = [] }) {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    function updateVisibleCount() {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    }

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  const canSlide = products.length >= 4;
  const maxIndex = Math.max(0, products.length - visibleCount);

  useEffect(() => {
    if (!canSlide) {
      setIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [canSlide, maxIndex]);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  if (!products.length) {
    return null;
  }

  return (
    <section className="bg-[#faf7f2] py-10 md:py-20">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#c05a2a]">
              Curated for you
            </p>

            <h2 className="font-playfair text-3xl font-bold text-[#2b2b2b] md:text-4xl">
              Popular Products
            </h2>
          </div>

          <Link
            href="/products"
            className="shrink-0 text-sm font-medium text-[#2b2b2b] no-underline transition-colors hover:text-[#c05a2a]"
          >
            More Products <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Product carousel with manual navigation */}
        <div className="relative">
          {/* Previous products */}
          {canSlide && (
            <button
              type="button"
              onClick={() =>
                setIndex((current) => (current <= 0 ? maxIndex : current - 1))
              }
              aria-label="Previous products"
              className="absolute left-0 top-1/2 z-10 flex h-10 w-10
        -translate-x-1/2 -translate-y-1/2 items-center justify-center
        rounded-full border border-[#e5ddd2] bg-white/95 text-[#2b2b2b]
        shadow-md transition hover:bg-[#c05a2a] hover:text-white
        sm:left-2 sm:translate-x-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Product cards */}
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                width: `${(products.length / visibleCount) * 100}%`,
                transform: `translateX(-${index * (100 / products.length)}%)`,
                transition: "transform 700ms ease-in-out",
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="px-2"
                  style={{
                    flex: `0 0 ${100 / products.length}%`,
                  }}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="group block h-full overflow-hidden rounded-2xl
              border-none bg-white shadow-sm no-underline"
                    aria-label={`View ${product.name}`}
                  >
                    <div className="relative h-56 w-full overflow-hidden bg-white">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 639px) 90vw,
                    (max-width: 1023px) 45vw, 30vw"
                          className="object-cover transition-transform
                    duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="flex h-full items-center justify-center
                  text-sm text-[#999]"
                        >
                          Image unavailable
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3
                        className="text-center font-playfair text-base
                font-medium text-[#2b2b2b] transition-colors
                group-hover:text-[#c05a2a]"
                      >
                        {product.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Next products */}
          {canSlide && (
            <button
              type="button"
              onClick={() =>
                setIndex((current) => (current >= maxIndex ? 0 : current + 1))
              }
              aria-label="Next products"
              className="absolute right-0 top-1/2 z-10 flex h-10 w-10
        translate-x-1/2 -translate-y-1/2 items-center justify-center
        rounded-full border border-[#e5ddd2] bg-white/95 text-[#2b2b2b]
        shadow-md transition hover:bg-[#c05a2a] hover:text-white
        sm:right-2 sm:translate-x-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        {/* Carousel indicators */}
        {canSlide && (
          <div className="mt-7 flex justify-center gap-2">
            {products.map((product, i) => (
              <button
                key={product.id}
                type="button"
                aria-label={`Show products starting at ${product.name}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => setIndex(Math.min(i, maxIndex))}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-7 bg-[#c05a2a]"
                    : "w-1.5 bg-[#d6cfc5] hover:bg-[#c05a2a]"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
