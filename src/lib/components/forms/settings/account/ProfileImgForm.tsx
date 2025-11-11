import { UserIcon } from "lucide-react";
import Image from "next/image";

import { Input } from "@/lib/components/ui/input";
import { useSession } from "@/lib/contexts/SessionContext";

export default function ProfileImgForm() {
  const { session } = useSession();

  return (
    <form className="flex grow items-center gap-4">
      {session?.img ? (
        <div className="relative min-h-[60px] min-w-[60px] self-end overflow-hidden rounded-full border-[3.5px] border-primary-foreground">
          <Image
            src={session.img}
            alt="Profile"
            sizes="(max-width: 60px) 60px"
            className="object-cover"
            fill
          />
        </div>
      ) : (
        <span className="rounded-full bg-base-background p-2 text-5xl text-primary-foreground">
          <UserIcon className="h-12 w-auto fill-current" />
        </span>
      )}
      <Input
        type="file"
        name="profile"
        id="user-profile-img"
        className="peer cursor-pointer border-transparent bg-transparent opacity-0 duration-300 group-hover:bg-base-background/60 group-hover:opacity-100 group-hover:ring-2 group-hover:ring-neutral-300 peer-focus-visible:opacity-100"
      />
    </form>
  );
}
