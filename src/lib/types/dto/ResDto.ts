import type { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/browser";
import type { RefreshToken } from "..";
import type {
	EmailUsernameRequestDto,
	GetSocialsDto,
	PagedDraftWithNoUserDto,
	PagedPostDto,
	PagedPostWithNoUserDto,
	SavedAccountsDto,
	TwoFADto,
	UserOauthDto,
	UserRequestDto
} from "./CommonDto";
import type { DraftDto } from "./DraftDto";
import type { PostDto } from "./PostDto";

export type RefreshTokenDto = {
	status: string;
	message: string;
	data: RefreshToken;
};

export type GetPostByIdDto = {
	status: string;
	data?: PostDto;
	error?: string;
};

export type GetDraftByIdDto = {
	status: string;
	data?: DraftDto;
	error?: string;
};

export type GetPostsByPageDto = {
	status: string;
	data?: PagedPostDto;
	message?: string;
	error?: string;
	code: string;
};

export type GetPostsByUserIdDto = {
	status: string;
	data?: PagedPostWithNoUserDto;
	error?: string;
};

export type GetDraftsByUserIdDto = {
	status: string;
	data?: PagedDraftWithNoUserDto;
	error?: string;
};

export type GetAccountSectionDto = {
	status: string;
	data?: {
		userRequests: EmailUsernameRequestDto;
		socials: GetSocialsDto;
	};
	error?: string;
};

export type GetSecuritySectionDto = {
	status: string;
	data?: {
		userPassword?: boolean;
		userTwoFA: TwoFADto;
		userOauth: UserOauthDto;
		userRequest: UserRequestDto;
	};
	error?: string;
};

export type GetSavedAccounts = {
	status: string;
	data?: SavedAccountsDto[];
	error?: string;
};

export type GetOtpTimeDto = {
	status: string;
	data?: {
		time: string;
	};
	error?: string;
};

export type PostWithResIdDto = {
	status: string;
	data?: { id: string };
	error?: string;
};

export type GenRegWebauthnDto {
	status: string;
	data: {
		options: PublicKeyCredentialCreationOptionsJSON;
	};
}
