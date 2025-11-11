"use client";
import AppleIcon from "@/lib/components/icons/AppleIcon";
import GithubIcon from "@/lib/components/icons/GithubIcon";
import GoogleIcon from "@/lib/components/icons/GoogleIcon";
import MicrosoftIcon from "@/lib/components/icons/MicrosoftIcon";
import { UserOauthDto } from "@/lib/types/dto/CommonDto";

export default function OauthSection({ data }: { data?: UserOauthDto }) {
  return (
    <section className="col-span-12 flex min-w-[420px] flex-col gap-2 rounded-lg">
      <h2 className="text-lg font-bold">Oauth Login</h2>
      <div className="glass-container flex flex-col items-center gap-6 p-6 [&>*]:w-full [&>*]:max-w-[420px] ql:[&>*]:max-w-screen-sm">
        <div className="neu-base flex flex-col gap-2 rounded">
          <h3 className="rounded-t-sm bg-base-foreground/10 px-4 py-2 text-center font-semibold">
            Add oauth associations
          </h3>
          <div className="grid grid-cols-1 justify-items-center gap-4 p-4 ql:grid-cols-2 [&>*]:min-w-[270px]">
            {!data?.github && (
              <button className="btn-outline-base flex max-w-[250px] items-center gap-2">
                <span className="relative flex size-7 justify-center rounded-3xl bg-foreground text-2xl [&>*]:absolute [&>*]:bottom-[-1.5px] [&>*]:fill-background [&>*]:stroke-background">
                  <GithubIcon />
                </span>
                <p>Add login with Github</p>
              </button>
            )}
            {!data?.apple && (
              <button className="btn-outline-base flex max-w-[250px] items-center gap-2">
                <span className="text-3xl">
                  <AppleIcon />
                </span>
                <p>Add login with Apple</p>
              </button>
            )}
            {/* {!data?.x && (
              <button className="btn-outline-base flex max-w-[250px] items-center gap-2">
                <span className="text-2xl">
                  <XIcon />
                </span>
                <p>Add login with X</p>
              </button>
            )} */}
            {!data?.google && (
              <button className="btn-outline-google flex max-w-[250px] items-center gap-2">
                <span className="text-3xl">
                  <GoogleIcon colored />
                </span>
                <p>Add login with Google</p>
              </button>
            )}
            {/* {!data?.gitlab && (
              <button className="btn-outline-gitlab flex max-w-[250px] items-center gap-2">
                <span className="text-3xl [&>*]:fill-[#E24329] [&>*]:stroke-none">
                  <GitlabIcon />
                </span>
                <p>Add login with Gitlab</p>
              </button>
            )}
            {!data?.instagram && (
              <button className="btn-outline-instagram flex max-w-[250px] items-center gap-2">
                <span className="gradient-instagram rounded-lg text-3xl [&>*]:fill-custom-bg1 [&>*]:stroke-transparent">
                  <InstagramIcon />
                </span>
                <p>Add login with Instagram</p>
              </button>
            )}
            {!data?.facebook && (
              <button className="btn-outline-facebook flex max-w-[250px] items-center gap-2">
                <span className="text-3xl [&>*]:fill-[#1877F2] [&>*]:stroke-transparent">
                  <FacebookIcon />
                </span>
                <p>Add login with Facebook</p>
              </button>
            )} */}
            {!data?.microsoft && (
              <button className="btn-outline-microsoft flex max-w-[250px] items-center gap-2">
                <span className="text-3xl">
                  <MicrosoftIcon />
                </span>
                <p>Add login with Microsoft</p>
              </button>
            )}
          </div>
        </div>
        {(data?.github || data?.apple || data?.google || data?.microsoft) && (
          <div className="neu-base flex flex-col rounded">
            <h3 className="rounded-t-sm bg-base-foreground/10 px-4 py-2 text-center font-semibold">
              Remove oauth associations
            </h3>
            <div className="flex flex-col gap-4 p-4">
              {data?.github && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex size-7 justify-center rounded-3xl bg-foreground text-2xl [&>*]:absolute [&>*]:bottom-[-1.5px] [&>*]:fill-background [&>*]:stroke-background">
                      <GithubIcon />
                    </span>
                    <p>{"github.com"}</p>
                  </div>
                  <button className="btn-text-destructive">Remove</button>
                </div>
              )}
              {data?.apple && (
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-3xl">
                    <AppleIcon />
                    <p className="text-base">apple.com</p>
                  </span>
                  <button className="btn-text-destructive">Remove</button>
                </div>
              )}
              {data?.google && (
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-3xl">
                    <GoogleIcon colored />
                    <p className="text-base">andika.eka.102@gmail.com</p>
                  </span>
                  <button className="btn-text-destructive">Remove</button>
                </div>
              )}
              {/* {data?.gitlab && (
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl [&>*]:fill-[#E24329] [&>*]:stroke-none">
                    <GitlabIcon />
                  </span>
                  <p>gitlab.com</p>
                </div>
                <button className="btn-text-destructive">Remove</button>
              </div>
            )}
            {data?.x && (
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex w-[30px] justify-center text-2xl">
                    <XIcon />
                  </span>
                  <p className="text-base">x.com</p>
                </div>
                <button className="btn-text-destructive">Remove</button>
              </div>
            )}
            {data?.instagram && (
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="gradient-instagram rounded-lg text-3xl [&>*]:fill-custom-bg1 [&>*]:stroke-transparent">
                    <InstagramIcon />
                  </span>
                  <p>instagram.com</p>
                </div>
                <button className="btn-text-destructive">Remove</button>
              </div>
            )}
            {data?.facebook && (
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl [&>*]:fill-[#1877F2] [&>*]:stroke-transparent">
                    <FacebookIcon />
                  </span>
                  <p>facebook.com</p>
                </div>
                <button className="btn-text-destructive">Remove</button>
              </div>
            )} */}
              {data?.microsoft && (
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-3xl">
                    <MicrosoftIcon />
                    <p className="text-base">microsoft.com</p>
                  </span>
                  <button className="btn-text-destructive">Remove</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
