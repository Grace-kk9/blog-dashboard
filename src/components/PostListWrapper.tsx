// src/components/PostListWrapper.tsx
'use client';

import dynamic from 'next/dynamic';
import { CircularProgress, Container } from '@mui/material';

const ClientPostList = dynamic(() => import('./ClientPostList'), {
  loading: () => (
    <Container sx={{ textAlign: 'center', mt: 5 }}>
      <CircularProgress />
    </Container>
  ),
  ssr: false,
});

export default function PostListWrapper() {
  return <ClientPostList />;
}
