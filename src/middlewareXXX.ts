import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  console.log("request.url on middle 1234: ", request.url);
  // console.log("middle rin!!!!!!!!!! 5678");
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
