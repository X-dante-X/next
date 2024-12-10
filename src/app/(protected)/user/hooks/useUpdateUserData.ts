import { useState } from "react";
import { db } from "@/lib/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useAuth } from "@/lib/AuthContext";
import { IUserData } from "@/types/user.types";

export const useUpdateUserData = (currentUserData: IUserData | undefined) => {
    const { user } = useAuth();
    const [isLoading, setIsUpdating] = useState(false);

    const updateUserData = async (data: IUserData) => {
        if (!user || isLoading) return;

        if (
            data.city !== currentUserData?.city ||
            data.street !== currentUserData?.street ||
            data.zipCode !== currentUserData?.zipCode
        ) {
            setIsUpdating(true);

            try {
                await setDoc(doc(db, "users", user.uid), {
                    address: {
                        city: data.city,
                        street: data.street,
                        zipCode: data.zipCode,
                    },
                });
            } catch (error) {
                console.error("Error updating user data:", error);
            } finally {
                setIsUpdating(false);
            }
        }
    };

    return { updateUserData, isUpdating: isLoading };
};
