import { db } from "@/lib/firebase";
import { ITask } from "@/types/user.types";
import { getDocs, query, where, setDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";

class TaskService {
	async getTasks(userId: string) {
		try {
			const tasksColl = collection(db, "tasks");
			const userRef = doc(db, "users", userId);
			const q = query(tasksColl, where("user", "==", userRef));
			const querySnapshot = await getDocs(q);
			const tasks = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as ITask[];
			return tasks;
		} catch (error) {
			console.error("Error fetching tasks:", error);
			throw error;
		}
	}

	async createTask(userId: string, len: number) {
		const task: ITask = {
			name: `New Task ${len + 1}`,
			priority: "low",
			isCompleted: false,
			user: doc(db, "users", userId),
		};

		try {
			const tasksColl = collection(db, "tasks");
			const newTaskRef = doc(tasksColl);
			const newTask = { ...task, id: newTaskRef.id };
			await setDoc(newTaskRef, { ...task, user: doc(db, "users", userId) });
			return newTask;
		} catch (error) {
			console.error("Error creating task:", error);
			throw error;
		}
	}

	async updateTask(taskId: string, updatedFields: Partial<ITask>) {
		try {
			const taskRef = doc(db, "tasks", taskId);
			await updateDoc(taskRef, updatedFields);
			return { id: taskId, ...updatedFields };
		} catch (error) {
			console.error("Error updating task:", error);
			throw error;
		}
	}

	async deleteTask(taskId: string) {
		try {
			const taskRef = doc(db, "tasks", taskId);
			await deleteDoc(taskRef);
			return { success: true };
		} catch (error) {
			console.error("Error deleting task:", error);
			throw error;
		}
	}
}

export const taskService = new TaskService();

