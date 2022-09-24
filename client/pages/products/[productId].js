import { useEffect, useState, useContext } from 'react';
import styles from '../../styles/product_show.module.scss';
import Button from '../../components/button';
import Sidebar from '../../components/sidebar';
import CartItemContext from '../../context/cartItemContext';

const ProductShow = ({product}) => {
    const { updateCartItemCount } = useContext(CartItemContext);
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const toggleSidebar = () => {
        setIsOpen((prevState) => !prevState)
    }

    const addItem = (item) => {

    }

    const onClick = () => {
        updateCartItemCount(1);
        if (sessionStorage.getItem('cart')) {
            let currentCart = JSON.parse(sessionStorage.getItem('cart'));
            let index = currentCart.findIndex(x => x.id === product.id);
            if (index > -1) {
                currentCart[index].count ++;
                sessionStorage.setItem('cart', JSON.stringify(currentCart));
                setCartItems(currentCart);
                toggleSidebar(); 
            } else {
                product.count = 1;
                let newCart = [...currentCart, product];
                sessionStorage.setItem('cart', JSON.stringify(newCart));
                setCartItems([...newCart]);
                toggleSidebar();
            }
        } else {
            product.count = 1;
            let cart = JSON.stringify([product])
            sessionStorage.setItem('cart', cart);
            setCartItems([{...product}]);
            toggleSidebar();
        }
    }

    
    return (
        <div style={{display: 'flex', maxHeight: '100vh'}}>
            <div className={styles.wrapper}>
                <div className={styles.left_container}>
                    <img className={styles.product_img} src={product.productUrl}/> 
                </div>
                <div className={styles.right_container}>
                    <div className={styles.product_info}>
                        <h1 className={styles.product_name}>{product.name}</h1>
                        <div className={styles.product_type}>{product.type}</div>
                        <p className={styles.product_price}>$ {product.price}</p>
                        <div className={styles.product_details}>{product.details}</div>
                        <button product={product} onClick={onClick} className={styles.button}>add item</button>
                    </div>
                </div>
                
            </div>
            <Sidebar open={isOpen} onClose={toggleSidebar} width={'80%'} zIndex={'100'} cart={cartItems}/>
        </div>
    )
}

ProductShow.getInitialProps = async (context, client) => {
    const {productId} = context.query
    console.log('GET INITIAL CALL FROM PRODUCTS PAGE ')
    try {
        const { data } = await client.get(`http://host.docker.internal:8001/api/products/${productId}`);
        console.log('product show data ', data);
        return { product: data };
    } catch (err) {
        console.log(err);
        return {};
    }
}

export default ProductShow;