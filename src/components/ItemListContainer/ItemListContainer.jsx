import React, { useEffect, useState } from 'react';
import { ItemList } from "../ItemList/ItemList";
import { useParams } from 'react-router-dom';
import { getProduct, getProductsByCategory } from '../../asyncMock'; 

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);

        const fetchProducts = categoryId ? getProductsByCategory(categoryId) : getProduct();

        fetchProducts
            .then(response => {
                setProducts(response);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [categoryId]);

    return (
        <div className='fw-bolder'>
            <h1 className='rounded-5 text-uppercase bd-blue-600'>{greeting}</h1>
            <div className='text-dark-emphasis fw-bolder'>
                {loading ? <div>...loading</div> : <ItemList products={products} />}
            </div>
        </div>
    );
}

export default ItemListContainer;

