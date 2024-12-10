import { useAuth } from "@/lib/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "firebase/auth";
import { redirect } from "next/navigation";

export const useDeleteUser = () => {
    const { user } = useAuth();

    const mutation = useMutation({
        mutationFn: async () => {
            if (!user) throw new Error("No user to delete");
            await deleteUser(user);
        },
        onSuccess: () => {
            redirect("/user/signin");
        },
        onError: (error: Error) => {
            console.error("Error deleting user:", error.message);
        },
    });

    const handleDeleteUser = () => {
        if (
            confirm("Are you sure you want to delete your account? This action cannot be undone.")
        ) {
            mutation.mutate();
        }
    };

    return handleDeleteUser;
};
