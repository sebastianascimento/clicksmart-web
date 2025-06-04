'use client';

import { useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

interface ClientSearchParamsProps {
  children: (searchParams: URLSearchParams) => ReactNode;
}

export default function ClientSearchParams({ children }: ClientSearchParamsProps) {
  const searchParams = useSearchParams();
  return <>{children(searchParams)}</>;
}