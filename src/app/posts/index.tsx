'use client';

import { useGetPostsQuery } from '@/services/posts';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import Link from 'next/link';

export default function PostList() {
  const { data, error, isLoading } = useGetPostsQuery();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading posts.</Typography>;

  return (
    <Grid container spacing={3} padding={3}>
      {data?.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Author: {post.author || 'Unknown'}
              </Typography>
              <Typography variant="body2" paragraph>
                {post.body.slice(0, 100)}...
              </Typography>
              <Link href={`/posts/${post.id}`}>
                <Button variant="outlined" size="small">Read More</Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
