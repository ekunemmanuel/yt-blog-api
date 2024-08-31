export interface Login {
  email: string;
  password: string;
}

export interface Register extends Login {
  firstName: string;
  lastName: string;
}

export interface Post {
  id?: string;
  userId: string;
  title: string;
  description: string;
  comments?: Comment[];
  commentIds?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id?: string;
  description: string;
  createdAt: string;
}

export interface User {
  id: string;
  displayName: string;
  email: string;
  postIds?: string[];
}
