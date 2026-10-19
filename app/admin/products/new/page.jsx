import { Card, SectionTitle } from "@/app/components/admin/FormField";
import ProductForm from "../ProductForm";
import { getAllCategories } from "@/services/category";

export const metadata = { title: "New Product" };

export default async function NewProductPage({ searchParams }) {
  const { payload: categories } = await getAllCategories();
  const params = await searchParams;
  
  const preselectedCategory = params?.category ?? "";

  return (
    <div className="max-w-xl">
      <Card>
        <SectionTitle>New Product</SectionTitle>
        <ProductForm
          categories={categories}
          preselectedCategory={preselectedCategory}
        />
      </Card>
    </div>
  );
}
