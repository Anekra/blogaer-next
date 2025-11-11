import { SmartphoneIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

import AuthAppInputForm from "@/lib/components/forms/settings/two-fa/auth-app/AuthAppInputForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/lib/components/ui/dialog";
import { useLoading } from "@/lib/contexts/LoadingContext";
import { verifyAuthAppLogin } from "@/lib/utils/helper";

export default function AuthAppVerifyDialog({
  username,
  openState: [opened, setOpened]
}: {
  username: string;
  openState: [boolean, Dispatch<SetStateAction<boolean>>];
}) {
  const router = useRouter();
  const redirectUrl = useSearchParams().get("request_url");
  const { isLoading, setLoading, setShowIcon } = useLoading();
  const [isResOk, setIsResOk] = useState<boolean | null>(null);
  const verifyToken = async (token: string) => {
    setLoading(true);
    setShowIcon(false);
    try {
      const res = await verifyAuthAppLogin(username, token);
      if (res) {
        setIsResOk(true);
        setOpened(false);
        router.replace(redirectUrl || "/home");
        toast.success("Login successful.", {
          position: "bottom-right",
          duration: 1500
        });
      } else {
        setIsResOk(false);
        toast.error("Server error please try again later!", {
          position: "bottom-right",
          duration: 1500
        });
      }
    } catch (_) {
      setIsResOk(false);
      toast.error("Server currently down please try again later!", {
        position: "bottom-right",
        duration: 1500
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogContent>
        <DialogTitle>Verify 2 Factor Authentication Token</DialogTitle>
        <DialogDescription className="justify-self-center">
          <SmartphoneIcon size={150} fill="black" fillOpacity={0.5} />
        </DialogDescription>
        <AuthAppInputForm
          isLoading={isLoading}
          isResOk={isResOk}
          verifyToken={verifyToken}
        />
      </DialogContent>
    </Dialog>
  );
}
