import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../services/getProductById"


export const useSingleProduct = (id: number) => {
    return useQuery({
        queryKey: ['products', id],
        queryFn: () => getProductById(id),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}