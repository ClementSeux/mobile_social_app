# AtomicAI Social Media App

A modern social media mobile application built with React Native and Expo, following the MVVM (Model-View-ViewModel) architectural pattern.

## 🏗️ Architecture: MVVM

This project follows the **MVVM (Model-View-ViewModel)** pattern for clean separation of concerns:

### 📁 Project Structure

```
src/
├── models/              # Data models and interfaces
│   ├── Post.ts          # Post data structure
│   ├── Story.ts         # Story data structure
│   ├── User.ts          # User data structure
│   └── index.ts         # Barrel exports
│
├── services/            # Data access layer
│   └── DataService.ts   # Singleton service with mock data
│
├── viewModels/          # Business logic layer
│   ├── HomeViewModel.ts      # Home screen logic (hooks)
│   └── ProfileViewModel.ts   # Profile screen logic (hooks)
│
└── views/               # UI layer
    ├── components/      # Reusable UI components
    │   ├── BottomNavigation.tsx
    │   ├── Header.tsx
    │   ├── PostCard.tsx
    │   ├── StoryItem.tsx
    │   └── index.ts
    │
    └── screens/         # Screen containers
        ├── HomeScreen.tsx
        ├── SearchScreen.tsx
        ├── CreateScreen.tsx
        ├── NotificationsScreen.tsx
        ├── ProfileScreen.tsx
        └── index.ts
```

### 🔄 Layer Responsibilities

#### **Models** (`src/models/`)

-   Define the data structures and interfaces
-   Pure TypeScript interfaces with no business logic
-   Examples: `Post`, `Story`, `User`

#### **Services** (`src/services/`)

-   Handle data fetching and manipulation
-   Abstract data sources (API, database, local storage)
-   Singleton pattern for centralized data access
-   Currently provides mock data

#### **ViewModels** (`src/viewModels/`)

-   Contain business logic and state management
-   Implemented as React custom hooks
-   Connect services to views
-   Handle user interactions and data transformations
-   Examples: `useHomeViewModel()`, `useProfileViewModel()`

#### **Views** (`src/views/`)

-   **Components**: Reusable, presentational UI components
-   **Screens**: Container components that compose smaller components
-   Focus on rendering and user input
-   No business logic - delegate to ViewModels

## 🚀 Features

-   **Feed**: Browse posts from friends with like, comment, and share actions
-   **Stories**: View and create Instagram-style stories
- **Create Post**: Write and publish new posts with optional images
- **Profile**: User profile with stats and edit functionality
- **Edit Profile**: Update your name and bio with a beautiful modal interface
- **Navigation**: Bottom tab navigation with 5 tabs
- **Responsive Design**: Optimized for mobile devices
- **Real-time Updates**: Posts and profile update immediately after changes

## 📱 Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn
-   Expo CLI (installed via npx)

### Installation

```bash
# Install dependencies
npm install

# Start Expo development server
npm start
```

### Running the App

-   **iOS**: Press `i` in the terminal or scan QR code with Camera app
-   **Android**: Press `a` in the terminal or scan QR code with Expo Go app
-   **Web**: Press `w` in the terminal

## 🛠️ Development Guide

### Adding a New Feature

1. **Define Model** (if needed)

    ```typescript
    // src/models/Comment.ts
    export interface Comment {
        id: string;
        postId: string;
        author: string;
        content: string;
        createdAt: string;
    }
    ```

2. **Update Service**

    ```typescript
    // src/services/DataService.ts
    getComments(postId: string): Comment[] {
      // Return comments for post
    }
    ```

3. **Create or Update ViewModel**

    ```typescript
    // src/viewModels/CommentsViewModel.ts
    export const useCommentsViewModel = (postId: string) => {
        const [comments, setComments] = useState<Comment[]>([]);

        useEffect(() => {
            const data = DataService.getInstance().getComments(postId);
            setComments(data);
        }, [postId]);

        return { comments };
    };
    ```

4. **Create Component**
    ```typescript
    // src/views/components/CommentList.tsx
    export const CommentList: React.FC<{ postId: string }> = ({ postId }) => {
        const { comments } = useCommentsViewModel(postId);

        return (
            <FlatList
                data={comments}
                renderItem={({ item }) => <CommentItem comment={item} />}
            />
        );
    };
    ```

## 📋 Scripts

-   `npm start` - Start Expo development server
-   `npm run android` - Run on Android device/emulator
-   `npm run ios` - Run on iOS simulator
-   `npm run web` - Run in web browser

## 🎨 Design Inspiration

Based on the [AtomicAI Social Media Mobile App](https://dribbble.com/shots/26441028-AtomicAI-Social-Media-Mobile-App) design.

## 📦 Dependencies

-   **React Native**: 0.76.9
-   **Expo**: ~52.0.0
-   **React**: 18.3.1
-   **TypeScript**: ^5.3.3

## 📄 License

MIT License
