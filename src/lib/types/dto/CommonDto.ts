import type { AnyObj, Auth } from "..";
import type { DraftWithNoUserDto } from "./DraftDto";
import type { PostDto, PostWithNoUserDto } from "./PostDto";

export type EncoreErrDto = {
	code: string;
	message: string;
	details?: unknown;
};

export type AuthDto = {
	status: string;
	data: Auth;
	message: string;
};

export type CommonDto = {
	status: string;
	data?: AnyObj;
	message?: string;
	error?: string;
};

export type PagedPostDto = {
	currentPage: number;
	totalPages: number;
	totalPosts: number;
	posts: PostDto[];
};

export type PagedPostWithNoUserDto = {
	currentPage: number;
	totalPages: number;
	totalPosts: number;
	posts: PostWithNoUserDto[];
};

export type PagedDraftWithNoUserDto = {
	currentPage: number;
	totalPages: number;
	totalDrafts: number;
	drafts: DraftWithNoUserDto[];
};

export type UserOauthDto = {
	github: string;
	google: string;
	apple: string;
	gitlab: string;
	x: string;
	instagram: string;
	facebook: string;
	microsoft: string;
};

export type TwoFADto = {
	twoFAMethod?: string;
	isTwoFAEnabled?: boolean;
	isPasskey?: boolean;
	isAuthApp?: boolean;
};

export type SavedAccountsDto = {
	username: string;
	email: string;
	img: string;
};

export type UserRequestDto = {
	request: string;
	limit: number;
	status: string;
};

export type EmailUsernameRequestDto = {
	emailRequest: boolean;
	usernameRequest: boolean;
};

export type GetSocialsDto = {
	github: string;
	instagram: string;
	x: string;
	youtube: string;
	facebook: string;
	gitlab: string;
};
