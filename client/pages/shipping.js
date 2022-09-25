import { useEffect, useState } from 'react';
import styles from '../styles/cart.module.scss';
import ProductBag from '../components/productBag';
import CustomButton from '../components/customButton';
import useRequest from '../hooks/use-request';
import Router from 'next/router'; 

const Shipping = () => {
    const [cartItems, setCartItems] = useState([]);
    const [contactInfo, setContactInfo] = useState({});
    const [shippingCost, setShippingCost] = useState(true);

    useEffect(() => {
        const storage = JSON.parse(window.sessionStorage.getItem('cart'));
        setCartItems(storage)
    }, [])

    useEffect(() => {
        const contact = JSON.parse(window.sessionStorage.getItem('contactInfo'));
        setContactInfo(contact)
    }, [])

    const onPayment = async event => {
        event.preventDefault();
        sessionStorage.setItem('shippingCost', shippingCost);
        await doRequest();
    }

    const { doRequest, errors } = useRequest({
        url: '/api/orders',
        method: 'post',
        body: {
            products: JSON.parse(window.sessionStorage.getItem('cart')),
            contactInfo: JSON.parse(window.sessionStorage.getItem('contactInfo')),
            shippingCost: shippingCost
        },
        onSuccess: (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`)
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.payment}>
                    <h1>E-Commerce</h1>
                    <div style={{margin: '0.5rem 0'}}>
                        <span style={{fontWeight: 'lighter'}}>
                            Information &nbsp;{'>'}
                        </span>
                        <span style={{fontWeight: 'bolder'}}>
                            &nbsp;Shipping &nbsp;
                        </span>
                        <span style={{fontWeight: 'lighter'}}>
                            {'>'} Payment
                        </span>
                    </div>
                    <form className={styles.form}>
                        <label className={styles.label}>Contact Information</label>
                        <div className={styles.contact}>
                            <div className={styles.contact_row}>
                                <span className={styles.contact_row_column1}>Email</span>
                                <span className={styles.contact_row_column2}>{contactInfo.email}</span>
                                <span className={styles.contact_row_column3}>Change</span> 
                            </div>
                            <hr style={{width: '95%', marginLeft: '2.5%'}}/>
                            {/* <div style={{display: 'flex', justifyContent: 'center'}}></div> */}
                            <div className={styles.contact_row}>
                                <span className={styles.contact_row_column1}>Ship to</span>
                                <span className={styles.contact_row_column2}>{contactInfo.address + ', ' + contactInfo.city + ' ' + contactInfo.state + ' ' + contactInfo.zipCode + ', ' + contactInfo.country}</span>
                                <span className={styles.contact_row_column3}>Change</span>
                            </div>
                        </div>
                        <label className={styles.label}>Shipping method</label>
                        <div className={styles.contact}>
                            <div className={styles.contact_row}>
                                {/* <span className={styles.contact_row_column1}> */}
                                <label className={styles.container}>
                                    Standard First Class Shipping
                                    <input type="checkbox" checked={shippingCost} onChange={() => setShippingCost(!shippingCost)} />
                                    <span className={styles.checkmark}></span>
                                </label>
                                {/* </span> */}
                                
                                {/* <span className={styles.contact_row_column2}></span> */}
                                {/* <span className={styles.contact_row_column2}>Standard First Class Shipping</span> */}
                                <span className={styles.contact_row_column3}>${shippingCost ? 5 : 0}.00</span>
                            </div>
                        </div>
            
                        
                    </form>
                    <div style={{marginTop: '5%'}}>
                        {/* {verifyContactInfo() 
                            ?   <input type="submit" className={styles.custom_button_bg_black} value="Continue Shipping" onClick={onShipping}/>
                            :   <input type="submit" className={styles.custom_button_bg_light} value="Continue Shipping" onClick={onShipping}/>
                        } */}
                        <input type="submit" className={styles.custom_button_bg_black} value="Continue to payment" onClick={onPayment}/>
                        <span style={{marginLeft: '2rem'}}></span>
                        <input type="submit" className={styles.custom_button_bg_clear} value="Return to information" onClick={Router.back}/>
                    </div>
                    
                </div>

                <div className={styles.bag}>
                    <div>
                        Your shopping bag
                        {/* <ProductBag /> */}
                        { cartItems 
                            ? cartItems.map(item => <ProductBag productDetails={item}/>)
                            : null
                        }
                    </div>
                    <hr />
                    <div className={styles.inline_form}>
                        <input  className={styles.input} style={{width: '60%', margin: '0 0'}} type="text" placeholder="Gift card or discount code"/>
                        {/* <button style={{foat: 'right'}}>
                            Apply
                        </button> */}
                        <CustomButton color={'white'} bgColor={'#c8c8c8'} text={'apply'}/>
                    </div>
                    <hr />
                    <div className={styles.inline_form}>
                        <span>Subtotal</span>
                        <span>$ {cartItems ? (cartItems.reduce((preValue, currentValue) => preValue + currentValue.price * currentValue.count, 0)) : 0}.00</span>
                    </div>
                    <div className={styles.inline_form}>
                        <span>Shipping</span>
                        <span>$ {shippingCost ? 5 : 0}.00</span>
                    </div>
                    <hr />
                    <div className={styles.inline_form}>
                        <span>Total</span>
                        <span>USD $ {cartItems ? ((cartItems.reduce((preValue, currentValue) => preValue + currentValue.price * currentValue.count, 0)) + (shippingCost ? 5 : 0)) : 0}.00</span>
                    </div>
                </div>
            </div>
            {errors}
        </div>
    )
};

export default Shipping;