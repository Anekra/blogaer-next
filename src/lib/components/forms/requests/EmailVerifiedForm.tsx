"use client";

import Form from "next/form";
import { Input } from "@/lib/components/ui/input";

export default function EmailVerifiedForm() {
  return (
    <Form action="" className="flex flex-col gap-6">
      <div>
        <label className="mb-2 flex items-center justify-between text-sm">
          Display Name
        </label>
        <Input placeholder="Your display name" />
      </div>
      <button type="submit" className="btn-solid-p">
        Finish Account
      </button>
    </Form>
  );
}
