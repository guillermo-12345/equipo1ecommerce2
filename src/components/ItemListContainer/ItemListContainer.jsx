import React, { useEffect, useState } from 'react';
import { ItemList } from "../ItemList/ItemList";
import { useParams } from 'react-router-dom';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);
        const collectionRef = categoryId
            ? query(collection(db, 'items'), where('category', '==', categoryId))
            : collection(db, 'items');

        getDocs(collectionRef)
            .then((response) => {
                const productsAdapted = response.docs.map((doc) => {
                    const data = doc.data();
                    return { id: doc.id, ...data };
                });
                setProducts(productsAdapted);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [categoryId]);

    return (
        <div className="fw-bolder">
            <h1 className="rounded-5 text-uppercase bd-blue-600">{greeting}</h1>
            <div className="text-dark-emphasis fw-bolder">
                {loading ? (
                    <div>...loading</div>
                ) : (
                    <ItemList products={products} />
                )}
            </div>
        </div>
    );
};

export default ItemListContainer;
/* 
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardFooter } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/productos');
                setProductos(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProductos();
    }, []);

    return (
        <div>
            {productos.map((producto) => (
              
                <Card className=' m-5 d-flex' style={{ width: '18rem' }} key={producto.id}>
                <Card.Img variant="top" src={producto.img} />
                <Card.Body>
                  <Card.Title>{producto.title}</Card.Title>
                  <Card.Text>
                  {producto.description}
                  </Card.Text>
                  <CardFooter variant="primary">{producto.price}</CardFooter>
                </Card.Body>
              </Card>
            ))}
        </div>
    );
};

export default ItemListContainer; */






/* 
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

export default ItemListContainer;*/

