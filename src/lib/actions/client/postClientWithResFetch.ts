import { AnyObj } from "@/lib/types";

export default async function postClientWithResFetch<T>(
  route: string,
  values: AnyObj
): Promise<T> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}${route}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  });

  return (await response.json()) as T;
}
