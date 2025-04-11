'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetPostQuery, useUpdatePostMutation } from '@/services/posts';
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Stack,
} from '@mui/material';

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams();
  const postId = Number(id);

  const { data: post, isLoading, isError } = useGetPostQuery(postId);
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePost({ id: postId, title, body }).unwrap();
      router.push('/');
    } catch (err) {
      console.error('Failed to update post:', err);
    }
  };

  if (isLoading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError || !post) {
    return (
      <Container sx={{ mt: 5, textAlign: 'center' }}>
        <Typography color="error">Failed to load the post.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Edit Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            multiline
            rows={6}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Update'}
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
