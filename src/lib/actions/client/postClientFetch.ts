import { AnyObj } from "@/lib/types";

export default async function postClientFetch(
  route: string,
  values: AnyObj
): Promise<boolean> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}${route}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  });

  return response.ok;
}
