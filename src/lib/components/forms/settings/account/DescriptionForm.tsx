import { FormEvent } from "react";
import { toast } from "sonner";

import userPatch from "@/lib/actions/server/userPatch";
import { Input } from "@/lib/components/ui/input";
import { useSession } from "@/lib/contexts/SessionContext";

export default function DescriptionForm() {
  const { session } = useSession();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const description = (e.currentTarget.firstChild as HTMLInputElement).value;
    const response = await userPatch(session, { description });

    if (response.session) {
      localStorage.setItem(
        `${process.env.NEXT_PUBLIC_SESSION}`,
        response.session
      );
      toast.success("Description updated successfully.", {
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
        name="description"
        id="user-description"
        className="peer border-transparent bg-transparent duration-300 group-hover:bg-base-background/60"
        defaultValue={session?.desc || ""}
        placeholder="Something about you"
      />
      <button
        type="submit"
        className="btn-outline-base hidden !px-8 group-hover:block"
      >
        {session?.desc !== "aaa" ? "Edit" : "Add"}
      </button>
    </form>
  );
}
