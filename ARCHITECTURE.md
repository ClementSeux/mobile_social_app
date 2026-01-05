# MVVM Architecture Flow

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Views                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Screens (Container Components)                       │   │
│  │  - HomeScreen                                         │   │
│  │  - ProfileScreen                                      │   │
│  │  - SearchScreen, CreateScreen, NotificationsScreen    │   │
│  └─────────────────────┬────────────────────────────────┘   │
│                        │ uses                                │
│  ┌─────────────────────┴────────────────────────────────┐   │
│  │  Components (Presentational)                          │   │
│  │  - PostCard, StoryItem                                │   │
│  │  - Header, BottomNavigation                           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          │ binds to
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                     ViewModels                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React Hooks (Business Logic)                         │   │
│  │  - useHomeViewModel()                                 │   │
│  │    • posts, stories state                             │   │
│  │    • toggleLike(), isPostLiked()                      │   │
│  │  - useProfileViewModel()                              │   │
│  │    • user state                                       │   │
│  └─────────────────────┬────────────────────────────────┘   │
└─────────────────────────┼───────────────────────────────────┘
                          │
                          │ calls
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                      Services                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  DataService (Singleton)                              │   │
│  │  - getPosts()                                         │   │
│  │  - getStories()                                       │   │
│  │  - getCurrentUser()                                   │   │
│  └─────────────────────┬────────────────────────────────┘   │
└─────────────────────────┼───────────────────────────────────┘
                          │
                          │ returns
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                       Models                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Data Structures (TypeScript Interfaces)             │   │
│  │  - Post: {id, author, content, image, likes...}      │   │
│  │  - Story: {id, name, avatar, isYou}                  │   │
│  │  - User: {id, name, bio, stats...}                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Key Principles

### 1. Separation of Concerns
- **Models**: Pure data structures, no logic
- **Services**: Data access and API calls
- **ViewModels**: Business logic and state management
- **Views**: UI rendering and user input

### 2. Unidirectional Data Flow
```
User Action → View → ViewModel → Service → Model
                ↑                           │
                └───────────────────────────┘
                    (Data flows back)
```

### 3. Component Hierarchy
```
App.tsx (Root)
  ├── HomeScreen (Container)
  │   ├── useHomeViewModel() (Logic)
  │   ├── Header (Presentation)
  │   ├── StoryItem (Presentation) × N
  │   └── PostCard (Presentation) × N
  │
  ├── ProfileScreen (Container)
  │   ├── useProfileViewModel() (Logic)
  │   └── Profile UI (Presentation)
  │
  └── BottomNavigation (Navigation)
```

### 4. Responsibility Distribution

#### ViewModel Hook Pattern
```typescript
export const useHomeViewModel = () => {
  // State management
  const [posts, setPosts] = useState<Post[]>([]);
  
  // Data fetching (Service layer)
  useEffect(() => {
    const data = DataService.getInstance().getPosts();
    setPosts(data);
  }, []);
  
  // Business logic
  const toggleLike = useCallback((postId: string) => {
    // Like logic here
  }, []);
  
  // Expose interface to View
  return { posts, toggleLike, isPostLiked };
};
```

#### View Usage
```typescript
export const HomeScreen: React.FC = () => {
  // ViewModel provides all logic
  const { posts, toggleLike, isPostLiked } = useHomeViewModel();
  
  // View just renders
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <PostCard 
          post={item}
          isLiked={isPostLiked(item.id)}
          onLike={toggleLike}
        />
      )}
    />
  );
};
```

## Benefits of This Architecture

✅ **Testability**: ViewModels can be tested independently of UI
✅ **Reusability**: Components are pure and reusable
✅ **Maintainability**: Clear separation makes code easier to maintain
✅ **Scalability**: Easy to add new features without affecting existing code
✅ **Type Safety**: TypeScript interfaces ensure data consistency
✅ **State Management**: Centralized in ViewModels using React hooks
