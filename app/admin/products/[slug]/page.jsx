import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, SectionTitle } from "@/app/components/admin/FormField";
import ProductForm from "../ProductForm";
import { getProduct } from "@/services/products";
import { getAllCategories } from "@/services/category";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const { payload: product } = await getProduct(slug);
  const { payload: categories } = await getAllCategories();

  if (!product) notFound();

  return (
    <div className="space-y-8 max-w-4xl">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-[#2b2b2b] transition-colors no-underline"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <path d="m12 19-7-7 7-7M19 12H5" />
        </svg>
        Back to products
      </Link>

      <Card>
        <div className="flex gap-6 items-start mb-8">
          <Image
            src={product.image ?? null}
            alt={product.name}
            width={100}
            height={100}
            className="rounded-xl object-cover w-24 h-24 shrink-0"
          />
          <div>
            <h1 className="font-playfair text-3xl font-bold text-[#2b2b2b]">
              {product.name}
            </h1>
            <p className="text-[#c05a2a] font-semibold mt-1">
              Ksh. {product.price.toLocaleString()}
            </p>
            <div className="flex gap-4 mt-2 text-xs text-[#aaa]">
              <span>
                Category:{" "}
                <Link
                  href={`/admin/categories/${product.category?.slug}`}
                  className="text-[#555] hover:text-[#c05a2a] no-underline"
                >
                  {product.category?.name}
                </Link>
              </span>
              <span>
                Created by{" "}
                <strong className="text-[#555]">
                  {product.createdBy?.name}
                </strong>
              </span>
              <span>{new Date(product.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <SectionTitle>Edit Product</SectionTitle>
        <ProductForm initial={product} categories={categories} />
      </Card>
    </div>
  );
}
