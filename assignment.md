# Capstone Project: Develop a YouTube Clone Using the MERN Stack

## Objective
Create a full-stack YouTube clone where users can view and interact with videos. This project will help you understand how to build a real-world application using MongoDB, Express, React, and Node.js (MERN stack).

---

## Requirements

### Front-End (React)
1. **Home Page**:
   - Display a YouTube Header.
   - Display a static sidebar toggleable from the top hamburger menu.
   - Display filter buttons at the top.
   - Display a grid of video thumbnails.
   - Each video card should include:
     - Title
     - Thumbnail
     - Channel Name
     - Views

   **Sample Video Data**:
   ```json
   [
     {
       "videoId": "video01",
       "title": "Learn React in 30 Minutes",
       "thumbnailUrl": "https://example.com/thumbnails/react30min.png",
       "description": "A quick tutorial to get started with React.",
       "channelId": "channel01",
       "uploader": "user01",
       "views": 15200,
       "likes": 1023,
       "dislikes": 45,
       "uploadDate": "2024-09-20",
       "comments": [
         {
           "commentId": "comment01",
           "userId": "user02",
           "text": "Great video! Very helpful.",
           "timestamp": "2024-09-21T08:30:00Z"
         }
       ]
     }
   ]

2. **User Authentication**:
- Registration and Login:
  - Users can register and log in with:
    - Username
    - Email
    - Password
  - Use **JWT** for authentication.
- **Sign-In Flow**:
  - Before signing in, the header displays a **Sign In** button.
  - Clicking the **Sign In** button redirects the user to a new URL with a Google-style form for login and registration.
  - After signing in:
    - The user's name is displayed at the top.
    - The homepage is displayed.

**Sample User Data**:
    ```json
        {
        "userId": "user01",
        "username": "JohnDoe",
        "email": "john@example.com",
        "password": "hashedPassword123",
        "avatar": "https://example.com/avatar/johndoe.png",
        "channels": ["channel01"]
        }


### 3. Search and Filter Functionality
- **Search Bar**: 
  - Implement a search bar on the homepage, located in the header.
  - The search bar will allow users to search for videos based on their **title**.
- **Filter Buttons**: 
  - Add filter buttons for category-based filtering.
  - Clicking a filter button will display videos belonging to the selected category.

### 4. Video Player Page
- Display the selected video with the following features:
  - **Video Player**: Allow users to watch the video.
  - **Title and Description**: Show the title and description of the video.
  - **Channel Name**: Display the channel name associated with the video.
  - **Like and Dislike Buttons**: Interactive buttons for liking and disliking the video.
  - **Comment Section**:
    - Allow users to add, edit, and delete comments.
    - Save new comments in the database, linked to the video.
    - (Nested comments can be ignored for now.)

### 5. Channel Page
- **Channel Creation**:
  - Users can create a channel only after signing in.
- **Channel Videos**:
  - Display a list of videos belonging to the channel.
- **Edit/Delete Videos**:
  - Provide functionality for the channel owner to edit or delete their videos.

### 6. Responsive Design
- Ensure the application is fully responsive and works seamlessly across:
  - Mobile devices
  - Tablets
  - Desktop computers


---

# Back-End (Node.js, Express)

## 1. API Endpoints
- **User Authentication**:
  - Sign up, login, and token-based authentication using JWT.
- **Channel Management**:
  - API to create a new channel and fetch any information from that channel.
- **Video Management**:
  - API to fetch, update, and delete videos.
- **Comments**:
  - API to add and fetch comments.

---

## 2. Database (MongoDB)
- Store users, videos, channels, and comments in MongoDB collections.
- Store file metadata (e.g., video URL, thumbnail URL) in the database.

---

## Technologies to Use
- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB (MongoDB Atlas or local instance)
- **Version Control**: Git

---

## Submission Requirements
- **Source Code**: Upload the project to a GitHub repository.
- **README File**: Include a detailed README explaining the project setup, features, and usage.
- **Video Demo**: Provide a short video showcasing the application's features.

---

## Rubrics for the YouTube Clone Assignment (Out of 400 Marks)

### 1. Front-End (React) – 170 Marks
- **Home Page UI/UX (40 Marks)**:
  - Evaluate the completeness of the header, sidebar, video grid, filter buttons, and responsiveness on various devices.
- **User Authentication (40 Marks)**:
  - Ensure proper implementation of user registration, JWT-based login, and sign-in functionality.
- **Video Player Page (50 Marks)**:
  - Check for the functioning video player, comment management, and interactive buttons (like/dislike).
- **Channel Page (40 Marks)**:
  - Evaluate the user's ability to create, edit, and delete their videos and the proper channel page layout.

### 2. Back-End (Node.js & Express) – 150 Marks
- **API Design (40 Marks)**:
  - Assess the routing and functionality for users, videos, and comments, ensuring best practices are followed.
- **Data Handling (MongoDB) (40 Marks)**:
  - Check how well the data is stored and retrieved, including video metadata, user info, comments, and channel details.
- **JWT Integration (40 Marks)**:
  - Ensure that JWT-based authentication is secure and all protected routes work correctly.

### 3. Search & Filter Functionality – 40 Marks
- **Search by Title (20 Marks)**:
  - Verify the search bar functionality works correctly for searching videos by title.
- **Filter by Category (20 Marks)**:
  - Ensure category-based filters are functional and correctly implemented.

### 4. Responsiveness – 30 Marks
- **Mobile/Tablet/Desktop Layout (30 Marks)**:
  - Test how well the app adapts across different screen sizes, ensuring all features are usable and the layout remains consistent.

### 5. Code Quality & Documentation – 40 Marks
- **Code Structure (20 Marks)**:
  - Check for clean, well-organized code with proper folder structure, adhering to best practices.
- **Documentation (20 Marks)**:
  - Ensure the project is well-documented with clear comments and a README explaining the setup, usage, and purpose of the project.
