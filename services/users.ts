import type { UUID } from "node:crypto";
import { hash, compare } from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "../prisma/prisma";
import { Prisma } from "../generated/prisma/client";
import { ApiResponse, PayloadResponse, User } from "./interfaces";
import "dotenv/config";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
const SALT_ROUNDS = 10;

export async function createUser(user: User): Promise<ApiResponse> {
  try {
    const hashedPassword = await hash(user.password, SALT_ROUNDS);

    const { role, ...userData } = user;

    await prisma.users.create({
      data: {
        ...userData,
        password: hashedPassword,
        role: {
          connect: {
            slug: role,
          },
        },
      },
    });

    return { success: true, message: "User created successfully." };
  } catch (error) {
    return { success: false, message: `User creation failed: ${error}` };
  }
}

export async function getUser(email: string): Promise<PayloadResponse> {
  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user)
      return { success: false, message: "User not found.", payload: null };

    return { success: true, message: "User found.", payload: user };
  } catch (error) {
    return { success: false, message: "Could not fetch user", payload: null };
  }
}

export async function deleteUser(id: UUID): Promise<ApiResponse> {
  try {
    await prisma.users.delete({ where: { id } });
    return { success: true, message: "User deleted successfully." };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return { success: false, message: "User does not exist." };
    }

    throw error;
  }
}

export async function updateUser(
  id: UUID,
  user: User,
): Promise<ApiResponse | PayloadResponse> {
  try {
    const { role, ...userData } = user;
    const usr = await prisma.users.update({
      where: { id },
      data: {
        ...userData,
        role: {
          connect: {
            id: role,
          },
        },
      },
    });
    return {
      success: true,
      message: "Details updated successfully.",
      payload: usr,
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return { success: false, message: "User does not exist." };
    }

    throw error;
  }
}

export async function authenticate(email: string, password: string) {
  try {
    const res = await getUser(email);

    if (res.success) {
      const user = res.payload;

      const passmatch = await compare(password, user.password);

      if (!passmatch)
        return { success: false, message: "Invalid user credentials." };

      const token = await new SignJWT({ id: user.id })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(SECRET_KEY);

      return { success: true, token: token };
    }

    return { success: false, message: "Invalid user credentials." };
  } catch (error) {
    return { success: false, message: error };
  }
}

export async function verifyAuth(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      algorithms: ["HS256"],
    });
    return { success: true, payload: payload };
  } catch (error) {
    return { success: false, message: error };
  }
}