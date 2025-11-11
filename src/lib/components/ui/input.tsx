import { cn } from "@/lib/utils";
import type * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"flex h-10 w-full rounded-md border border-border px-3 py-2 text-sm ring-offset-neutral file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground enabled:focus-visible:border-none enabled:focus-visible:outline-none enabled:focus-visible:ring-2 enabled:focus-visible:ring-ring enabled:focus-visible:ring-offset-2 enabled:hover:ring-2 enabled:hover:ring-base-foreground disabled:opacity-50 dark:bg-neutral-900 dark:ring-offset-black",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
