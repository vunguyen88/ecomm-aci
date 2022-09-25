import styles from '../styles/product.module.scss';
import Router from 'next/router';
import Link from 'next/link';

const Product = ({productDetails}) => {
    const onClick = () => {
        
    }

    return (
        <div className={styles.product}>
            <Link href="/products/[productId]" as={`/products/${productDetails.id}`}>
                <img className={styles.img} src={productDetails.productUrl} onClick={onClick}/>
            </Link>
            {/* <Link className={styles.img_name} href='/products/[productId' as={`/products/${productDetails.id}`}><a>{productDetails.name}</a> </Link> */}
            <Link href="/products/[productId]" as={`/products/${productDetails.id}`}>
                <p className={styles.img_name}>{productDetails.name}</p> 
            </Link>
        </div>
    )
}

export default Product;