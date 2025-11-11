import PostCardsHolderB from "@/lib/components/cards/holders/PostCardsHolderB";
import { PostsProvider } from "@/lib/contexts/PostsContext";

export default function PublishedPage() {
  const url = "/post/user?number=1&size=10";
  return (
    <main className="flex w-full gap-6 px-6 py-8">
      <PostsProvider>
        <PostCardsHolderB url={url} />
      </PostsProvider>
    </main>
  );
}
