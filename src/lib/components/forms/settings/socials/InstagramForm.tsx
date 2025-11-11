import { FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";

import patchClientFetch from "@/lib/actions/client/patchClientFetch";
import { Input } from "@/lib/components/ui/input";
import { UrlSchema } from "@/lib/types/zodSchemas";

export default function InstagramForm({ link }: { link?: string }) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const instagramLink = (e.currentTarget.firstChild as HTMLInputElement)
      .value;
    try {
      const link = UrlSchema.parse(instagramLink);
      const response = await patchClientFetch(
        { social: "instagram", link: instagramLink },
        "/user/socials"
      );
      if (response.message) {
        toast.success(
          `Your Instagram link has been ${link ? "updated." : "added."}`,
          {
            position: "bottom-right",
            duration: 1500
          }
        );
      } else {
        toast.error(response.error, {
          position: "bottom-right",
          duration: 1500
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Not a valid url!", {
          position: "bottom-right",
          duration: 1500
        });
      }
    }
  };

  return (
    <form
      className="focus-within:group-has-[input:placeholder-shown]:social-form-empty flex items-center gap-4"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        name="instagramLink"
        id="instagram-link"
        className="peer border-transparent !bg-transparent transition-[width] focus:placeholder-shown:!ring-destructive-foreground group-hover:!bg-background/90 group-hover:ring-2 group-hover:ring-white group-hover:ring-offset-black"
        defaultValue={link || ""}
        placeholder="Your Instagram profile link"
      />
      <button
        type="submit"
        className="btn-outline-socials hidden !px-8 !text-white group-hover:block group-hover:peer-placeholder-shown:hidden peer-focus-within:block peer-focus-within:peer-placeholder-shown:hidden"
      >
        {link ? "Edit" : "Add"}
      </button>
    </form>
  );
}
