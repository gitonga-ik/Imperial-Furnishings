import { NextResponse } from "next/server";
import { createCategory, updateCategory } from "@/services/category";
import { CategorySchema } from "@/services/schemas";
import { Category } from "@/services/interfaces";
import { UUID } from "crypto";

const id: UUID = "4741f0a7-d5f2-420d-b7bd-6206b2a4ed6b";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = CategorySchema.safeParse(body);

    if (!validation.success) {
      const validationErrors: Record<string, string> = {};

      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        validationErrors[fieldName] = issue.message;
      });

      return NextResponse.json({ errors: validationErrors }, { status: 400 });
    }

    const category: Category = {
      name: body.name,
      description: body.description,
      created_by: id,
      image: body.imageURL,
    };

    const result = await createCategory(category);

    if (result.success) {
      return NextResponse.json(
        { success: true, message: result.message, id: result.payload },
        { status: 201 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: `Unable to create category: ${result.message}`,
      },
      { status: 500 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Could not create category: ${error}` },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const validation = CategorySchema.safeParse(body);

    if (!validation.success) {
      const validationErrors: Record<string, string> = {};

      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        validationErrors[fieldName] = issue.message;
      });

      return NextResponse.json({ errors: validationErrors }, { status: 400 });
    }

    const category: Category = {
      name: body.name,
      description: body.description,
      created_by: id,
      image: body.imageURL,
    };

    const result = await updateCategory(body.id, category);

    if (result.success) {
      return NextResponse.json(
        { success: true, message: result.message },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: `Unable to create category.`,
      },
      { status: 500 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Could not create category.` },
      { status: 500 },
    );
  }
}
