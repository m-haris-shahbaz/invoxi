import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  console.log("hm");
  return await updateSession(request);
}

export const config = {
  matcher: ["/dashboard"], // Only protect the dashboard route
};
