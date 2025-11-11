import React from "react";
import { FieldError } from "react-hook-form";

export default function FormIndicator({
  fieldError,
  value,
  formType
}: {
  fieldError: FieldError | undefined;
  value: string;
  formType: string;
}) {
  if (fieldError?.message) {
    return (
      <p className="pe-1 text-sm font-black leading-none text-destructive-foreground">
        !
      </p>
    );
  } else if (!fieldError && value && formType === "register") {
    return <p className="text-sm text-green-500">✔</p>;
  }
}
