"use client";
import getClientFetch from "@/lib/actions/client/getClientFetch";
import PostGridCardC from "@/lib/components/cards/PostGridCardC";
import { useCurrentPosts } from "@/lib/contexts/PostsContext";
import type { GetDraftsByUserIdDto } from "@/lib/types/dto/ResDto";
import { useEffect } from "react";
import useSWRImmutable from "swr/immutable";

export default function DraftCardsHolderB({ url }: { url: string }) {
	const { currentPosts, setCurrentPosts } = useCurrentPosts();
	const {
		data: res,
		error,
		isLoading
	} = useSWRImmutable<GetDraftsByUserIdDto>(url, getClientFetch);

	useEffect(() => {
		if (!res) return;
		if (res.data && res.data.drafts.length > 0)
			setCurrentPosts(res.data.drafts);
	}, [res, setCurrentPosts]);

	if (!res || isLoading) return <p>loading...</p>;
	if (error) return <p>error</p>;
	if (res.data?.totalDrafts === 0) return <p>No data found!</p>;
	if (res.error) return <p>{res.status}</p>;

	return (
		<div className="grid w-full auto-rows-fr grid-cols-1 ms:grid-cols-2 ql:grid-cols-3 gap-4">
			{currentPosts.map((draft, i) => {
				return (
					<PostGridCardC
						key={draft.id}
						postData={{ post: draft, postIndex: i }}
					/>
				);
			})}
		</div>
	);
}
