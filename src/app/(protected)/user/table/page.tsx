"use client";

import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { ITask } from "@/types/user.types";
import { ColumnDef, flexRender, getCoreRowModel, getExpandedRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { doc, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";
import prioritySort from "./prioritySort";
import { taskService } from "./task.service";
import debounce from "lodash.debounce";
import { Checkbox, InputField } from "@/components/InputField";
import { PrioritySelect } from "@/components/PrioritySelect";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { SkeletonTable } from "@/components/Skeleton";

export default function Table() {
  const { user, isLoading } = useAuth();
  const [data, setData] = useState<ITask[]>([]);
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
    const fetchTasks = async () => {
      if (!user || !user.uid) {
        console.warn("User is not authenticated or UID is missing.");
        return;
      }
      try {
        const tasks = await taskService.getTasks(user.uid);
        setData(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [user]);

  const addTask = async () => {
    if (!user || !user.uid) {
      console.warn("User is not authenticated or UID is missing.");
      return;
    }
    try {
      const createdTask = await taskService.createTask(user.uid, data.length);
      setData((prev) => [...prev, createdTask]);
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      console.log(taskId);
      await taskService.deleteTask(taskId);
      setData((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const debouncedUpdateTask = useCallback(
    debounce(async (taskId: string, updatedFields: Partial<ITask>) => {
      try {
        const taskDoc = doc(db, "tasks", taskId);
        await setDoc(taskDoc, updatedFields, { merge: true });
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }, 444),
    [taskService, setDoc]
  );

  const handleFieldUpdate = (taskId: string, field: keyof ITask, value: string | boolean) => {
    setData((prev) => prev.map((task) => (task.id === taskId ? { ...task, [field]: value } : task)));
    debouncedUpdateTask(taskId, { [field]: value });
  };

  const NameCell = ({ row }: { row: { original: ITask; id: string } }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(row.original.name);

    const handleSave = () => {
      if (name !== row.original.name) {
        handleFieldUpdate(row.id, "name", name);
      }
      setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSave();
      } else if (e.key === "Escape") {
        setName(row.original.name);
        setIsEditing(false);
      }
    };

    const handleBlur = () => {
      if (isEditing) {
        handleSave();
      }
    };

    return isEditing ? (
      <InputField
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        autoFocus
        className="rounded-none px-0"
      />
    ) : (
      <span onDoubleClick={() => setIsEditing(true)}>{name}</span>
    );
  };

  const columns = useMemo<ColumnDef<ITask>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <NameCell row={row} />,
      },
      {
        accessorKey: "priority",
        header: "Priority",
        sortingFn: prioritySort,
        cell: ({ row }) => (
          <PrioritySelect
            value={row.original.priority || "low"}
            onChange={(value) => handleFieldUpdate(row.id, "priority", value)}
            options={["low", "medium", "high"]}
          />
        ),
      },
      {
        accessorKey: "isCompleted",
        header: "Completed",
        cell: ({ row }) => (
          <Checkbox
            label={row.original.isCompleted ? "Yes" : "No"}
            type="checkbox"
            checked={row.original.isCompleted}
            onChange={(e) => handleFieldUpdate(row.id, "isCompleted", e.target.checked)}
          />
        ),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex justify-evenly">
            <button
              className="text-red-500 hover:text-red-400 transition duration-300"
              onClick={() => toggleRowVisibility(row.id)}>
              {hiddenRows.has(row.id) ? <Eye /> : <EyeOff />}
            </button>

            <button
              className="text-red-500 hover:text-red-400 transition duration-300"
              onClick={() => deleteTask(row.id)}>
              <Trash2 />
            </button>
          </div>
        ),
      },
    ];
  }, [hiddenRows, NameCell, handleFieldUpdate]);

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getRowId: (row) => row.id || row.name,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div className="flex items-center justify-center py-48 bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400">
      <div className="w-full max-w-4xl bg-stone-950 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-slate-200 mb-6">Table</h1>
        <div className="space-y-4">
          {!user || isLoading || !data ? (
            <SkeletonTable />
          ) : (
            <table className="min-w-full divide-y divide-gray-700">
              {/* Head */}
              <thead className="bg-gray-50 dark:bg-gray-800">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        className="px-12 py-3.5 text-sm font-normal text-center border border-gray-600 text-gray-500 dark:text-gray-400"
                        key={header.id}
                        colSpan={header.colSpan}>
                        {header.column.getCanSort() ? (
                          <div
                            className="cursor-pointer select-none"
                            onClick={header.column.getToggleSortingHandler()}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getIsSorted() === "asc" ? " ▲" : header.column.getIsSorted() === "desc" ? " ▼" : null}
                          </div>
                        ) : (
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {/* Body */}
              <tbody className="bg-white divide-y divide-gray-700 dark:bg-gray-900">
                {table.getRowModel().rows.map((row) =>
                  hiddenRows.has(row.id) ? (
                    <tr key={`hidden-${row.id}`}>
                      <td
                        colSpan={columns.length}
                        className="py-2 border border-gray-700 text-sm text-center whitespace-nowrap">
                        <button
                          className="text-blue-500 duration-300 transition hover:text-blue-400"
                          onClick={() => toggleRowVisibility(row.id)}>
                          <Eye />
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          className="border border-gray-700 text-center text-sm whitespace-nowrap"
                          key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
              {/* Foot */}
              <tfoot>
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center">
                    <Button
                      className="rounded-none"
                      onClick={addTask}>
                      Add New Task
                    </Button>
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
