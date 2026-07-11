import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/features/auth/auth-form";
import { signUpAction } from "@/app/(auth)/actions";

export const metadata: Metadata = {
  title: "Sign up",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <div className="container flex min-h-[70vh] max-w-sm flex-col justify-center py-16">
      <h1 className="font-display text-2xl font-bold">Create an account</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Free forever for the core tools. Start a 7-day trial of Pro features any time.
      </p>
      <div className="mt-6">
        <AuthForm action={signUpAction} submitLabel="Sign up" />
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
