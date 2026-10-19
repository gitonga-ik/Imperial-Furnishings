import { Suspense } from "react";
import ProductsClient from "./ProductsClient";
import { getAllProducts } from "@/services/products";

export const metadata = { title: "Products" };

export default async function ProductsPage() {
  const {payload: products} = await getAllProducts();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h3 className="font-playfair text-2xl font-bold mb-6">
          Browse our entire collection of handcrafted furniture
        </h3>
        <Suspense>
          <ProductsClient products={products} />
        </Suspense>
      </div>
    </section>
  );
}
