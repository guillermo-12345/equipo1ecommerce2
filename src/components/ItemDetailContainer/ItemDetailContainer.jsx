import { useState,useEffect } from "react";
import  ItemDetail  from "../ItemDetail/ItemDetail";
import { getProductById } from "../../asyncMock";
import { useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../service/firebaseConfig'

const ItemDetailContainer=()=>{
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const {itemId}=useParams()

         useEffect(() => {
            setLoading(true)
    
            const docRef = doc(db, 'items', itemId)
    
            getDoc(docRef)
                .then(response => {
                    const data = response.data()
                    const productsAdapted = { id: response.id, ...data }
                    setProduct(productsAdapted)
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setLoading(false)
                })
        }, [itemId])


    return(
        <div className="ItemDetailContainer">
            {loading ? <p>Cargando información del producto...</p> : <ItemDetail {...product} />}
        </div>
    )
    
} 

export default ItemDetailContainer;/* 

import { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { getProductById } from "../../asyncMock";
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { itemId } = useParams();

    useEffect(() => {
        setLoading(true);

        getProductById(itemId)
            .then(response => {
                setProduct(response);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [itemId]);

    return (
        <div className="ItemDetailContainer">
            {loading ? <p>Cargando información del producto...</p> : <ItemDetail {...product} />}
        </div>
    );
};

export default ItemDetailContainer;*/
