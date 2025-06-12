import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '../config';

interface User {
  _id: string;
  name: string;
  profilePicture: string;
}

interface Comment {
  _id: string;
  text: string;
  user: User;
  createdAt: string;
}

export interface Post {
  _id: string;
  text: string;
  image?: string;
  user: User;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

interface PostState {
  posts: Post[];
  userPosts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchPosts: () => Promise<void>;
  fetchUserPosts: (userId: string) => Promise<void>;
  createPost: (text: string, image?: File) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  unlikePost: (postId: string) => Promise<void>;
  addComment: (postId: string, text: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  userPosts: [],
  currentPost: null,
  loading: false,
  error: null,

  fetchPosts: async () => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      
      const response = await axios.get(`${API_URL}/api/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      set({
        posts: response.data,
        loading: false,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        set({ error: error.response.data.message, loading: false });
      } else {
        set({ error: 'Failed to fetch posts', loading: false });
      }
    }
  },

  fetchUserPosts: async (userId) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      
      const response = await axios.get(`${API_URL}/api/posts/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      set({
        userPosts: response.data,
        loading: false,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        set({ error: error.response.data.message, loading: false });
      } else {
        set({ error: 'Failed to fetch user posts', loading: false });
      }
    }
  },

  createPost: async (text, image) => {
  try {
    set({ loading: true, error: null });
    const token = localStorage.getItem('token');

    const payload = {
      text,
      image: "", // You can later replace with URL if uploading
    };

    const response = await axios.post(
      `${API_URL}/api/posts`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const { posts } = get();
    set({
      posts: [response.data, ...posts],
      loading: false,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      set({ error: error.response.data.message, loading: false });
    } else {
      set({ error: 'Failed to create post', loading: false });
    }
  }
},


  likePost: async (postId) => {
    try {
      const token = localStorage.getItem('token');
      
      await axios.put(
        `${API_URL}/api/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const { posts, userPosts } = get();
      
      // Update posts array
      const updatedPosts = posts.map(post => 
        post._id === postId 
          ? { 
              ...post, 
              likes: [...post.likes, 'temp-like-id'] // We'll get the actual ID on next fetch
            } 
          : post
      );
      
      // Update userPosts array if it contains the liked post
      const updatedUserPosts = userPosts.map(post => 
        post._id === postId 
          ? { 
              ...post, 
              likes: [...post.likes, 'temp-like-id'] // We'll get the actual ID on next fetch
            } 
          : post
      );
      
      set({
        posts: updatedPosts,
        userPosts: updatedUserPosts,
      });
    } catch (error) {
      console.error('Failed to like post', error);
    }
  },

  unlikePost: async (postId) => {
    try {
      const token = localStorage.getItem('token');
      
      await axios.put(
        `${API_URL}/api/posts/${postId}/unlike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const { posts, userPosts } = get();
      
      // Update posts array
      const updatedPosts = posts.map(post => {
        if (post._id === postId) {
          const userId = JSON.parse(atob(localStorage.getItem('token')!.split('.')[1])).id;
          return { 
            ...post, 
            likes: post.likes.filter(id => id !== userId)
          };
        }
        return post;
      });
      
      // Update userPosts array if it contains the unliked post
      const updatedUserPosts = userPosts.map(post => {
        if (post._id === postId) {
          const userId = JSON.parse(atob(localStorage.getItem('token')!.split('.')[1])).id;
          return { 
            ...post, 
            likes: post.likes.filter(id => id !== userId)
          };
        }
        return post;
      });
      
      set({
        posts: updatedPosts,
        userPosts: updatedUserPosts,
      });
    } catch (error) {
      console.error('Failed to unlike post', error);
    }
  },

  addComment: async (postId, text) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        `${API_URL}/api/posts/${postId}/comment`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const { posts, userPosts } = get();
      
      // Update posts array
      const updatedPosts = posts.map(post => 
        post._id === postId 
          ? { 
              ...post, 
              comments: [...post.comments, response.data]
            } 
          : post
      );
      
      // Update userPosts array if it contains the commented post
      const updatedUserPosts = userPosts.map(post => 
        post._id === postId 
          ? { 
              ...post, 
              comments: [...post.comments, response.data]
            } 
          : post
      );
      
      set({
        posts: updatedPosts,
        userPosts: updatedUserPosts,
      });
    } catch (error) {
      console.error('Failed to add comment', error);
    }
  },

  deletePost: async (postId) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      
      await axios.delete(`${API_URL}/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const { posts, userPosts } = get();
      
      set({
        posts: posts.filter(post => post._id !== postId),
        userPosts: userPosts.filter(post => post._id !== postId),
        loading: false,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        set({ error: error.response.data.message, loading: false });
      } else {
        set({ error: 'Failed to delete post', loading: false });
      }
    }
  },
}));