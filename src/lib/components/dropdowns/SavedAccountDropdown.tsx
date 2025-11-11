import { MoreVerticalIcon } from "lucide-react";
import { FormEvent } from "react";
import { toast } from "sonner";

import deleteClientFetch from "@/lib/actions/client/deleteClientFetch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/lib/components/ui/dropdown-menu";
import { SavedAccountsDto } from "@/lib/types/dto/CommonDto";

export default function SavedAccountDropdown({
  index,
  username,
  savedAccounts,
  setSavedAccounts
}: {
  index: number;
  username: string;
  savedAccounts: SavedAccountsDto[];
  setSavedAccounts: React.Dispatch<
    React.SetStateAction<SavedAccountsDto[] | null>
  >;
}) {
  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await deleteClientFetch(`/saved-accounts/${username}`);
    setSavedAccounts((account) => {
      if (!account) return savedAccounts;
      return account.filter((_, i) => i !== index);
    });
    toast.success("Saved account deleted.", {
      position: "bottom-right",
      duration: 1500
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="z-[3] flex h-fit items-center rounded-full p-1 text-xl">
        <MoreVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <form method="post" onSubmit={handleOnSubmit}>
              <button type="submit">Delete from this device</button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
