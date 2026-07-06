import { NextResponse } from "next/server";
import { createProduct, updateProduct } from "@/services/products";
import { ProductSchema } from "@/services/schemas";
import { Product } from "@/services/interfaces";
import { UUID } from "crypto";

const id: UUID = "4741f0a7-d5f2-420d-b7bd-6206b2a4ed6b";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = ProductSchema.safeParse(body);

    if (!validation.success) {
      const validationErrors: Record<string, string> = {};

      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        validationErrors[fieldName] = issue.message;
      });

      return NextResponse.json({ errors: validationErrors }, { status: 400 });
    }

    const product: Product = {
      name: body.name,
      price: Number(body.price),
      description: body.description,
      category_id: body.category_id,
      created_by: id,
      image: body.imageURL ?? "",
    };

    const result = await createProduct(product);

    if (result.success) {
      return NextResponse.json(
        { success: true, message: result.message, id: result.payload },
        { status: 201 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: `Unable to create product: ${result.message}`,
      },
      { status: 500 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Could not create product: ${error}` },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const validation = ProductSchema.safeParse(body);

    if (!validation.success) {
      const validationErrors: Record<string, string> = {};

      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        validationErrors[fieldName] = issue.message;
      });

      return NextResponse.json({ errors: validationErrors }, { status: 400 });
    }

    const product: Product = {
      name: body.name,
      price: Number(body.price),
      description: body.description,
      category_id: body.id,
      created_by: id,
      image: body.imageURL,
    };

    const result = await updateProduct(body.id, product);

    if (result.success) {
      return NextResponse.json(
        { success: true, message: result.message },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: `Unable to create product.`,
      },
      { status: 500 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Could not create product.` },
      { status: 500 },
    );
  }
}
