import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/features/auth/auth-form";
import { signInAction } from "@/app/(auth)/actions";

export const metadata: Metadata = {
  title: "Log in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="container flex min-h-[70vh] max-w-sm flex-col justify-center py-16">
      <h1 className="font-display text-2xl font-bold">Log in</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">Welcome back.</p>
      <div className="mt-6">
        <AuthForm action={signInAction} submitLabel="Log in" />
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
