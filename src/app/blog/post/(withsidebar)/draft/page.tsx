import DraftCardsHolderB from "@/lib/components/cards/holders/DraftCardsHolderB";
import { PostsProvider } from "@/lib/contexts/PostsContext";

export default function DraftPage() {
  const url = "/draft/user?number=1&size=10";
  return (
    <main className="flex w-full gap-6 px-6 py-8">
      <PostsProvider>
        <DraftCardsHolderB url={url} />
      </PostsProvider>
    </main>
  );
}
