'use client';

import { useParams } from 'next/navigation';
import { useGetPostQuery } from '../services/posts';
import { CircularProgress, Container, Typography } from '@mui/material';

export default function ClientPostDetail() {
  const { id } = useParams();
  const { data: post, isLoading, isError } = useGetPostQuery(Number(id));

  if (isLoading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError || !post) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <Typography color="error">Failed to load post.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{post.title}</Typography>
      <Typography variant="subtitle1" gutterBottom>by {post.author || 'Unknown'}</Typography>
      <Typography variant="body1">{post.body}</Typography>
    </Container>
  );
}
