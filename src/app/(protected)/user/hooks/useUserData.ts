import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { IUserData } from "@/types/user.types";

export const useUserData = (userUid: string | undefined) => {

    const fetchUserData = async (userUid: string ): Promise<IUserData> => {

        const userRef = doc(db, "users", userUid);

        try {
            const snapshot = await getDoc(userRef);

            if (snapshot.exists()) {
                const address = snapshot.data().address;
                return address
            }

            const defaultData: IUserData = {
                street: "",
                city: "",
                zipCode: "",
            }
            await setDoc(userRef, defaultData);
            return defaultData;
        } catch (error) {
            console.error("Error fetching or creating user data:", error);

            const defaultData: IUserData = {
                street: "",
                city: "",
                zipCode: "",
            }
            await setDoc(userRef, defaultData);
            return defaultData;
        }
    };

    const { data, isLoading, error } = useQuery<IUserData>({
        queryKey: ["userData", userUid],
        queryFn: () => fetchUserData(userUid!),
        enabled: !!userUid,
    });

    return {
        userData: data,
        isLoading,
        error,
    };
};
