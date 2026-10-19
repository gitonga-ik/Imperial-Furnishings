import type { UUID } from "node:crypto";
import { prisma } from "../prisma/prisma";
import {
  Product,
  ApiResponse,
  PayloadResponse,
  slugify,
} from "@/services/interfaces";

export async function createProduct(product: Product) {
  try {
    const { created_by, category_id, ...productData } = product;
    const created = await prisma.product.create({
      data: {
        ...productData,
        slug: slugify(product.name),
        image: productData.image ?? "",
        category: {
          connect: {
            id: category_id,
          },
        },
        createdBy: {
          connect: {
            id: created_by,
          },
        },
      },
    });
    return {
      success: true,
      message: "Product created successfully.",
      payload: created.id,
    };
  } catch (error) {
    return { success: false, message: `Product creation failed: ${error}` };
  }
}

export async function getProduct(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        description: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    return {
      success: true,
      message: "Fetched product successfully.",
      payload: product,
    };
  } catch (error) {
    return { success: false, message: `Error fetching product: ${error}` };
  }
}

export async function updateProduct(id: UUID, product: Product) {
  try {
    const { created_by, category_id, ...productData } = product;
    const prod = await prisma.product.update({
      where: { id },
      data: {
        ...productData,
        slug: slugify(product.name),
        image: productData.image ?? "",
        category: {
          connect: {
            id: category_id,
          },
        },
        createdBy: {
          connect: {
            id: created_by,
          },
        },
      },
    });

    return {
      success: true,
      message: "Product details updated successfully.",
      payload: prod,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error updating product information: ${error}`,
    };
  }
}
export async function deleteProduct(id: UUID): Promise<ApiResponse> {
  try {
    await prisma.product.delete({ where: { id } });
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    return { success: false, message: `Error deleting product: ${error}` };
  }
}

export async function getAllProducts(): Promise<PayloadResponse> {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        price: true,
        createdAt: true,
        category: {
          select: { name: true, slug: true },
        },
        createdBy: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      message: "Products fetchd successfully.",
      payload: products,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error deleting product: ${error}`,
      payload: null,
    };
  }
}
