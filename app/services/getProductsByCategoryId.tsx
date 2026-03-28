export const getProductsByCategoryId = async (id: number) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${id}`);
    if (!res.ok) throw new Error('Failed to fetch products in this category');
    const data = await res.json();
    return data;
}