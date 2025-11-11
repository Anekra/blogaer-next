import Logo2Icon from "@/lib/components/icons/Logo2Icon";
import { Input } from "@/lib/components/ui/input";

export default function ProfileBannerForm() {
  return (
    <form className="flex items-center gap-4">
      <span className="flex w-1/2 justify-center rounded-sm bg-base-background p-2">
        <Logo2Icon className="h-12 w-auto" />
      </span>
      <Input
        type="file"
        name="banner"
        id="user-banner"
        className="peer cursor-pointer border-transparent bg-transparent opacity-0 duration-300 group-hover:bg-base-background/60 group-hover:opacity-100 group-hover:ring-2 group-hover:ring-neutral-300 peer-focus-visible:opacity-100"
      />
    </form>
  );
}
