"use client";

import { SkeletonText } from "@/components/Skeleton";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { IArticle, IArticleData } from "@/types/user.types";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Article() {
  const { user, isLoading } = useAuth();
  const [articleData, setArticleData] = useState<IArticle | null>(null);

  useEffect(() => {
    const checkAndCreateArticle = async () => {
      if (!user || !user.uid) {
        console.warn("User is not authenticated or UID is missing.");
        return;
      }

      try {
        const articlesColl = collection(db, "articles");
        const q = query(articlesColl, where("user", "==", doc(db, "users", user.uid)));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("No articles found. Creating a new article...");

          const newArticle = {
            content: "Default content",
            date: new Date(),
            title: "Default Title",
            user: doc(db, "users", user.uid),
          };

          const newArticleDoc = doc(collection(db, "articles"));
          await setDoc(newArticleDoc, {
            ...newArticle,
            date: newArticle.date,
          });

          setArticleData({ ...newArticle });
          console.log("Article created successfully:", newArticleDoc.id);
        } else {
          console.log("Articles already exist.");
          const firstArticle = querySnapshot.docs[0].data() as IArticleData;

          setArticleData({
            content: firstArticle.content,
            title: firstArticle.title,
            date: firstArticle.date.toDate(),
            user: firstArticle.user,
          });
        }
      } catch (error) {
        console.error("Error checking or creating article:", error);
      }
    };

    checkAndCreateArticle();
  }, [user]);

  return (
    <div className="flex items-center justify-center py-52 bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400">
      <div className="w-full max-w-md bg-stone-950 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-slate-200 mb-6">Article</h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">Name:</span>
            {!user || isLoading ? <SkeletonText /> : <span className="text-gray-400">{user.displayName || "No name provided"}</span>}
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">Content:</span>
            {!user || isLoading || !articleData ? <SkeletonText /> : <span className="text-gray-400">{articleData.content}</span>}
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">Title:</span>
            {!user || isLoading || !articleData ? <SkeletonText /> : <span className="text-gray-400">{articleData.content}</span>}
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">Date:</span>
            {!user || isLoading || !articleData ? <SkeletonText /> : <span className="text-gray-400">{articleData.date.toLocaleDateString()}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
