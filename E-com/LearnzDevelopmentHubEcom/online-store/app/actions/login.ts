"use server";

import { z } from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// Zod validation schema
const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export interface FormErrors {
  email?: string[];
  password?: string[];
}

export interface LoginState {
  success?: boolean;
  message?: string;
  errors?: FormErrors;
  redirectUrl?: string;
}

export async function login(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const validated = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    const fieldErrors = z.flattenError(validated.error).fieldErrors;
    const errors: Record<string, string> = {};

    for (const [key, value] of Object.entries(fieldErrors)) {
      if (value?.[0]) {
        errors[key] = value[0];
      }
    }

    return {
      success: false,
      message: "Validation failed",
      errors,
    };
  }

  const { email, password } = validated.data;

  try {
    // Sign in user using NextAuth
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("SignIn result:", result);

    if (!result || result.error) {
      console.error("SignIn error:", result?.error);
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    return {
      success: true,
      message: "Login successful",
      redirectUrl: "/",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("Auth error:", error);
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    console.error("Login error:", error);
    return {
      success: false,
      message: "An error occurred during login",
    };
  }
}
