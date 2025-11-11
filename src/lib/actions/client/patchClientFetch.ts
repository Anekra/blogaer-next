import { CommonDto } from "@/lib/types/dto/CommonDto";

export default async function patchClientFetch(
  values: any,
  route: string
): Promise<CommonDto> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}${route}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  });

  return await response.json();
}
