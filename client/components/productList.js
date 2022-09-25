//import styles from '../styles/product.module.scss';
//import Router from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductAdminPage from './productAdminPage';
import Link from 'next/link';

const ProductList = ({productDetails}) => {
    const [productList, setProductList] = useState();

    useEffect(() => {
       const getProducts = async () => {
           let { data } = await axios.get('/api/products');
           setProductList(data)
       } 
       getProducts();
    }, [])
    console.log('PRODUCT LIST ', productList)

    return (
        <div>
            {/* {productList ? productList.map(product => (<p>{product.name}</p>)) : <p>No product</p>} */}
            {productList ? productList.map(product => (<ProductAdminPage product={product}/>)) : <p>No product</p>}
        </div>
    )
}

export default ProductList;