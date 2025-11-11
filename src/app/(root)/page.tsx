import { Link } from "next-view-transitions";

import PostCardsHolderA from "@/lib/components/cards/holders/PostCardsHolderA";
import ArticleIcon from "@/lib/components/icons/ArticleIcon";
import CategoryIcon from "@/lib/components/icons/CategoryIcon";
import { CATEGORIES } from "@/lib/utils/constants";

export default function RootPage() {
  return (
    <main className="gradient-background flex flex-col pb-8">
      <section className="flex w-full flex-col items-center justify-between px-6 pt-20 xs:px-10 sm:flex-row sm:gap-6 sm:px-12 xl:px-24">
        <div className="order-2 flex flex-col gap-3 py-4 sm:order-1 sm:gap-6 sm:py-16 xl:w-[500px]">
          <h1 className="pb-3 font-serif text-4xl font-bold xl:text-5xl">
            Exploring Thoughts
          </h1>
          <p className="md:w-[300px] xl:w-[400px] xl:text-lg">
            This is a site for sharing thoughts, stories, experiences, and
            knowledge. Please Explore, Share and Enjoy your time here.
          </p>
          <Link href="/blog/explore" className="w-fit">
            <button className="btn-solid-root">
              <span>EXPLORE</span>
            </button>
          </Link>
        </div>
        <div className="order-1 grow sm:order-2"></div>
      </section>
      <section
        id="recent-posts"
        className="glass-container my-6 flex flex-col gap-6 p-6 xs:m-6 md:m-8 md:p-8 lg:m-12 lg:p-12"
      >
        <div className="flex items-center gap-2 font-serif text-3xl font-bold">
          <ArticleIcon />
          <h1>Recent</h1>
        </div>
        <PostCardsHolderA />
      </section>
      <section className="flex flex-col gap-8 px-6 py-10 xs:px-10 sm:items-center sm:px-12 xl:px-24">
        <div className="flex items-center gap-2 font-serif text-3xl">
          <CategoryIcon />
          <h1>Categories</h1>
        </div>
        <div className="flex w-fit flex-wrap place-items-center gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {CATEGORIES.filter((_, i) => i < 20).map((e, i) => {
            return (
              <div
                key={i}
                className="flex items-center justify-center rounded-xl bg-foreground/10 p-4 sm:size-[200px]"
              >
                <p className="text-center xs:text-2xl">{e}</p>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center">
          <Link
            href="/blog/categories"
            className="text-secondary-foreground underline"
          >
            See all categories
          </Link>
        </div>
      </section>
    </main>
  );
}
