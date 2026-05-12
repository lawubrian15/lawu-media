"use client";

import { CustomCursor } from "./custom-cursor";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      {children}
    </>
  );
}
