import { useState } from "react";
import { User } from "../models";
import DataService from "../services/DataService";

export const useProfileViewModel = () => {
    const [user] = useState<User>(DataService.getCurrentUser());

    return {
        user,
    };
};
