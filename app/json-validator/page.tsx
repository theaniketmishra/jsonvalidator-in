import { redirect } from "next/navigation";

// The JSON Validator lives at "/" (the homepage). This route exists so
// /json-validator is a valid, expected URL, but permanently redirects to
// the canonical location instead of serving duplicate content.
export default function JsonValidatorRedirect() {
  redirect("/");
}
