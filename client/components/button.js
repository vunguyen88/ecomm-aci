import styles from '../styles/components/button.module.scss';
import Router from 'next/router'; 

const Button = (props) => {

    const onClick = () => {
        props.addItem()
        // if (sessionStorage.getItem('cart')) {
        //     let newCart = JSON.parse(sessionStorage.getItem('cart'));
        //     newCart.push(props.product)
        //     let newStore = JSON.stringify(newCart)
        //     sessionStorage.setItem('cart', newStore);
        //     //Router.reload(window.location.pathname);
        //     props.toggleSidebar();
        // } else {
        //     let cart = JSON.stringify([props.product])
        //     sessionStorage.setItem('cart', cart);
        //     props.toggleSidebar();
        //     //Router.reload(window.location.pathname)
        // }
    }

    return (
        <button className={styles.button} onClick={onClick}>
            add to bag
        </button>
    )
}

export default Button;