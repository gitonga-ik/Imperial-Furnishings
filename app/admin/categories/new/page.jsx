import { Card, SectionTitle } from "@/app/components/admin/FormField";
import CategoryForm from "../CategoryForm";

export const metadata = { title: "New Category" };

export default function NewCategoryPage() {
  return (
    <div className="max-w-xl">
      <Card>
        <SectionTitle>New Category</SectionTitle>
        <CategoryForm />
      </Card>
    </div>
  );
}
