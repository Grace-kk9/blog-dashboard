'use client';

import { useParams } from 'next/navigation';
import { useGetPostQuery } from '@/services/posts';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

export default function PostDetailPage() {
  const params = useParams();
  const id = Number(params?.id); // `id` from URL

  const { data, isLoading, error } = useGetPostQuery(id);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography>Error loading post.</Typography>;
  }

  if (!data) {
    return <Typography>No post found.</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{data.title}</Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Author: {data.author || 'Unknown'}
      </Typography>
      <Typography variant="body1" paragraph>{data.body}</Typography>
    </Container>
  );
}
