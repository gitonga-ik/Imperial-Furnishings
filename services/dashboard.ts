import { prisma } from "../prisma/prisma";
import { Category, ApiResponse, PayloadResponse } from "@/services/interfaces";
import { cache } from "react";

export async function getStats() {
  try {
    const userCount = await prisma.users.count();
    const productCount = await prisma.product.count();
    const categoryCount = await prisma.category.count();

    return {
      success: true,
      message: "Fetched stats successfully",
      payload: {
        products: productCount,
        categories: categoryCount,
        users: userCount,
      },
    };
  } catch (error) {
    return { success: false, message: "Could not fetch stats." };
  }
}

export async function recentProducts() {
  try {
    const recentProducts = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        createdAt: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    return {
      success: true,
      message: "Could not fetch recent products",
      payload: recentProducts,
    };
  } catch (error) {
    return { success: false, message: "Could not get recent products." };
  }
}
