"use client";

import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { IArticle } from "@/types/user.types";
import { ColumnDef, flexRender, getCoreRowModel, getExpandedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import "./table.css";

export default function Table() {
  const { user, isLoading } = useAuth();
  const [articleData, setArticleData] = useState<IArticle | null>(null);
  const [data, setData] = useState<(IArticle | null)[]>([null]);
  const [hiddenRows, setHiddenRows] = useState<Set<string>>(new Set());
  const toggleRowVisibility = (rowId: string) => {
    setHiddenRows((prev) => {
      const updated = new Set(prev);
      if (updated.has(rowId)) {
        updated.delete(rowId);
      } else {
        updated.add(rowId);
      }
      return updated;
    });
  };

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
          const firstArticle = querySnapshot.docs[0].data() as IArticle;
          setArticleData(firstArticle);

          let d = [firstArticle, firstArticle, firstArticle, firstArticle, firstArticle];
          setData(d);
        }
      } catch (error) {
        console.error("Error checking or creating article:", error);
      }
    };

    checkAndCreateArticle();
  }, [user]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<IArticle | null>[]>(
    () => [
      {
        accessorKey: "content",
        header: "Content",
      },
      {
        accessorKey: "date",
        header: "Date",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        header: "Hide",
        cell: ({ row }) => (
          <div>
            <button
              className="text-red-500 underline"
              onClick={() => toggleRowVisibility(row.id)}>
              {hiddenRows.has(row.id) ? "Przywróć widoczność" : "Ukryj"}
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  if (!user || isLoading || !articleData || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center py-48 bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400">
      <div className="w-full max-w-4xl bg-stone-950 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-slate-200 mb-6">Table</h1>
        <div className="space-y-4">
          <table className="border-slate-200 border text-center w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div
                            className={header.column.getCanSort() ? "cursor-pointer select-none" : ""}
                            onClick={header.column.getToggleSortingHandler()}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: "▲",
                              desc: "▼",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) =>
                hiddenRows.has(row.id) ? (
                  <tr key={`hidden-${row.id}`}>
                    <td
                      colSpan={columns.length}
                      className="text-center">
                      <button
                        className="text-blue-500 underline"
                        onClick={() => toggleRowVisibility(row.id)}>
                        Przywróć widoczność
                      </button>
                    </td>
                  </tr>
                ) : (
                  <>
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  </>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
