"use client";
import Image from "next/image";

import FacebookForm from "@/lib/components/forms/settings/socials/FacebookForm";
import GithubForm from "@/lib/components/forms/settings/socials/GithubForm";
import GitlabForm from "@/lib/components/forms/settings/socials/GitlabForm";
import InstagramForm from "@/lib/components/forms/settings/socials/InstagramForm";
import XForm from "@/lib/components/forms/settings/socials/XForm";
import YoutubeForm from "@/lib/components/forms/settings/socials/YoutubeForm";
import FacebookIcon from "@/lib/components/icons/FacebookIcon";
import GithubIcon from "@/lib/components/icons/GithubIcon";
import GitlabIcon from "@/lib/components/icons/GitlabIcon";
import InstagramIcon from "@/lib/components/icons/InstagramIcon";
import XIcon from "@/lib/components/icons/XIcon";
import YoutubeIcon from "@/lib/components/icons/YoutubeIcon";
import type { GetSocialsDto } from "@/lib/types/dto/CommonDto";

export default function SocialsSection({ data }: { data?: GetSocialsDto }) {
  return (
    <section className="flex grow flex-col gap-2 rounded-lg">
      <h2 className="text-lg font-bold">Social/Other Accounts</h2>
      <div className="glass-container grid auto-rows-fr grid-cols-2 justify-between gap-4 p-6">
        <div className="relative flex flex-col justify-center">
          <div className="absolute size-full max-h-[160px] self-center overflow-hidden rounded-md">
            <Image
              src="https://github.blog/wp-content/uploads/2024/06/AI-DarkMode-4.png?w=600"
              alt="Github banner"
              sizes="(max-width: 550)"
              className="object-cover blur-sm"
              priority
              fill
            />
          </div>
          <div className="neu-base group relative flex h-full flex-col gap-2 rounded-md bg-base-background/50 p-4 hover:bg-foreground/10">
            <div className="flex items-center gap-2 font-bold text-accent-foreground group-hover:text-neutral-200">
              <span className="text-2xl">
                <GithubIcon />
              </span>
              <label htmlFor="github-link">Github</label>
            </div>
            <GithubForm link={data?.github || ""} />
          </div>
        </div>
        <div className="relative flex shrink grow basis-0 flex-col justify-center">
          <div className="absolute flex size-full max-h-[160px] overflow-hidden rounded-md">
            <span className="flex size-full items-center justify-center bg-gradient-to-r from-[#5e2981] via-[#ca1717] to-[#b98132] text-7xl text-white blur-sm">
              <InstagramIcon />
            </span>
          </div>
          <div className="neu-base group relative flex h-full flex-col gap-2 rounded-md bg-base-background/50 p-4 hover:bg-foreground/10">
            <div className="flex items-center gap-2 font-bold text-accent-foreground group-hover:text-neutral-200">
              <span className="text-2xl">
                <InstagramIcon />
              </span>
              <label htmlFor="instagram-link">Instagram</label>
            </div>
            <InstagramForm link={data?.instagram || ""} />
          </div>
        </div>
        <div className="relative flex shrink grow basis-0 flex-col justify-center">
          <div className="absolute size-full max-h-[160px] self-center overflow-hidden rounded-md bg-black">
            <Image
              src="https://cdn.cms-twdigitalassets.com/content/dam/blog-twitter/x/blog_x_card.png.img.fullhd.medium.png"
              alt="X banner"
              sizes="(max-width: 550)"
              className="scale-[1.4] object-contain blur-sm"
              fill
            />
          </div>
          <div className="neu-base group relative flex h-full flex-col gap-2 rounded-md bg-base-background/50 p-4 hover:bg-foreground/10">
            <div className="flex items-center gap-2 font-bold text-accent-foreground group-hover:text-neutral-200">
              <span className="text-2xl">
                <XIcon />
              </span>
              <label htmlFor="x-link">X</label>
            </div>
            <XForm link={data?.x || ""} />
          </div>
        </div>
        <div className="relative flex shrink grow basis-0 flex-col justify-center">
          <div className="absolute size-full max-h-[160px] self-center overflow-hidden rounded-md">
            <span className="flex size-full items-center justify-center bg-base-foreground/10 text-8xl text-white blur-sm [&>*]:fill-red-600 [&>*]:stroke-none">
              <YoutubeIcon />
            </span>
          </div>
          <div className="neu-base group relative flex h-full flex-col gap-2 rounded-md bg-base-background/60 p-4 hover:bg-foreground/10">
            <div className="flex items-center gap-2 font-bold text-accent-foreground group-hover:text-neutral-200">
              <span className="text-2xl [&>*]:fill-none [&>*]:stroke-current">
                <YoutubeIcon />
              </span>
              <label htmlFor="youtube-link">Youtube</label>
            </div>
            <YoutubeForm link={data?.youtube || ""} />
          </div>
        </div>
        <div className="relative flex shrink grow basis-0 flex-col justify-center">
          <div className="absolute size-full max-h-[160px] self-center overflow-hidden rounded-md">
            <span className="flex size-full items-center justify-center bg-base-foreground/10 text-8xl blur-sm [&>*]:fill-blue-600 [&>*]:stroke-none">
              <FacebookIcon />
            </span>
          </div>
          <div className="neu-base group relative flex h-full flex-col gap-2 rounded-md bg-base-background/60 p-4 hover:bg-foreground/10">
            <div className="flex items-center gap-2 font-bold text-accent-foreground group-hover:text-neutral-200">
              <span className="text-2xl">
                <FacebookIcon />
              </span>
              <h3>Facebook</h3>
            </div>
            <FacebookForm link={data?.facebook || ""} />
          </div>
        </div>
        <div className="relative flex shrink grow basis-0 flex-col justify-center">
          <div className="absolute size-full max-h-[160px] self-center overflow-hidden rounded-md bg-indigo-950">
            <Image
              src="https://images.ctfassets.net/xz1dnu24egyd/1IRkfXmxo8VP2RAE5jiS1Q/ea2086675d87911b0ce2d34c354b3711/gitlab-logo-500.png"
              alt="Gitlab banner"
              sizes="(max-width: 550)"
              className="scale-125 object-contain blur-sm"
              fill
            />
          </div>
          <div className="neu-base group relative flex h-full flex-col gap-2 rounded-md bg-base-background/50 p-4 hover:bg-foreground/10">
            <div className="flex items-center gap-2 font-bold text-accent-foreground group-hover:text-neutral-200">
              <span className="text-2xl">
                <GitlabIcon />
              </span>
              <h3>Gitlab</h3>
            </div>
            <GitlabForm link={data?.gitlab || ""} />
          </div>
        </div>
      </div>
    </section>
  );
}
