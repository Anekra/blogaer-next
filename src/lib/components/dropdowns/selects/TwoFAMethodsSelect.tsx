import { toast } from "sonner";

import patchClientFetch from "@/lib/actions/client/patchClientFetch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/lib/components/ui/select";

export default function TwoFAMethodsSelect({
  twoFAMethod,
  handleOptionChange
}: {
  twoFAMethod?: string;
  handleOptionChange: (value: string) => void;
}) {
  const handleOnValueChange = async (v: string) => {
    handleOptionChange(v);
    const res = await patchClientFetch({ twoFaMethod: v }, "/user/settings");
    if (res) {
      toast.success("Two factor authentication method changed successfully.", {
        position: "bottom-right",
        duration: 1500
      });
    } else {
      toast.success("Server error, please try again later!", {
        position: "bottom-right",
        duration: 1500
      });
    }
  };

  return (
    <Select
      value={twoFAMethod || "passkey"}
      onValueChange={handleOnValueChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Passkey" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="passkey">Passkey</SelectItem>
          <SelectItem value="app">Authenticator app</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
