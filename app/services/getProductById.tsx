export const getProductById = async (id: number) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch this product');
    const data = await res.json();
    return data;
}