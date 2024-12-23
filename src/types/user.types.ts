import { DocumentReference, Timestamp } from "firebase/firestore"

export interface IUserData {
    city: string,
    street: string,
    zipCode: string
}

export interface IArticle {
    content: string,
    date: Date,
    title: string,
    user: DocumentReference
}

export interface IArticleData {
    content: string,
    date: Timestamp,
    title: string,
    user: DocumentReference
}

export interface IArticle {
    content: string,
    date: Date,
    title: string,
    user: DocumentReference
}

export type TaskPriority = "low" | "medium" | "high"

export interface ITask {
    id?: string;
    name: string;
    priority?: TaskPriority;
    isCompleted: boolean;
    user: DocumentReference;
}