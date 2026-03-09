# tlp TikTok

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Splash screen with "tlp TikTok" branding shown on app open
- Vertical scrolling video feed (TikTok-style)
- Video playback with autoplay on scroll
- Like, comment, and share buttons on each video
- User registration and login (ID/account creation)
- User profiles with avatar, username, follower/following counts
- Video upload functionality for users
- Admin/management panel for content moderation (admin controls)
- Sample video content to populate feed
- Bottom navigation bar (Home, Discover, Upload, Notifications, Profile)

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend actor with:
   - User management: register, login, profile CRUD
   - Video management: upload metadata, list videos, get video by id
   - Like system: like/unlike video, get like count
   - Comment system: add comment, list comments per video
   - Follow system: follow/unfollow user
   - Admin functions: delete video, ban user
2. Frontend with:
   - Splash/intro screen with "tlp TikTok" logo animation
   - Vertical swipeable video feed (full-screen videos)
   - Video card with like, comment, share overlays
   - User auth screens (register/login)
   - Profile page
   - Upload page
   - Admin panel (for authenticated admin users)
   - Bottom navigation
