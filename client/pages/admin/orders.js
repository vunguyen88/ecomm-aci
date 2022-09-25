import { useState, useEffect } from 'react';
import styles from '../../styles/admin_pages/orders.module.scss';
import SidebarNav from '../../components/sidebarNav';
import OrderList from '../../components/orderList';

function Orders() {

    return (
        <div className={styles.wrapper}>
            {/*=========== Sidebar ========== */}
            <div className={styles.sidebar}>
                <SidebarNav />
            </div>
            {/*=========== Main ========== */}
            <div className={styles.main}>
                <div className={styles.main_container}>
                    Orders page is under construction. Thank you for visiting!
                    <OrderList />
                </div>
            </div>
        </div>
    )
}

export default Orders
