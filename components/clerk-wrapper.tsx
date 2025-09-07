'use client';

import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

export function ClerkWrapper({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <ClerkProvider>{children}</ClerkProvider>;
}
