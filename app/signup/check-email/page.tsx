import { Mail } from "lucide-react";

export default function CheckEmailPage() {
  return (
    <div className="container flex min-h-[70vh] max-w-sm flex-col items-center justify-center py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Mail className="h-5 w-5" />
      </span>
      <h1 className="mt-4 font-display text-xl font-bold">Check your email</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        We sent you a confirmation link. Click it to activate your account, then log in.
      </p>
    </div>
  );
}
