import { authorization } from "@/lib/middlewares/authorization";
import { requestForm } from "@/lib/middlewares/requestForm";
import { requestFormRoutes } from "@/lib/utils/constants";
import { isArrayOfStrings } from "@/lib/utils/helper";
import { NextResponse, type NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const authorizedRes = await authorization(request, path);
	const isAuthenticated = isArrayOfStrings(authorizedRes);

	const isRequestRoute = requestFormRoutes.some((route) =>
		path.startsWith(route)
	);
	if (isRequestRoute && isAuthenticated) {
		const formRes = await requestForm(request, authorizedRes);
		if (formRes) return formRes;
	}

	return isAuthenticated ? NextResponse.next() : authorizedRes;
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|robots.txt|.well-known).*)"
	]
};
