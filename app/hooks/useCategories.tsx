import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/getCategories";

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'], queryFn: getCategories, refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
}