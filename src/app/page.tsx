// src/app/posts/page.tsx
'use client';

import dynamic from 'next/dynamic';

const ClientPostList = dynamic(() => import('../components/ClientPostList'), {
  ssr: false,
});

export default function PostListPage() {
  return <ClientPostList />;
}
