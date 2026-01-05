import { Post, Story, User } from '../models';

export class DataService {
  private static instance: DataService;
  private posts: Post[];
  private currentUser: User;

  private constructor() {
    this.posts = this.initializePosts();
    this.currentUser = this.initializeCurrentUser();
  }

  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  private initializePosts(): Post[] {
    return [
      {
        id: '1',
        author: 'Sarah Chen',
        avatar: 'https://i.pravatar.cc/150?img=5',
        time: '2h ago',
        content: 'Just finished an amazing hike! The view from the top was absolutely breathtaking. 🏔️',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        likes: 234,
        comments: 45,
        shares: 12,
      },
      {
        id: '2',
        author: 'Mike Johnson',
        avatar: 'https://i.pravatar.cc/150?img=13',
        time: '5h ago',
        content: "Working on some exciting new AI features for our app. Can't wait to share them with you all! 🚀",
        likes: 189,
        comments: 23,
        shares: 8,
      },
      {
        id: '3',
        author: 'Emma Davis',
        avatar: 'https://i.pravatar.cc/150?img=9',
        time: '1d ago',
        content: 'Coffee and code - the perfect combination for a productive morning ☕️💻',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
        likes: 412,
        comments: 67,
        shares: 19,
      },
    ];
  }

  private initializeCurrentUser(): User {
    return {
      id: '1',
      name: 'Alex Morgan',
      avatar: 'https://i.pravatar.cc/150?img=1',
      bio: 'Digital creator | Tech enthusiast | Coffee lover',
      postsCount: 127,
      followersCount: 1234,
      followingCount: 567,
    };
  }

  getPosts(): Post[] {
    return [...this.posts];
  }

  addPost(post: Post): void {
    this.posts.unshift(post);
    this.currentUser.postsCount++;
  }

  getStories(): Story[] {
    return [
      {
        id: '1',
        name: 'Your Story',
        avatar: 'https://i.pravatar.cc/150?img=30',
        isYou: true,
      },
      {
        id: '2',
        name: 'Alex',
        avatar: 'https://i.pravatar.cc/150?img=15',
      },
      {
        id: '3',
        name: 'Jordan',
        avatar: 'https://i.pravatar.cc/150?img=20',
      },
      {
        id: '4',
        name: 'Taylor',
        avatar: 'https://i.pravatar.cc/150?img=25',
      },
      {
        id: '5',
        name: 'Morgan',
        avatar: 'https://i.pravatar.cc/150?img=33',
      },
    ];
  }

  getCurrentUser(): User {
    return { ...this.currentUser };
  }

  updateCurrentUser(user: User): void {
    this.currentUser = { ...user };
  }
}
