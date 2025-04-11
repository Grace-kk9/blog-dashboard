'use client';

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Container,
  Stack,
} from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useGetPostsQuery, useDeletePostMutation } from '../services/posts';

interface Post {
  id: number;
  title: string;
  author?: string;
  body: string;
}

export default function ClientPostList() {
  const { data: posts, isLoading, isError } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();

  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);

  useEffect(() => {
    if (posts) {
      const stored = sessionStorage.getItem('newPosts');
      const newPosts = stored ? JSON.parse(stored) : [];
      setVisiblePosts([...newPosts, ...posts]);
    }
  }, [posts]);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      await deletePost(id).unwrap();
      setVisiblePosts((prev) => prev.filter((post) => post.id !== id));

      const stored = sessionStorage.getItem('newPosts');
      const newPosts = stored ? JSON.parse(stored) : [];
      const updated = newPosts.filter((p: Post) => p.id !== id);
      sessionStorage.setItem('newPosts', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to delete the post:', err);
    }
  };

  if (isLoading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <Typography color="error">Failed to load posts.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Blog Posts
      </Typography>

      <Link href="/create" passHref>
        <Button variant="contained" sx={{ mb: 3 }}>
          Create New Post
        </Button>
      </Link>

      <Grid container spacing={3}>
        {visiblePosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  by {post.author || 'Unknown'}
                </Typography>
                <Typography variant="body2" paragraph>
                  {post.body.slice(0, 100)}...
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Link href={`/posts/${post.id}`} passHref>
                    <Button variant="contained" size="small">
                      Read More
                    </Button>
                  </Link>
                  <Link href={`/edit/${post.id}`} passHref>
                    <Button variant="outlined" size="small">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="text"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
