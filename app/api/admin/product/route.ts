import { NextRequest, NextResponse } from "next/server";
import { createProduct, updateProduct } from "@/services/products";
import { ProductSchema } from "@/services/schemas";
import { Product } from "@/services/interfaces";
import { UUID } from "crypto";
import { verifyAuth } from "@/services/users";

const id: UUID = "803129e8-02a8-45ac-9d33-acd84dcc3dc2";

export async function POST(request: NextRequest) {
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

    const loginUrl = new URL("/admin/login", request.url);

    const token = request.cookies.get("access_token");

    if (!token || !token.value) {
      return NextResponse.redirect(loginUrl);
    }

    const { payload: user } = await verifyAuth(token.value);

    const product: Product = {
      name: body.name,
      price: Number(body.price),
      description: body.description,
      category_id: body.category_id,
      created_by: <UUID>user?.id,
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

export async function PATCH(request: NextRequest) {
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

    const loginUrl = new URL("/admin/login", request.url);

    const token = request.cookies.get("access_token");

    if (!token || !token.value) {
      return NextResponse.redirect(loginUrl);
    }

    const { payload: user } = await verifyAuth(token.value);

    const product: Product = {
      name: body.name,
      price: Number(body.price),
      description: body.description,
      category_id: body.category_id,
      created_by: <UUID>user?.id,
      image: body.imageURL,
    };

    const result = await updateProduct(body.id, product);

    if (result.success) {
      return NextResponse.json(
        { success: true, message: result.message },
        { status: 200 },
      );
    }

    console.log(result)

    return NextResponse.json(
      {
        success: false,
        message: `Unable to update product.`,
      },
      { status: 500 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Could not update product.` },
      { status: 500 },
    );
  }
}
