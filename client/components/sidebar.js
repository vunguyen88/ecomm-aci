import { useEffect, useState } from 'react';
import Router from 'next/router';
import styles from '../styles/components/sidebar.module.scss';
import CartItem from './cartItem';

const Sidebar = ({ open, onClose, width, zIndex, cart }) => {
    const [cartItems, setCartItems] = useState(cart);
    const [total, setTotal] = useState(cart.reduce((preValue, currentValue) => preValue + currentValue.price * currentValue.count, 0));

    useEffect(() => {
        setCartItems(cart);
    }, [cart])
    
    const updateTotal = (newTotal) => {
       setTotal(newTotal) 
    }

    const updateCart = (newCart) => {
        setCartItems([...newCart])
    }

    const onClick = () => {
        onClose()
    }


    return (
        <>
            {
                open 
                    ?   <div className={styles.container} style={{width: width}} >
                            <div className={styles.top}>
                                <div className={styles.sidebar_top_row}>
                                    <span className={styles.sidebar_title}>Cart</span>
                                    <button className={styles.sidebar_close_button} onClick={onClick}>x</button>
                                </div>
                               
                                <div className={styles.sidebar_cart_items}>
                                    {cart.length > 0 
                                        ?   cart.map(item => (
                                                <CartItem key={item.id} cartItem={item} total={total} updateTotal={updateTotal} updateCart={updateCart}/>
                                            )) 
                                        :   cartItems.map(item => (
                                                <CartItem  key={item.id} cartItem={item} total={total} updateTotal={updateTotal} updateCart={updateCart}/>
                                            ))
                                    }
                                </div>
                            </div>
                            <div className={styles.bottom}>
                                <div className={styles.total}>
                                    <p>subtotal</p>
                                    <p>$ {cartItems.reduce((preValue, currentValue) => preValue + currentValue.price * currentValue.count, 0)}</p>
                                </div>
                                <p className={styles.shipping_note}>Shipping and discount coders are added at checkout</p>
                                <button className={styles.checkout_button} onClick={() => Router.push('/cart')}>
                                    Checkout
                                </button>

                            </div>
                        </div>
                    :   <div style={{width: 0}}/>
            }
        </>
    )
}

export default Sidebar;