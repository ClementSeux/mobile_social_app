import { useState, useCallback } from "react";
import { DataService } from "../services/DataService";
import { Post } from "../models";

export const useCreatePostViewModel = () => {
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const createPost = useCallback(async (): Promise<Post | null> => {
        if (!content.trim()) {
            return null;
        }

        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const currentUser = DataService.getInstance().getCurrentUser();

        const newPost: Post = {
            id: Date.now().toString(),
            author: currentUser.name,
            avatar: currentUser.avatar,
            time: "Just now",
            content: content.trim(),
            image: imageUrl.trim() || undefined,
            likes: 0,
            comments: 0,
            shares: 0,
        };

        DataService.getInstance().addPost(newPost);

        setIsLoading(false);
        clearForm();

        return newPost;
    }, [content, imageUrl]);

    const clearForm = useCallback(() => {
        setContent("");
        setImageUrl("");
    }, []);

    const isValid = content.trim().length > 0;

    return {
        content,
        setContent,
        imageUrl,
        setImageUrl,
        createPost,
        clearForm,
        isLoading,
        isValid,
    };
};
