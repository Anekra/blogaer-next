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

export enum ErrorType {
  FETCH_FAILED_ERROR = "Failed to fetch!",
  UNEXPECTED_ERROR = "An unexpected error occurred!",
  CANCELED_BY_USER = "Login canceled by user!"
}

export enum RedirectParam {
  RequestExpired = "Request expired."
}

export enum EmailSubject {
  AddPassword = "add-password",
  ResetPassword = "reset-password",
  UpdateEmail = "update-email",
  UpdateUsername = "update-username",
  VerifyEmail = 'verify-email'
}

export enum EmailInfo {
  Success = "Email has been sent successfully, please check your email."
}
