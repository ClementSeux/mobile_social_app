import { useState, useCallback } from 'react';
import { DataService } from '../services/DataService';
import { User } from '../models';

export const useEditProfileViewModel = () => {
  const currentUser = DataService.getInstance().getCurrentUser();
  
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [isLoading, setIsLoading] = useState(false);

  const updateProfile = useCallback(async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser: User = {
      ...currentUser,
      name,
      bio,
    };
    
    DataService.getInstance().updateCurrentUser(updatedUser);
    setIsLoading(false);
    
    return updatedUser;
  }, [name, bio, currentUser]);

  const resetForm = useCallback(() => {
    setName(currentUser.name);
    setBio(currentUser.bio);
  }, [currentUser]);

  return {
    name,
    setName,
    bio,
    setBio,
    updateProfile,
    resetForm,
    isLoading,
  };
};
