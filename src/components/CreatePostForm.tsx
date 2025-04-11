'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useAddPostMutation } from '@/services/posts';

export default function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [addPost] = useAddPostMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      id: Math.floor(Math.random() * 1000) + 101, // Simulated unique ID
      title,
      body,
      userId: 1,
    };

    await addPost(newPost);

    // Store new post in sessionStorage so homepage shows it
    const stored = sessionStorage.getItem('newPosts');
    const existingPosts = stored ? JSON.parse(stored) : [];
    sessionStorage.setItem('newPosts', JSON.stringify([newPost, ...existingPosts]));

    router.push('/posts');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        multiline
        rows={6}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}
