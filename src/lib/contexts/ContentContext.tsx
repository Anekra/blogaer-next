"use client"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from "react";

import { CustomElement } from "@/lib/types/slate";
import { INITIAL_VALUE } from "@/lib/utils/constants";

export type ContentContextType = {
  content: CustomElement[];
  setContent: Dispatch<SetStateAction<CustomElement[]>>;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  isDoneEditing: boolean;
  setIsDoneEditing: Dispatch<SetStateAction<boolean>>;
};

const ContentContext = createContext<ContentContextType>({
  content: [],
  setContent: () => {},
  tags: [],
  setTags: () => {},
  isDoneEditing: true,
  setIsDoneEditing: () => {}
});

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<CustomElement[]>(INITIAL_VALUE);
  const [tags, setTags] = useState<string[]>([]);
  const [isDoneEditing, setIsDoneEditing] = useState<boolean>(true);

  return (
    <ContentContext.Provider
      value={{
        content,
        setContent,
        tags,
        setTags,
        isDoneEditing,
        setIsDoneEditing
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
