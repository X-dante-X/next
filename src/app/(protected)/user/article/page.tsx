'use client'

import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";

export default function Article() {

    useEffect(() => {
        const fetchArticles = async () => {
            try {

                const articlesColl = collection(db, "articles");
                const q = query(articlesColl, where("user", "==", "/users/ou8jNA6UvmOKZ3drKqeUreIC4H82"));
                const querySnapshot = await getDocs(q);

                const articlesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                console.log("articlesData")
                console.log(articlesData)
            } catch (error) {
                console.log(error)
            }
        };

        fetchArticles();
    }, []);

    return ( <div>
            Article
        </div> );
}
