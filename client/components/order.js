import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/components/order.module.scss';

function Order({ order }) {
    // console.log('Order ', order);
    const [productList, setProductList] = useState();

    useEffect(() => {
        const getProductDetails = async () => {
            let list = [];
            // let { data } = await axios.get('/api/orders');
            // setOrderList(data)
            for (const id of order.products) {
                let { data } = await axios.get(`/api/products/${id}`);
                let quantity = order.quantity.filter(element => element.productId === data.id);
                data.amount = quantity[0].amount;
                list.push(data);
            };
            setProductList(list);
        } 
        getProductDetails();
    }, [])
    console.log('product list ', productList)
    // const amount = (id) => {
    //     let quantity = order.quantity.filter(element => element.productId == id)
    //     return quantity.amount
    // }
    // const amount = order.quantity.filter(element => element.productId === )

    return (
        <div className={styles.container}>
            {/* === Header section === */}
            <div className={styles.header}>
                <div className={styles.order_status}>
                    <p>
                        ORDER
                        <span>{order.status}</span>
                    </p>
                    <p className={styles.header_value}>
                        Date
                        <span>{order.createdOn.split("T")[0]}</span>
                    </p>
                </div>
                <div className={styles.order_total}>
                    <p>TOTAL</p>
                    <p className={styles.header_value}>${order.total}</p>
                </div>
                <div className={styles.order_shipto}>
                    <p>SHIP TO</p>
                    <p className={styles.header_value}>{order.shipTo}</p>
                </div>
                <div className={styles.order_number}>
                    <p>ORDER #</p>
                    <p className={styles.header_value}>{order.id}</p>
                </div>
            </div>
            {/* === Body section === */}
            { 
                productList 
                    ?   productList.map((product, index) => (
                        <div>
                        <div className={styles.body}> 
                            <div className={styles.product_image_section}>
                                <img className={styles.img} src={product.productUrl} />
                            </div>
                            <div className={styles.product_detail_section}>
                                <p>{product.details}</p>
                            </div>
                            <div className={styles.product_count}>
                                X {product.amount}
                            </div>
                            
                        </div>
                            {productList.length > 1 && index !== productList.length -1 ? <hr className={styles.divider}/> : null}
                        </div>
                        ))
                    :   null
            }
            
        </div>
    )
}

export default Order