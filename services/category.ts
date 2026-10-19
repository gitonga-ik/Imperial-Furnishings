import { prisma } from "../prisma/prisma";
import {
  Category,
  ApiResponse,
  PayloadResponse,
  slugify,
} from "@/services/interfaces";
import { cache } from "react";

export async function createCategory(
  category: Category,
): Promise<ApiResponse | PayloadResponse> {
  try {
    const { created_by, ...categoryData } = category;
    const created = await prisma.category.create({
      data: {
        ...categoryData,
        slug: slugify(categoryData.name),
        created_by: created_by,
      },
    });
    return {
      success: true,
      message: "Category created successfully.",
      payload: created.id,
    };
  } catch (error) {
    return { success: false, message: `Category creation failed: ${error}` };
  }
}

export const getCategory = cache(async (slug: string) => {
  try {
    const categories = await prisma.category.findUnique({
      where: { slug },
      select: {
        name: true,
        slug: true,
        image: true,
        description: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            slug: true,
            description: true,
            image: true,
            createdAt: true
          },
        },
      },
    });
    return {
      success: true,
      message: "Fetched category successfully.",
      payload: categories,
    };
  } catch (error) {
    return { success: false, message: `Error fetching categories: ${error}` };
  }
});

export const getAllCategories = cache(async () => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        description: true,
        createdAt : true,
        _count: {
          select: {
            product: true,
          },
        },createdBy : {
          select : {
            name : true
          }
        }
      },
    });

    return {
      success: true,
      message: "Fetched categories successfully.",
      payload: categories,
    };
  } catch (error) {
    return { success: false, message: `Error fetching categories: ${error}` };
  }
});

export async function getProductsInCategory(slug: string) {
  try {
    const products = await prisma.category.findUnique({
      where: { slug },
      include: { product: true },
    });

    return {
      success: true,
      message: "Products in category fetched.",
      payload: products,
    };
  } catch (error) {
    return { success: false, message: `Error fetching products in : ${error}` };
  }
}

export async function updateCategory(slug: string, category: Category) {
  try {
    const cat = await prisma.category.update({
      where: { slug },
      data: {
        ...category,
        slug: slugify(category.name),
      },
    });

    return {
      success: true,
      message: "Category details updated successfully.",
      payload: cat,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error updating category information: ${error}`,
    };
  }
}
export async function deleteCategory(slug: string) {
  try {
    await prisma.category.delete({ where: { slug } });
    return { success: true, message: "Category deleted successfully" };
  } catch (error) {
    return { success: false, message: `Error deleting category: ${error}` };
  }
}

export async function getTopCategories() {
  try {
    const topCategories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        slug: true,
        _count: {
          select: { product: true },
        },
      },
      orderBy: {
        product: {
          _count: "desc",
        },
      },
      take: 3,
    });

    return {
      success: true,
      message: "Top categories fetched",
      payload: topCategories,
    };
  } catch (error) {
    return { success: false, message: "Could not fetch categories." };
  }
}
