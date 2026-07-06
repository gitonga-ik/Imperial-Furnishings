import { prisma } from "@/prisma/prisma";
// import slugify from "slugify";
import { ApiResponse, PayloadResponse, Role } from "./interfaces.js";

// export async function createRole(role: Role): Promise<ApiResponse> {
//   try {
//     await prisma.role.create({
//       data: {
//         ...role,
//         slug: slugify(role.name),
//       },
//     });
//     return { success: true, message: "Role created successfully." };
//   } catch (error) {
//     return { success: false, message: `Role creation failed: ${error}` };
//   }
// }

export async function getRoles(): Promise<PayloadResponse | ApiResponse> {
  try {
    const roles = await prisma.role.findMany({ select: { role_name: true, slug: true } });
    return { success: true, message: "Roles fetched successfully." , payload: roles};
  } catch (error) {
    return { success: false, message: `Could not get roles: ${error}` };
  }
}


