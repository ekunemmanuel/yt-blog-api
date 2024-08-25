├── /api
│ ├── /v1
│ │ ├── /posts
│ │ │ ├── index.get.ts # Get all posts
│ │ │ ├── index.post.ts # Create a new post
│ │ │ ├── /[id]
│ │ │ │ ├── index.get.ts # Get a specific post by ID
│ │ │ │ ├── index.put.ts # Update a post by ID
│ │ │ │ ├── index.delete.ts # Delete a post by ID
│ │ │ │ ├── /comments
│ │ │ │ │ ├── index.get.ts # Get all comments for a post
│ │ │ │ │ ├── index.post.ts # Add a comment to a post
│ ├── /auth
│ │ ├── register.post.ts # Register a new user
│ │ ├── login.post.ts # Login a user
│ │ ├── profile.get.ts # Get user profile (authenticated route)
├── /middlewares
│ ├── authenticate.ts # Firebase authentication middleware
├── /plugins
│ ├── firebase.ts # Initialize Firebase on the server
├── /utils
│ ├── /firebase
│ │ ├── firestore.ts # Firestore utility functions
│ │ ├── authentication.ts # Firebase Auth utility functions
│ │ ├── index.ts # General Firebase utility functions
│ ├── index.ts # General utility functions
├── /types
│ ├── index.ts # Type definitions
├── nitro.config.ts # Nitro configuration
└── tsconfig.json # TypeScript configuration
