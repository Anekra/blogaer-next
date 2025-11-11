export default async function deleteClientFetch(route: string, slug?: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ROUTE}${route}${slug || ""}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  return response.ok;
}
