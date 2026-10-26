import { NextRequest, NextResponse } from "next/server";
import { createCategory, updateCategory } from "@/services/category";
import { CategorySchema } from "@/services/schemas";
import { Category } from "@/services/interfaces";
import { UUID } from "crypto";
import { verifyAuth } from "@/services/users";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = CategorySchema.safeParse(body);

    if (!validation.success) {
      const validationErrors: Record<string, string> = {};

      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        validationErrors[fieldName] = issue.message;
      });

      return NextResponse.json(
        { success: false, errors: validationErrors },
        { status: 400 },
      );
    }

    const loginUrl = new URL("/admin/login", request.url);

    const token = request.cookies.get("access_token");

    if (!token || !token.value) {
      return NextResponse.redirect(loginUrl);
    }

    const { payload: user } = await verifyAuth(token.value);

    const category: Category = {
      name: body.name,
      description: body.description,
      created_by: <UUID>user?.id,
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

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = CategorySchema.safeParse(body);

    if (!validation.success) {
      const validationErrors: Record<string, string> = {};

      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        validationErrors[fieldName] = issue.message;
      });

      return NextResponse.json(
        { success: false, errors: validationErrors },
        { status: 400 },
      );
    }

    const loginUrl = new URL("/admin/login", request.url);

    const token = request.cookies.get("access_token");

    if (!token || !token.value) {
      return NextResponse.redirect(loginUrl);
    }

    const { payload: user } = await verifyAuth(token.value);

    const category: Category = {
      name: body.name,
      description: body.description,
      created_by: <UUID>user?.id,
      image: body.imageURL,
    };

    const result = await updateCategory(body.slug, category);

    if (result.success) {
      return NextResponse.json(
        { success: true, message: result.message },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: `Unable to update category.`,
      },
      { status: 500 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Could not update category.` },
      { status: 500 },
    );
  }
}
