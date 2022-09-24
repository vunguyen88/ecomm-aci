import { useState, useEffect } from 'react';
import styles from '../styles/admin.module.scss';
import SidebarNav from '../components/sidebarNav';
import ProductList from '../components/productList';
import OrderList from '../components/orderList';

const Admin = () => {
    const [displayProducts, setDisplayProducts] = useState(false);
    const [displayOrders, setDisplayOrders] = useState(false);

    // const onProductsButtonClick = () => {
    //     setDisplayOrders(false);
    //     setDisplayProducts(true);
    // }

    // const onOrdersButtonClick = () => {
    //     setDisplayProducts(false)
    //     setDisplayOrders(true);
    // }

    return (
        <div className={styles.wrapper}>
            {/*=========== Sidebar ========== */}
            <div className={styles.sidebar}>
                <SidebarNav />
                {/* <div className={styles.sidebar_items} onClick={onProductsButtonClick}>
                    Products
                </div>
                <div className={styles.sidebar_items} onClick={onOrdersButtonClick}>
                    Orders
                </div> */}
            </div>
            {/*=========== Main ========== */}
            <div className={styles.main}>
                <div className={styles.main_container}>
                    MAIN SECTION
                    { displayProducts && <ProductList /> }
                    { displayOrders && <OrderList /> }
                </div>
            </div>
        </div>
    )
};

export default Admin;