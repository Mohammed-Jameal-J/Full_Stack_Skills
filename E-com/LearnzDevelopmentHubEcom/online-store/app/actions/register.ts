"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Zod validation schema
const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required").trim(),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export interface FormErrors {
  name?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
}

export interface RegisterState {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
}

export async function signup(
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const validated = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validated.success) {
    const fieldErrors = z.flattenError(validated.error).fieldErrors;
    const errors: Record<string, string> = {};

    for (const [key, value] of Object.entries(fieldErrors)) {
      if (value?.[0]) {
        errors[key] = value[0];
      }
    }

    return { errors };
  }

  const { name, email, password } = validated.data;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        errors: {
          email: "Email already registered",
        },
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Registration successful! You can now log in.",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      message: "An error occurred during registration. Please try again.",
    };
  }
}
