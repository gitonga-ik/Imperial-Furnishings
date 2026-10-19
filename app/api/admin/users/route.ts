import { NextResponse } from "next/server";
import { Registration } from "@/services/schemas";
import { User } from "@/services/interfaces";
import { createUser } from "@/services/users";

export async function POST(request: Request) {
  try {
    const body:User = await request.json();

    const validation = Registration.safeParse(body);

    if (!validation.success) {
      const validationErrors: Record<string, string> = {};

      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        validationErrors[fieldName] = issue.message;
      });

      return NextResponse.json({ errors: validationErrors }, { status: 400 });
    }

    const create = await createUser(body);

    if (create.success) {
      return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 },
      );
    }
    return NextResponse.json(
      { message: "Unable to create user" },
      { status: 500 },
    );
  } catch (error: any) {}
}
