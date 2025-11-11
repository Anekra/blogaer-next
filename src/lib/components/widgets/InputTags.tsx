import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { Input } from "@/lib/components/ui/input";

export default function InputTags({
  tagsState: [tags, setTags],
  tagsLengthState: [tagsLength, setTagsLength]
}: {
  tagsState: [string[], Dispatch<SetStateAction<string[]>>];
  tagsLengthState: [number, React.Dispatch<React.SetStateAction<number>>];
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRef = useRef<HTMLDivElement>(null);
  const hiddenSpanRef = useRef<HTMLSpanElement>(null);
  const [showOption, setShowOption] = useState(false);
  const [input, setInput] = useState("");
  const getTags = (tag: string) => {
    return tag
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0 && t !== "" && !tags.includes(t));
  };
  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (tagsLength >= 10 && e.key === ",") return e.preventDefault();

    setShowOption(input.length > 0);
    const inputEl = e.target as HTMLInputElement;
    const tag = inputEl.value;
    setInput(tag);
    const newTags = getTags(tag);
    setTagsLength(tags.length + newTags.length);

    if (e.key === "Enter") {
      if (newTags.length > 0) setTags([...tags, ...newTags]);
      setInput("");
      setShowOption(false);
    }
  };
  const handleOnBlur = () => setShowOption(false);

  useEffect(() => {
    if (hiddenSpanRef.current && inputRef.current && optionRef.current) {
      hiddenSpanRef.current.textContent = input;
      const newWidth = hiddenSpanRef.current.offsetWidth + 4;
      inputRef.current.style.width = `${newWidth}px`;
      optionRef.current.style.width = `${newWidth}px`;
    }
  }, [input]);

  return (
    <div className="relative w-fit min-w-52">
      <span
        ref={hiddenSpanRef}
        className="pointer-events-none !visible absolute left-0 top-0 whitespace-pre opacity-0"
      />
      <Input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add tags to your post here"
        className="mb-[10px] w-fit min-w-48 max-w-[250px] !bg-base-background hover:!ring-offset-background focus:!ring-offset-background xl:max-w-md"
        onKeyUp={handleOnKeyUp}
        onBlur={handleOnBlur}
      />
      <div
        ref={optionRef}
        className={`${showOption ? "flex" : "hidden"} absolute w-fit min-w-52 max-w-[250px] flex-col rounded bg-base-background text-sm ring-2 ring-foreground ring-offset-2 ring-offset-background xl:max-w-md`}
      >
        <ul className="flex flex-col *:rounded-sm *:px-2 hover:[&>*]:bg-foreground/40">
          <li className="pointer-events-none pb-0.5 pt-1 text-xs text-muted-foreground">
            Add {`${input.includes(",") ? "tags" : "tag"}`}
          </li>
          <li
            className="cursor-pointer py-1.5 text-end"
            value={input}
            onClick={() => {
              const newTags = getTags(input);
              setTagsLength(tags.length + newTags.length);
              setInput("");
              if (newTags.length > 0) setTags([...tags, ...newTags]);
            }}
          >
            {input}
          </li>
        </ul>
        <ul className="flex flex-col *:rounded-sm *:px-2 [&>*:not(:first-child)]:py-1.5 [&>*:not(:first-child)]:text-end hover:[&>*]:bg-foreground/40">
          <li className="pointer-events-none py-0.5 text-xs text-muted-foreground">
            Suggestions
          </li>
          <li>kotlin</li>
          <li>java</li>
          <li>compose</li>
        </ul>
      </div>
    </div>
  );
}
