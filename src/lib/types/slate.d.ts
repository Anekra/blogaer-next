import { Descendant, BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

type CustomText = { text: string; [key?: string]: any };
interface CustomElement extends Descendant {
  type: string;
  children: CustomText[];
  align?: string;
  [key?: string]: any;
}

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
