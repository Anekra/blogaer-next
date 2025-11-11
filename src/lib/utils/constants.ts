import { CustomElement } from "@/lib/types/slate";

import { HeadingSize, WysiwygAlign, WysiwygType } from "./enums";
import { EncoreErrorCode } from "../types";

export const protectedRoutes = [
  "/home",
  "/dashboard",
  "/settings",
  "/statistics",
  "/logout",
  "/blog/post/draft",
  "/blog/post/published",
  "/blog/post/create",
  "/blog/post/preview",
  "/blog/post/edit",
  "/request-form",
  "/auth/verify-email"
];

export const authRoutes = ["/login", "/register"];

export const requestFormRoutes = [
  "/request-form/security/add-password",
  "/request-form/security/reset-password",
  "/request-form/security/update-username",
  "/request-form/security/update-email"
];

export const VALIDATION = {
  USERNAME_EMPTY: "Username cannot be empty!",
  USERNAME_MINIMUM: "Username must be at least 2 characters!",
  USERNAME_WHITESPACE: "Password cannot contain whitespace!",
  EMAIL_EMPTY: "Email cannot be empty!",
  EMAIL_MINIMUM: "Email must be at least 2 characters!",
  EMAIL_WHITESPACE: "Email cannot contain whitespace!",
  EMAIL_FORMAT: "Not a valid email!",
  PASSWORD_EMPTY: "Password cannot be empty!",
  PASSWORD_MINIMUM: "Password must be at least 8 characters!",
  PASSWORD_WHITESPACE: "Password cannot contain whitespace!",
  PASSWORD_UPPERCASE: "Password must contain at least one uppercase letter!",
  PASSWORD_LOWERCASE: "Password must contain at least one lowercase letter!",
  PASSWORD_NUMBER: "Password must contain at least one number!",
  PASSWORD_SPECIAL: "Password must contain at least one special character!",
  EMAIL_OR_USERNAME_EMPTY: "Email or username cannot be empty!",
  OTP_EMPTY: "Otp code cannot be empty!",
  OTP_MINIMUM: "Otp code must be 6 digits number!",
  DISPLAY_NAME_EMPTY: "Display name cannot be empty!",
};

export const LIST_TYPES: string[] = [
  WysiwygType.ListBullets,
  WysiwygType.ListNumbers
];

export const VOIDS: string[] = [
  WysiwygType.Code,
  WysiwygType.Image,
  WysiwygType.ImagePicker,
  WysiwygType.Divider
];

export const INITIAL_VALUE: CustomElement[] = [
  {
    type: WysiwygType.Heading,
    children: [{ text: "" }],
    align: WysiwygAlign.Left,
    headingSize: HeadingSize.H
  }
];

export const WITH_SEARCHBAR: string[] = ["/home", "/blog/explore"];

export const CATEGORIES: string[] = [ "Food", "Travel", "Programming", "Finance", "Sports", "Cooking", "Entertainment", "Gaming", "News", "Fitness & Health", "Parenting & Education", "Science & Environment", "DIY & Crafts", "Fashion & Beauty", "Relationships", "Software Development", "Interior Design", "Photography & Video", "Tech & Innovation", "Music & Audio", "Web Design", "Self-Improvement", "History & Culture", "Politics & Society", "Animals & Pets", "Web Development", "Home & Garden", "Business & Entrepreneurship", "Mobile Development", "Content Marketing & Social Media", "Productivity", "Minimalism", "Graphic Design", "Desktop Development", "Software Design", "Movies & TV", "Language Learning", "Motivation", "Climate Change", "Embedded Systems", "Blockchain & Cryptocurrency", "Databases", "Artificial Intelligence & Machine Learning", "Cybersecurity", "DevOps", "Python", "Java", "JavaScript", "C", "C++", "C#", "R", "PHP", "Swift", "Kotlin", "Go", "Assembly Language", "SQL", "Ruby", "Scala", "Lua", "Dart", "TypeScript", "Rust", "Elm", "Haskell", "Perl" ];

export const EncoreHttpStatusMap: Record<EncoreErrorCode, string> = {
  ok: "200 OK",
  unauthenticated: "401 Unauthorized",
  permission_denied: "403 Forbidden",
  not_found: "404 Not Found",
  already_exists: "409 Conflict",
  aborted: "409 Conflict",
  resource_exhausted: "429 Too Many Requests",
  cancelled: "499 Client Closed Request",
  invalid_argument: "400 Bad Request",
  failed_precondition: "400 Bad Request",
  out_of_range: "400 Bad Request",
  internal: "500 Internal Server Error",
  unknown: "500 Internal Server Error",
  data_loss: "500 Internal Server Error",
  unimplemented: "501 Not Implemented",
  unavailable: "503 Service Unavailable",
  deadline_exceeded: "504 Gateway Timeout"
};
