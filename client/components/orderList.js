//import styles from '../styles/product.module.scss';
//import Router from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Order from './order';
import Link from 'next/link';

const OrderList = ({productDetails}) => {
    const [orderList, setOrderList] = useState();

    useEffect(() => {
       const getOrders = async () => {
           let { data } = await axios.get('/api/orders');
           setOrderList(data)
       } 
       getOrders();
    }, [])
    console.log('ORDER LIST ', orderList)

    return (
        <div>
            {/* { orderList ? orderList.map(order => (<p>Order ID : {order.id}</p>)) : <p>No Order</p> } */}
            { orderList ? orderList.map(order => (<Order order={order} />)) : <p>No Order</p> }
        </div>
    )
}

export default OrderList;