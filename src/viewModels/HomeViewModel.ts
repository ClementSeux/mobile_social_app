import { useState, useCallback } from "react";
import { Post, Story } from "../models";
import DataService from "../services/DataService";

export const useHomeViewModel = () => {
    const [posts, setPosts] = useState<Post[]>(DataService.getPosts());
    const [stories] = useState<Story[]>(DataService.getStories());
    const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

    const toggleLike = useCallback(
        (postId: string) => {
            setLikedPosts((prev) => {
                const newSet = new Set(prev);
                if (newSet.has(postId)) {
                    newSet.delete(postId);
                } else {
                    newSet.add(postId);
                }
                return newSet;
            });

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId
                        ? {
                              ...post,
                              likes: likedPosts.has(postId)
                                  ? post.likes - 1
                                  : post.likes + 1,
                          }
                        : post
                )
            );
        },
        [likedPosts]
    );

    const isPostLiked = useCallback(
        (postId: string) => likedPosts.has(postId),
        [likedPosts]
    );

    return {
        posts,
        stories,
        toggleLike,
        isPostLiked,
    };
};
