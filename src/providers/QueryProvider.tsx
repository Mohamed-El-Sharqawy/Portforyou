"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props {
  children: ReactNode;
}

export default function QueryProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {children}
    </QueryClientProvider>
  );
}
