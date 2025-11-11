import { SmartphoneIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import getClientFetch from "@/lib/actions/client/getClientFetch";
import postClientFetch from "@/lib/actions/client/postClientFetch";
import AuthAppInputForm from "@/lib/components/forms/settings/two-fa/auth-app/AuthAppInputForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@/lib/components/ui/dialog";
import { useLoading } from "@/lib/contexts/LoadingContext";

type Data = {
  url: string;
  secretId: string;
  success?: boolean;
} | null;

export default function AuthAppAddDialog() {
  const [data, setData] = useState<Data>(null);
  const [opened, setOpened] = useState(false);
  const handleOpenChange = async (isOpen: boolean) => {
    setOpened(isOpen);
    if (isOpen) {
      const resJson = await getClientFetch("/auth/two-fa/auth-app/register");
      setData({
        url: `${resJson.data.url}`,
        secretId: `${resJson.data.secretId}`
      });
    }
  };

  const { isLoading, setLoading, setShowIcon } = useLoading();
  const [isResOk, setIsResOk] = useState<boolean | null>(null);
  const verifyToken = async (token: string) => {
    setLoading(true);
    setShowIcon(false);
    try {
      const res = await postClientFetch("/auth/two-fa/auth-app/verify", {
        token,
        secretId: data?.secretId
      });
      if (res) {
        setIsResOk(true);
        toast.success("Authenticator app successfully added.", {
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
    <Dialog open={opened} onOpenChange={handleOpenChange}>
      <div className="flex justify-between gap-4">
        <span className="flex gap-2">
          <SmartphoneIcon />
          <label>Authenticator app</label>
        </span>
        <DialogTrigger className="btn-solid-base-rounder">Add</DialogTrigger>
      </div>
      <DialogContent>
        <DialogTitle>Add Authenticator App</DialogTitle>
        <DialogDescription>
          Scan this QR code with your authenticator app and input the token in
          the app to confirm the validation process.
        </DialogDescription>
        {data && (
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src={data.url}
              alt="Scan this QR code"
              width={200}
              height={200}
              unoptimized
              priority
            />
            <AuthAppInputForm
              isLoading={isLoading}
              isResOk={isResOk}
              verifyToken={verifyToken}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
