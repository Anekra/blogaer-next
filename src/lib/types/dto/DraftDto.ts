export type DraftDto = {
  id: string;
  username: string;
  userImg?: string;
  title: string;
  text: string;
  content: any[];
  createdAt: string;
  updatedAt: string;
};
export type DraftWithNoUserDto = {
  id: string;
  title: string;
  text: string;
  content: any[];
  createdAt: string;
  updatedAt: string;
};