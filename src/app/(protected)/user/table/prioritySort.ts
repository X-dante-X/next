import { SortingFn } from "@tanstack/react-table";
import { ITask } from "@/types/user.types";
import { Row } from "@tanstack/react-table";

const priorityOrder: Record<string, number> = {
    low: 0,
    medium: 1,
    high: 2,
};

const prioritySort: SortingFn<ITask> = (rowA: Row<ITask>, rowB: Row<ITask>, columnId: string) => {
    const valueA = priorityOrder[rowA.original.priority!] ?? 0;
    const valueB = priorityOrder[rowB.original.priority!] ?? 0;

    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
};

export default prioritySort;
