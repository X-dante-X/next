import { DocumentReference } from "firebase/firestore"

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
