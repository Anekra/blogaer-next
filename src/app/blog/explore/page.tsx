import PostCardsHolderA from "@/lib/components/cards/holders/PostCardsHolderA";
import PostCategoryTabs from "@/lib/components/post/PostCategoryTabs";

export default function ExplorePage() {
  return (
    <main className="flex w-full flex-col gap-6 px-6 pb-6 pt-20 xs:px-8 md:px-10 lg:px-12 xl:px-16">
      <h1 className="mt-6 text-4xl font-bold">Explore</h1>
      <PostCategoryTabs />
      <PostCardsHolderA />
    </main>
  );
}
