import { useEffect, useState, useContext } from 'react';
import styles from '../../styles/cart.module.scss';
import ProductBag from '../../components/productBag';
import useRequest from '../../hooks/use-request';
import CustomButton from '../../components/customButton';
import Router from 'next/router'; 
import StripeCheckout from 'react-stripe-checkout';
import CartItemContext from '../../context/cartItemContext';

const OrderShow = ({ order, currentUser }) => {
    const { resetCartItemCount } = useContext(CartItemContext);
    const [cartItems, setCartItems] = useState([]);
    const [contactInfo, setContactInfo] = useState({});
    const [shippingCost, setShippingCost] = useState(true);
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardExp, setCardExp] = useState('');
    const [cardSecurityCode, setCardSecurityCode] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: Router.query.orderId
        },
        onSuccess: (payment) => {
            console.log('payment ', payment);
            sessionStorage.clear();
            resetCartItemCount();
        }
    })

    useEffect(() => {
        const storage = JSON.parse(window.sessionStorage.getItem('cart'));
        setCartItems(storage)
    }, [])

    useEffect(() => {
        const contact = JSON.parse(window.sessionStorage.getItem('contactInfo'));
        setContactInfo(contact)
    }, [])

    useEffect(() => {
        const shipping = JSON.parse(window.sessionStorage.getItem('shippingCost'));
        setShippingCost(shipping);
    }, [])

    const payNow = () => {
        console.log('PAY NOW')
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.payment}>
                    <h1>E-Commerce</h1>
                    <div style={{margin: '0.5rem 0'}}>
                        <span style={{fontWeight: 'lighter'}}>
                            Information &nbsp;{'>'}
                        </span>
                        <span style={{fontWeight: 'lighter'}}>
                            &nbsp;Shipping &nbsp;{'>'} &nbsp;
                        </span>
                        <span style={{fontWeight: 'bolder'}}>
                            Payment
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
                            <hr style={{width: '95%', marginLeft: '2.5%'}}/>
                            <div className={styles.contact_row}>
                                <span className={styles.contact_row_column1}>Method</span>
                                <span className={styles.contact_row_column2}>Standard First Class Shipping -<span style={{paddingLeft: '0.2rem', fontWeight: 'bold'}}> ${shippingCost ? 5 : 0}.00</span></span>
                                {/* <span className={styles.contact_row_column3}>Change</span> */}
                            </div>
                        </div>
                        <div className={styles.label}>
                            <p className={styles.label}>Payment</p>
                            <p className={styles.sublabel}>All transactions are secure and encrypted</p>
                        </div>
                        
                        {/* <div className={styles.contact}>
                            <form className={styles.form}>
                                <input className={styles.input} style={{width: '90%', paddingLeft: '3%', marginLeft: '5%'}} type="text" placeholder="Card number" onChange={(e) => setCardNumber(e.target.value)}/>
                                <input className={styles.input} style={{width: '90%', paddingLeft: '3%', marginLeft: '5%'}} type="text" placeholder="Name on card" onChange={(e) => setCardName(e.target.value)}/>
                                <input className={styles.input} style={{width: '43%', paddingLeft: '3%', marginLeft: '5%'}} type="text" placeholder="Expiration date (MM / YY)" onChange={(e) => setCardExp(e.target.value)}/>
                                <input className={styles.input} style={{width: '44%', paddingLeft: '3%', marginLeft: '3%', marginRight: '5%'}} type="text" placeholder="Security code" onChange={(e) => setCardSecurityCode(e.target.value)}/>

                            </form>
                        </div> */}
            
                        
                    </form>
                    <div style={{marginTop: '5%'}}>
                        {/* {verifyContactInfo() 
                            ?   <input type="submit" className={styles.custom_button_bg_black} value="Continue Shipping" onClick={onShipping}/>
                            :   <input type="submit" className={styles.custom_button_bg_light} value="Continue Shipping" onClick={onShipping}/>
                        } */}
                        {/* <input type="submit" className={styles.custom_button_bg_black} value="Pay now" onClick={payNow}/> */}
                        <StripeCheckout 
                            token={({id}) => doRequest({ token: id })}
                            stripeKey="pk_test_51IbZd0Cdr9bpE86e3L2RHsp4oUZ7tCR9z2LniXBH059Trz6WR8yYldkhbJPUgbUq5GK8wa5ypmuhD94cc6fYproq006N6vB8ib"
                            amount={(cartItems ? ((cartItems.reduce((preValue, currentValue) => preValue + currentValue.price * currentValue.count, 0)) + (shippingCost ? 5 : 0)) : 0) *100}
                            email={contactInfo.email}
                        />
                        <span style={{marginLeft: '2rem'}}></span>
                        <input type="submit" className={styles.custom_button_bg_clear} value="Return to shipping" onClick={Router.back}/>
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
            {/* {errors} */}
        </div>
    )
};

export default OrderShow;
