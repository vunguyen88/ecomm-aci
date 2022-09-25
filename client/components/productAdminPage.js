import React from 'react'
import styles from '../styles/components/product_admin_page.module.scss';

function ProductAdminPage({ product }) {
    return (
        <div className={styles.container}>
            {/* === Header section === */}
            <div className={styles.header}>
                <div className={styles.product_id}>
                    <p>
                        PRODUCT #
                        <span>{ product.id }</span>
                    </p>
                </div>
                <div className={styles.product_status}>
                    <p>
                        STATUS
                        <span>Available</span>
                    </p>
                </div>
                {/* <div className={styles.button_section}> */}
                    <button className={styles.product_edit_button}>Edit</button>
                {/* </div> */}
            </div>
            {/* === Body section === */}       
            <div className={styles.body}>
                <div className={styles.product_image_section}>
                    <img className={styles.img} src={product.productUrl}/>
                </div>
                <div className={styles.product_detail_section}>
                    <p>{product.name}</p>
                    <p>{product.details}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductAdminPage
