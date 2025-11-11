"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

import { CurrentPost } from "@/lib/types";

const PostsContext = createContext({
  currentPosts: [] as CurrentPost[],
  setCurrentPosts: ((_: CurrentPost[]) => {}) as React.Dispatch<
    React.SetStateAction<CurrentPost[]>
  >
});

export function PostsProvider({ children }: { children: ReactNode }) {
  const [currentPosts, setCurrentPosts] = useState<CurrentPost[]>([]);
  return (
    <PostsContext.Provider value={{ currentPosts, setCurrentPosts }}>
      {children}
    </PostsContext.Provider>
  );
}

export const useCurrentPosts = () => useContext(PostsContext);
