import { IncomingHttpHeaders } from "http";

declare module "@clerk/nextjs/server" {
  interface ClerkRequest extends Request {
    headers: IncomingHttpHeaders;
  }

  interface SessionClaims {
    metadata?: {
      role?: "admin" | "member";
    };
  }
}
