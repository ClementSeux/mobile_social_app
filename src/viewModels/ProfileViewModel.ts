import { useState, useEffect, useCallback } from "react";
import { User } from "../models";
import { DataService } from "../services/DataService";

export const useProfileViewModel = () => {
    const [user, setUser] = useState<User>({
        id: "",
        name: "",
        avatar: "",
        bio: "",
        postsCount: 0,
        followersCount: 0,
        followingCount: 0,
    });
    const [media, setMedia] = useState<string[]>([]);

    const loadProfile = useCallback(() => {
        const dataService = DataService.getInstance();
        setUser(dataService.getCurrentUser());
        setMedia(dataService.getProfileMedia());
    }, []);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    const refreshUser = useCallback(() => {
        loadProfile();
    }, [loadProfile]);

    return { user, media, refreshUser };
};
