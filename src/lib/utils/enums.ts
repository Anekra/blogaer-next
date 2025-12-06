export enum WysiwygType {
	Paragraph = "paragraph",
	Heading = "heading",
	Code = "code",
	Quote = "quote",
	List = "list",
	ListBullets = "bullets",
	ListNumbers = "numbers",
	Image = "image",
	ImagePicker = "imagePicker",
	Divider = "divider"
}

export enum WysiwygAlign {
	Left = "text-left",
	Center = "text-center",
	Right = "text-right",
	Justify = "text-justify"
}

export enum WysiwygStyle {
	Bold = "bold",
	Italic = "italic",
	Underline = "underline",
	Strike = "strikethrough",
	Link = "link"
}

export enum HeadingSize {
	H3 = "text-xl",
	H2 = "text-2xl",
	H1 = "text-3xl",
	H = "text-5xl"
}

export enum HotKey {
	"mod+b" = "bold",
	"mod+i" = "italic",
	"mod+u" = "underline",
	"mod+delete" = "strikethrough"
}

export enum ErrorCode {
	CanceledByUser = "canceled"
}

export enum ErrorMsg {
	FetchFailedError = "Failed to fetch!",
	UnexpectedError = "An unexpected error occurred!",
	CanceledByUser = "Login canceled by user!",
	SessionExpired = "Session expired!"
}

export enum RedirectParam {
	RequestExpired = "Request expired."
}

export enum EmailSubject {
	AddPassword = "add-password",
	ResetPassword = "reset-password",
	UpdateEmail = "update-email",
	UpdateUsername = "update-username",
	VerifyEmail = "verify-email"
}

export enum TempInfo {
	LoginSuccess = "Login successful.",
	LogoutSuccess = "Logout successful.",
	SessionExpired = "Your session has expired! please login again.",
	EmailSent = "Email has been sent, please check your email.",
	VerifyEmailSent = "Verification email has been sent, please check your email.",
	VerifyEmailSuccess = "Your email has been successfully verified.",
	VerifyEmailFailed = "Your email verification has failed!"
}

export enum TempKey {
	ToastMsg = "toast-message",
	VerifyEmailSentToastMsg = "verify-email-sent-message",
	EmailVerifiedToastMsg = "email-verified-message",
	LoginSuccessToastMsg = "login-success-message",
	LogoutSuccessToastMsg = "logout-success-message",
	SessionExpiredToastMsg = "session-expired-message",
	CSRFTkn = "csrf-token",
	Sidebar = "sidebar"
}
