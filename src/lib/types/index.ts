import type { DraftDto, DraftWithNoUserDto } from "@/lib/types/dto/DraftDto";
import type { PostDto, PostWithNoUserDto } from "@/lib/types/dto/PostDto";
import type { BaseEditor } from "slate";
import type { HistoryEditor } from "slate-history";
import type { ReactEditor } from "slate-react";

export type Session = {
	clientId: string;
	username: string;
	email: string;
	role: string;
	name: string;
	desc?: string;
	img?: string;
	exp?: number;
} | null;

export type SessionCookie = {
	username: string;
	email: string;
	role: string;
	img?: string;
} | null;

export type Auth = {
	clientId: string;
	username: string;
	email: string;
	name: string;
	role: string;
	csrf: string;
	exp?: number;
	desc?: string;
	img?: string;
};

export type RefreshToken = {
	username: string;
	clientId: string;
	csrf: string;
	exp: number;
};

export type Draft = {
	id: string;
	title: string;
	content?: unknown;
	tags?: string[];
};

export type EditPost = {
	slugOrId: string;
	title: string;
	content: unknown;
	tags: string[];
};

export type SearchParams = { param: string; value: string }[];

export type CurrentPost =
	| PostDto
	| PostWithNoUserDto
	| DraftDto
	| DraftWithNoUserDto;

export type SlateEditor = BaseEditor & ReactEditor & HistoryEditor;

export type AnyObj = { [key: string]: unknown };

export type EncoreErrorCode =
	| "ok"
	| "canceled"
	| "unknown"
	| "invalid_argument"
	| "deadline_exceeded"
	| "not_found"
	| "already_exists"
	| "permission_denied"
	| "resource_exhausted"
	| "failed_precondition"
	| "aborted"
	| "out_of_range"
	| "unimplemented"
	| "internal"
	| "unavailable"
	| "data_loss"
	| "unauthenticated";
