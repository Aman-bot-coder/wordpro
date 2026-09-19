"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [error, formAction, pending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-light px-6">
      <form action={formAction} className="w-full max-w-sm rounded-2xl border border-navy/10 bg-white p-8 shadow-sm">
        <div className="text-lg font-bold tracking-tight text-navy">
          WRDS<span className="text-royal">.SEO</span>
        </div>
        <p className="mt-1 text-sm text-gray-dark">Sign in to manage site SEO.</p>

        <label className="mt-6 block text-sm font-medium text-navy">
          Password
          <input
            name="password"
            type="password"
            required
            autoFocus
            className="mt-2 w-full rounded-lg border border-navy/15 px-3 py-2 text-sm text-navy outline-none focus:border-royal"
          />
        </label>

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-royal disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
