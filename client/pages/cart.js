import { useEffect, useState } from 'react';
import styles from '../styles/cart.module.scss';
import ProductBag from '../components/productBag';
import CustomButton from '../components/customButton';
import Router from 'next/router'; 

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('United States');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const storage = JSON.parse(window.sessionStorage.getItem('cart'));
        setCartItems(storage)
        }, [])

    const onShipping = () => {
        sessionStorage.removeItem('contactInfo');
        let contactData = {email, firstName, lastName, address, apartment, city, state, zipCode, country, phone};
        sessionStorage.setItem('contactInfo', JSON.stringify(contactData));
        Router.push('/shipping');
    }

    const verifyContactInfo = () => {
        if (email && firstName && lastName && address && city && state && zipCode && phone) {
            return true;
        } else {
            return false;
        }
    }
         
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.payment}>
                    <h1>E-Commerce</h1>
                    <div style={{margin: '0.5rem 0'}}>
                        <span style={{fontWeight: 'bolder'}}>
                            Information &nbsp;
                        </span>
                        <span style={{fontWeight: 'lighter'}}>
                            {'>'} Shipping &nbsp;
                        </span>
                        <span style={{fontWeight: 'lighter'}}>
                            {'>'} Payment
                        </span>
                    </div>
                    <form className={styles.form}>
                        <label className={styles.label}>Contact Information</label>
                        <input className={styles.input} style={{width: '100%'}} type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            
                        <label className={styles.label}>Shipping address</label>
                        <input className={styles.input} style={{width: '47.5%'}} type="text" type="text" placeholder="First name" onChange={(e) => setFirstName(e.target.value)}/>
                        <input className={styles.input} style={{width: '47.5%', float: 'right'}} type="text" type="text" placeholder="Last name" onChange={(e) => setLastName(e.target.value)}/>
                        <input className={styles.input} style={{width: '100%'}} type="text" type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>
                        <input className={styles.input} style={{width: '100%'}} type="text" placeholder="Apartment, suit, etc (optional)" onChange={(e) => setApartment(e.target.value)}/>
                        <input className={styles.input} style={{width: '100%'}} type="text" placeholder="City" onChange={(e) => setCity(e.target.value)}/>
                        <input className={styles.input} style={{width: '30%'}} type="select" type="text" placeholder="Country" value="USA" />
                        <input className={styles.input} style={{width: '30%', marginLeft: '5%', marginRight: '5%'}} type="select" type="text" placeholder="State" onChange={(e) => setState(e.target.value)}/>
                        <input className={styles.input} style={{width: '30%'}} type="text" type="text" placeholder="ZIP code" onChange={(e) => setZipCode(e.target.value)}/>
                        <input className={styles.input} style={{width: '100%'}} type="text" placeholder="Phone" onChange={(e) => setPhone(e.target.value)}/>
                    </form>
                    <div style={{marginTop: '5%'}}>
                        {verifyContactInfo() 
                            ?   <input type="submit" className={styles.custom_button_bg_black} value="Continue Shipping" onClick={onShipping}/>
                            :   <input type="submit" className={styles.custom_button_bg_light} value="Continue Shipping" onClick={() => alert('Please fill out the information')}/>
                        }
                        <span style={{marginLeft: '2rem'}}></span>
                        <input type="submit" className={styles.custom_button_bg_light} value="Cancel" onClick={Router.back}/>
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
                        <span>$ {cartItems ? (cartItems.reduce((preValue, currentValue) => preValue + currentValue.price * currentValue.count, 0)) : 0}</span>
                    </div>
                    <div className={styles.inline_form}>
                        <span>Shipping</span>
                        <span>Calculate at next step</span>
                    </div>
                    <hr />
                    <div className={styles.inline_form}>
                        <span>Total</span>
                        <span>USD $ {cartItems ? (cartItems.reduce((preValue, currentValue) => preValue + currentValue.price * currentValue.count, 0)) : 0}</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Cart;