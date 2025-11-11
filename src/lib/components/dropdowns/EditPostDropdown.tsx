import { Edit2Icon, MoreVerticalIcon, Trash2Icon } from "lucide-react";
import { Link } from "next-view-transitions";
import React from "react";

import DeletePostDialogContent from "@/lib/components/dialogs/DeletePostDialogContent";
import { Dialog, DialogTrigger } from "@/lib/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/lib/components/ui/dropdown-menu";

export default function EditPostDropdown({
  postData: { editUrl, postIndex }
}: {
  postData: { editUrl: string; postIndex: number };
}) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-fit items-center rounded-full p-1 text-xl font-bold hover:bg-foreground hover:text-background focus:outline-none">
          <MoreVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <Link href={editUrl}>
              <DropdownMenuItem className="cursor-pointer">
                <Edit2Icon width={18} /> Edit
              </DropdownMenuItem>
            </Link>
            <DialogTrigger className="w-full">
              <DropdownMenuItem className="cursor-pointer">
                <Trash2Icon width={18} /> Delete
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePostDialogContent postIndex={postIndex} />
    </Dialog>
  );
}
