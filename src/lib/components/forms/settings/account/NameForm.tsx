import { FormEvent } from "react";
import { toast } from "sonner";

import userPatch from "@/lib/actions/server/userPatch";
import { Input } from "@/lib/components/ui/input";
import { useSession } from "@/lib/contexts/SessionContext";

export default function NameForm() {
  const { session } = useSession();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = (e.currentTarget.firstChild as HTMLInputElement).value;
    const response = await userPatch(session, { name });
    if (response.session) {
      localStorage.setItem(
        `${process.env.NEXT_PUBLIC_SESSION}`,
        response.session
      );
      toast.success("Display name updated successfully.", {
        position: "bottom-right",
        duration: 1500
      });
    } else {
      toast.error(response.error, {
        position: "bottom-right",
        duration: 1500
      });
    }
  };

  return (
    <form
      method="post"
      className="flex items-center gap-4"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        name="name"
        id="user-display-name"
        className="peer border-transparent duration-300 group-hover:bg-base-background/60"
        defaultValue={session?.name || ""}
        placeholder="Your display name"
      />
      <button
        type="submit"
        className="btn-outline-base hidden !px-8 group-hover:block"
      >
        {session?.name ? "Edit" : "Add"}
      </button>
    </form>
  );
}
