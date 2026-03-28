import { useQuery } from "@tanstack/react-query"
import { getProductsByCategoryId } from "../../services/getProductsByCategoryId"


export const useProductsByCategoryId = (id: number) => {
    return useQuery({
        queryKey: ['products', id],
        queryFn: () => getProductsByCategoryId(id),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}