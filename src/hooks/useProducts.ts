import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    oldPrice?: number;
    image: string;
    tag?: string;
}

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('is_visible', true);

                if (error) throw error;

                const transformed: Product[] = (data || []).map(p => ({
                    id: p.id,
                    name: p.name,
                    category: p.category,
                    price: Number(p.price),
                    oldPrice: p.old_price ? Number(p.old_price) : undefined,
                    image: p.image_url || '/images/products/placeholder.png',
                    tag: p.stock > 0 ? 'Disponível' : 'Esgotado'
                }));

                setProducts(transformed);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading };
};
