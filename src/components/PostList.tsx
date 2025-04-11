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
import { useGetPostsQuery, useDeletePostMutation } from '../services/posts';

interface Post {
  id: number;
  title: string;
  author?: string;
  body: string;
}

export default function PostList() {
  const {
    data: posts,
    isLoading,
    isError,
    refetch,
  } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id).unwrap();
        refetch(); // ⬅️ refetch after delete to update list
      } catch (err) {
        console.error('Failed to delete the post:', err);
      }
    }
  };

  if (isLoading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError || !posts) {
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
      <Grid container spacing={3}>
        {posts.map((post: Post) => (
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
