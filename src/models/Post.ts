export interface Post {
    id: string;
    author: string;
    avatar: string;
    time: string;
    content: string;
    image?: string;
    likes: number;
    comments: number;
    shares: number;
}
