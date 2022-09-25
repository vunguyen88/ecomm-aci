import styles from '../styles/components/product_bag.module.scss';
import Router from 'next/router'; 

const ProductBag = ({productDetails}) => {
    
    return (
        <div className={styles.container}>
            <div className={styles.img_container}>
                <img className={styles.img} src={productDetails.productUrl}/>
            </div>
            <div className={styles.product_info}>
                <span>{productDetails.name}</span> <span>x {productDetails.count}</span>
                <p className={styles.size}>{productDetails.size.map(size => size)}</p>
            </div>
            <div className={styles.price}>
                ${productDetails.price}
            </div>
        </div>
    )
}

export default ProductBag;