"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Field,
  Input,
  Textarea,
  Select,
  SubmitButton,
} from "@/app/components/admin/FormField";

export default function ProductForm({
  categories,
  initial = null,
  preselectedCategory = "",
}) {
  const router = useRouter();
  const isEdit = !!initial;

  const [form, setForm] = useState({
    name: initial?.name ?? "",
    price: initial?.price?.toString() ?? "",
    description: initial?.description ?? "",
    image: initial?.image ?? "",
    category_id: initial?.category_id ?? preselectedCategory,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(initial?.imageURL ?? "");
  const [image, setImage] = useState(null);

  function handleImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setImage(file);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate() {
    const error = {};
    if (!form.name.trim()) error.name = "Product name is required.";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      error.price = "Enter a valid price (whole number, Ksh).";
    if (!form.category_id) error.category_id = "Please select a category.";
    return error;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    setLoading(true);
    const payload = { ...form, price: Number(form.price) };
    try {
      let uploadResult = null;
      if (image) {
        const imageData = new FormData();

        imageData.append("type", "product");
        imageData.append("file", image);

        const uploadResponse = await fetch("/api/admin/upload", {
          method: "POST",
          body: imageData,
        });

        uploadResult = await uploadResponse.json();

        if (!uploadResult.success) {
          setErrors(uploadResult.errors);
          return;
        }
      }

      if (isEdit) {
        const response = await fetch("/api/admin/product", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...initial,
            name: form.name,
            price: form.price,
            category_id: form.category_id,
            description: form.description,
            imageURL: uploadResult?.url ?? initial?.image ?? null,
          }),
        });

        const result = await response.json();

        if (!result.success) {
          setErrors(result.errors);
          return;
        }
      } else {
        const response = await fetch("/api/admin/product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            price: form.price,
            category_id: form.category_id,
            description: form.description,
            imageURL: uploadResult?.url ?? null,
          }),
        });

        const result = await response.json();

        if (!result.success) {
          setErrors(result.errors);
          return;
        }
      }
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setErrors({ form: err.message ?? "Save failed." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Product Name" error={errors.name}>
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Walnut Lounge Chair"
          required
        />
      </Field>

      <Field label="Price (Ksh)" error={errors.price}>
        <Input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="45000"
          min="1"
          step="1"
          required
        />
      </Field>

      <Field label="Category" error={errors.category_id}>
        <Select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          required
        >
          <option value="">Select a category…</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Description" error={errors.description}>
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the product — materials, character, craftsmanship…"
        />
      </Field>

      <Field label="Product Image" error={errors.image}>
        <label
          className="flex flex-col items-center justify-center w-full h-36
                    border-2 border-dashed border-[#d6cfc5] rounded-xl
                    cursor-pointer bg-[#faf7f2]
                    hover:border-[#c05a2a] hover:bg-[#f5ede3]
                    transition-colors duration-200 overflow-hidden relative"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover absolute inset-0"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-[#aaa] z-10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-8 h-8"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span className="text-xs font-medium">Click to upload image</span>
              <span className="text-[0.7rem]">PNG, JPG, WEBP up to 5MB</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="sr-only"
          />
        </label>
        {preview && (
          <button
            type="button"
            onClick={() => {
              setPreview("");
              setImage(null);
            }}
            className="text-xs text-red-400 hover:text-red-600 mt-1 bg-transparent border-none cursor-pointer self-start"
          >
            Remove image
          </button>
        )}
      </Field>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton loading={loading}>
          {isEdit ? "Save Changes" : "Create Product"}
        </SubmitButton>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-[#888] hover:text-[#2b2b2b] transition-colors bg-transparent border-none cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
