import { useState, useEffect } from 'react';
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import buildClient from "../api/build-client";
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import CartItemContext from "../context/cartItemContext";
import UserAuthContext from '../context/userAuthContext';
import styles from '../styles/layout.scss'; 
import { IoFileTrayStackedSharp } from 'react-icons/io5';
// import Zoom from 'react-reveal/Zoom';

const AppComponent = ({ Component, pageProps, products, currentUser }) => {
    const [cartItemCount, setCartItemCount] = useState(0);
    const [userAuthInfo, setUserAuthInfo] = useState({});

    const updateUserAuthInfo = (userAuthInfo) => {
        setUserAuthInfo(userAuthInfo);
    }

    const updateCartItemCount = (count) => {
        setCartItemCount(cartItemCount + count);
    }

    const resetCartItemCount = () => {
        setCartItemCount(0)
    }

    if (typeof window !== 'undefined') {
        let cart = JSON.parse(sessionStorage.getItem('cart'));
        if (cart !== null) {
            let count = cart.reduce((preValue, currentValue) => preValue + currentValue.count, 0);
            if (count > cartItemCount) setCartItemCount(count);
        }  
    }


    return (
        <div >
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <UserAuthContext.Provider value={{ userAuthInfo: userAuthInfo, updateUserAuthInfo: updateUserAuthInfo }}>
            <CartItemContext.Provider value={{ cartItemCount: cartItemCount, updateCartItemCount: updateCartItemCount, resetCartItemCount: resetCartItemCount }}>
                <NavBar {...pageProps} currentUser={currentUser} products={products}/>
                <Component {...pageProps} className={styles.body} />
            </CartItemContext.Provider>  
            </UserAuthContext.Provider>
            <Footer />
        </div>
    );
}
    
AppComponent.getInitialProps = async (appContext) => {
    console.log('get initial props');
    //const client = buildClient(appContext.ctx); 

    let pageProps = {};
    console.log('before error')
    // const products = await client.get('http://localhost:8001/api/products');
    const productRes = await fetch('http://localhost:8001/api/products')
    console.log('products ', productRes.json());
    const products = productRes.json();

    const currentUserRes = await fetch('localhost:8000/api/users/currentuser')
    const currentUser = currentUserRes.json();
    return {}
    // try {
    //     currentUser = await client.get('8000/api/users/currentuser');
    // } 
    // catch (err) {
    //     console.log(err)
    // }
    
    // finally {
        
    //     if (currentUser === {}) {
    //         if( appContext.Component.getInitialProps) {
    //             pageProps = await appContext.Component.getInitialProps(appContext.ctx, client);
    //         }
    //         return {pageProps, products: [...products.data], currentUser: {}}
    //     } else {
    //         if( appContext.Component.getInitialProps) {
    //             pageProps = await appContext.Component.getInitialProps(appContext.ctx, client);
    //         }
    //         return {pageProps, products: [...products.data], ...currentUser.data}
    //    }
    // }
};

export default AppComponent;