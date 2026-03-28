import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams } from "next/navigation"

type Props = {
    totalPages: number
}

const PRODUCTS_PER_PAGE = 5

const PaginationSection = ({ totalPages }: Props) => {
    const searchParams = useSearchParams()

    const currentPage = Number(searchParams.get("page")) || 1

    const createPageURL = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())

        params.set("page", page.toString())

        return `/products?${params.toString()}`
    }

    if (totalPages <= 1) return null

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous */}
                {currentPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious href={createPageURL(currentPage - 1)} />
                    </PaginationItem>
                )}

                {/* Pages */}
                {Array.from({ length: totalPages }, (_, i) => {
                    const page = i + 1

                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href={createPageURL(page)}
                                isActive={page === currentPage}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}

                {/* Pages */}
                <div className="mt-8 flex justify-center">
                    <PaginationSection totalPages={PRODUCTS_PER_PAGE} />
                </div>

                {/* Next */}
                {currentPage < totalPages && (
                    <PaginationItem>
                        <PaginationNext
                            href={createPageURL(currentPage + 1)}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationSection