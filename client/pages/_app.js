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
    const client = buildClient(appContext.ctx); 
    let pageProps = {};
    const { data } = await client.get('http://host.docker.internal:8001/api/products');
    try {
        const currentUserRes = await client.get('http://host.docker.internal:8000/api/users/currentuser');
        if (appContext.Component.getInitialProps) pageProps = await appContext.Component.getInitialProps(appContext.ctx, client);
        return {pageProps, products: data, currentUser}
    }
    catch (err) {
        if (appContext.Component.getInitialProps) pageProps = await appContext.Component.getInitialProps(appContext.ctx, client);
        return {pageProps, products: data, currentUser: null}
    }
};

export default AppComponent;