import { Post, Story, User } from "../models";

class DataService {
    private static instance: DataService;

    private constructor() {}

    static getInstance(): DataService {
        if (!DataService.instance) {
            DataService.instance = new DataService();
        }
        return DataService.instance;
    }

    getPosts(): Post[] {
        return [
            {
                id: "1",
                author: "Sarah Chen",
                avatar: "https://i.pravatar.cc/150?img=1",
                time: "2h ago",
                content: "Just launched our new AI feature! Check it out 🚀",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
                likes: 234,
                comments: 45,
                shares: 12,
            },
            {
                id: "2",
                author: "Mike Johnson",
                avatar: "https://i.pravatar.cc/150?img=12",
                time: "5h ago",
                content: "Beautiful sunset at the beach today 🌅",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
                likes: 567,
                comments: 89,
                shares: 23,
            },
            {
                id: "3",
                author: "Emma Davis",
                avatar: "https://i.pravatar.cc/150?img=5",
                time: "1d ago",
                content: "Working on something exciting! Stay tuned ✨",
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
                likes: 892,
                comments: 134,
                shares: 45,
            },
        ];
    }

    getStories(): Story[] {
        return [
            {
                id: "1",
                name: "Your Story",
                avatar: "https://i.pravatar.cc/150?img=30",
                isYou: true,
            },
            {
                id: "2",
                name: "Alex",
                avatar: "https://i.pravatar.cc/150?img=15",
            },
            {
                id: "3",
                name: "Jordan",
                avatar: "https://i.pravatar.cc/150?img=20",
            },
            {
                id: "4",
                name: "Taylor",
                avatar: "https://i.pravatar.cc/150?img=25",
            },
            {
                id: "5",
                name: "Morgan",
                avatar: "https://i.pravatar.cc/150?img=33",
            },
        ];
    }

    getCurrentUser(): User {
        return {
            id: "1",
            name: "Your Name",
            avatar: "https://i.pravatar.cc/150?img=30",
            bio: "AI Enthusiast | Tech Lover | Creator",
            postsCount: 142,
            followersCount: 2500,
            followingCount: 342,
        };
    }
}

export default DataService.getInstance();
