import { NextResponse } from "next/server";

export const middleware = (request) => {
  return NextResponse.next();
};

/* IT is used to help us define which request we should runt he middlewear for 

https://nextjs.org/docs/pages/building-your-application/routing/middleware
*/
export const config = {
  matcher: "/news",
};
