import { create } from "zustand";

import { CATEGORIES } from "@/lib/utils/constants";

type TagStore = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

export const useTagStore = create<TagStore>((set) => ({
  tags: CATEGORIES,
  setTags: (tags) => set({ tags })
}));
