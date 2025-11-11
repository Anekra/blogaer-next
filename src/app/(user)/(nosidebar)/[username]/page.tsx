"use client";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

import FollowersIcon from "@/lib/components/icons/FollowersIcon";
import PostsIcon from "@/lib/components/icons/PostsIcon";
import TotalReadsIcon from "@/lib/components/icons/TotalReadsIcon";
import { useSession } from "@/lib/contexts/SessionContext";

export default function UserProfilePage() {
  const { session } = useSession();
  return (
    <div className="flex min-h-[calc(100vh-66px)] gap-10 px-20 py-8">
      <aside className="neu-base-md flex w-[300px] flex-col items-center gap-4 rounded-lg px-6 py-9">
        {session?.img ? (
          <div className="relative size-[160px] overflow-hidden rounded-full border-[3.5px] border-primary-foreground">
            <Image
              src={session.img}
              alt="Profile"
              className="object-cover"
              fill
            />
          </div>
        ) : (
          <span className="relative flex size-[160px] items-end justify-center overflow-hidden rounded-full text-primary-foreground shadow-[inset_0_0_0_8px_oklch(var(--primary-foreground))]">
            <UserIcon className="absolute -bottom-3 size-full fill-current" />
          </span>
        )}
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">Username</p>
          <p className="font-serif">Software Developer</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex h-7 gap-1">
            <span className="[&>*]:size-full">
              <FollowersIcon />
            </span>
            <p>000 Followers</p>
          </div>
          <div className="flex h-7 gap-1">
            <span className="[&>*]:size-full">
              <PostsIcon />
            </span>
            <p>000 Blogs posted</p>
          </div>
          <div className="flex h-7 gap-1">
            <span className="[&>*]:size-[95%]">
              <TotalReadsIcon />
            </span>
            <p>000 Total reads</p>
          </div>
        </div>
        <p className="text-sm text-accent-foreground">
          Joined since 30 Des 2024
        </p>
        <div className="flex w-full grow justify-center">
          <button className="btn-solid-p-rounder grow self-end font-bold">
            FOLLOW
          </button>
        </div>
      </aside>
      <main className="group flex grow flex-col">
        <nav className="neu-base-lg z-[1] flex w-fit rounded-lg">
          <input
            type="radio"
            id="blog-tab"
            name="profile-tab-name"
            className="appearance-none"
            defaultChecked
          />
          <label htmlFor="blog-tab">Blog</label>
          <input
            type="radio"
            id="about-tab"
            name="profile-tab-name"
            className="appearance-none"
          />
          <label htmlFor="about-tab">About</label>
        </nav>
        <div className="neu-base-md flex grow rounded-lg">
          <section className="z-[2] hidden grow rounded-lg bg-background p-6 group-has-[input#blog-tab:checked]:flex">
            <p className="">blog</p>
          </section>
          <section className="z-[2] hidden grow rounded-lg bg-background p-6 group-has-[input#about-tab:checked]:flex">
            <p className="">about</p>
          </section>
        </div>
      </main>
    </div>
  );
}
