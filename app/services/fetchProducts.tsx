export const fetchProducts = async ({
    page = 1,
    limit = 5,
    title,
    categoryId,
}: {
    page?: number;
    limit?: number;
    title: string | undefined;
    categoryId?: number;
}) => {
    const params = new URLSearchParams();

    params.append("limit", String(limit));
    params.append("offset", String((page - 1) * limit));

    if (title) params.append("title", title);
    if (categoryId) params.append("categoryId", String(categoryId));

    const res = await fetch(
        `https://api.escuelajs.co/api/v1/products?${params.toString()}`
    );

    if (!res.ok) throw new Error("Failed to fetch products");

    return res.json();
}

