import { useState, useEffect, useCallback } from "react";
import { User } from "../models";
import { DataService } from "../services/DataService";

export const useProfileViewModel = () => {
    const [user, setUser] = useState<User>({} as User);

    const loadUser = useCallback(() => {
        const currentUser = DataService.getInstance().getCurrentUser();
        setUser(currentUser);
    }, []);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const refreshUser = useCallback(() => {
        loadUser();
    }, [loadUser]);

    return { user, refreshUser };
};
