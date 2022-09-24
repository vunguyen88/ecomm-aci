import { useState, useEffect } from 'react';
import styles from '../../styles/admin_pages/products.module.scss';
import SidebarNav from '../../components/sidebarNav';
import ProductList from '../../components/productList';

function Products() {

    return (
        <div className={styles.wrapper}>
            {/*=========== Sidebar ========== */}
            <div className={styles.sidebar}>
                <SidebarNav />
            </div>
            {/*=========== Main ========== */}
            <div className={styles.main}>
                <div className={styles.main_container}>
                    Products page is under construction. Thank you for visiting!
                    <ProductList />
                </div>
            </div>
        </div>
    )
}

export default Products
