import React from "react";
import { RenderElementProps } from "slate-react";

import LikeIt from "@/lib/components/icons/thoughts/LikeIt";
import LoveIt from "@/lib/components/icons/thoughts/LoveIt";

export default function PostTittle({
  props,
  text,
  tags,
  viewOnly
}: {
  props: RenderElementProps;
  text: string;
  tags?: string[];
  viewOnly?: boolean;
}) {
  const { children, element, attributes } = props;
  return (
    <React.Fragment>
      <h1
        {...attributes}
        className={`${
          !text && !viewOnly ? "ph relative" : "static"
        } ${tags ? "mb-4" : "mb-0"} ${element.headingSize} ${element.align} text-5xl font-bold`}
      >
        {children}
      </h1>
      {viewOnly && (
        <div data-slate-void className="mb-6 flex flex-col gap-2">
          <div className="flex h-8 justify-end gap-2">
            {tags?.map((tag, i) => (
              <span key={i} className="tags">
                <p>{tag}</p>
              </span>
            ))}
          </div>
          <div className="*:tooltip flex items-center gap-4 *:flex *:items-center *:gap-1">
            <div data-tooltip-text="Comments">
              <LikeIt />
              <p>0</p>
            </div>
            <div data-tooltip-text="Reads">
              <LoveIt />
              <p>0</p>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
