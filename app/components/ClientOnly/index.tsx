"use client";
import { useEffect, useState } from "react";

export const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setIsClient(true); // component only renders after hydration to prevent mismatch
  }, []);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return isClient && hasMounted ? <>{children}</> : null;
};
