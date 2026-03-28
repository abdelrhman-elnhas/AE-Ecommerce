import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchProducts } from "../../services/fetchProducts";

export const useProducts = ({
    page = 1,
    title = "",
    categoryId,
}: {
    page?: number;
    title?: string;
    categoryId?: number;
} = {}) => {
    return useQuery({
        queryKey: ["products", page, title, categoryId],
        queryFn: () =>
            fetchProducts({
                page,
                title,
                categoryId,
            }),
        placeholderData: keepPreviousData,
    });
};