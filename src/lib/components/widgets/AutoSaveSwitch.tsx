import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useContent } from "@/lib/contexts/ContentContext";

export default function AutoSaveSwitch() {
  const currentPath = usePathname();
  const { isDoneEditing } = useContent();
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    const autosave = localStorage.getItem("autosave");
    if (autosave) setIsOn(JSON.parse(autosave) === true);
  }, [isOn]);

  return (
    <div className="flex grow justify-between">
      <div className="flex items-center gap-2 text-xs">
        <div className="group flex h-8 items-center">
          <label
            htmlFor="autosave-switch"
            className={`${
              isOn ? "text-primary-foreground" : "text-accent"
            } px-1 hover:cursor-pointer group-hover:text-primary-foreground`}
          >
            Autosave
          </label>
          <div className="switch-container group-hover:neu-base-inset h-full w-[58px] bg-base-background group-hover:bg-accent">
            <input
              id="autosave-switch"
              type="checkbox"
              className="absolute z-[1] size-full appearance-none rounded-full hover:cursor-pointer"
              checked={isOn}
              onChange={(e) => {
                setIsOn(e.target.checked);
                localStorage.setItem("autosave", `${e.target.checked}`);
              }}
            />
            <span
              className={`${
                isOn ? "translate-x-full" : "translate-x-0 !bg-accent"
              } switch-toggle group-hover:neu-base p-1 text-base-background`}
            >
              {isOn ? "On" : "Off"}
            </span>
          </div>
        </div>
        {currentPath !== "/blog/post/create" && (
          <p
            className={`${
              isDoneEditing ? "w-full" : "dots-loading w-full"
            } whitespace-nowrap`}
          >
            {isDoneEditing ? "saved in draft" : "saving"}
          </p>
        )}
      </div>
      {!isOn && <button className="btn-outline-p">Save to draft</button>}
    </div>
  );
}
