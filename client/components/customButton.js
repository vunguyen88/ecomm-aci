import styles from '../styles/components/custom_button.module.scss';
import Router from 'next/router'; 

const CustomButton = (props) => {
    // console.log('props in custom button ', props)
    const { color, bgColor, text, mLeft, mRight } = props;
    // const onClick = () => {
    //     if (sessionStorage.getItem('cart')) {
    //         let newCart = JSON.parse(sessionStorage.getItem('cart'));
    //         newCart.push(props.product)
    //         let newStore = JSON.stringify(newCart)
    //         sessionStorage.setItem('cart', newStore);
    //         Router.reload(window.location.pathname)
    //     } else {
    //         let cart = JSON.stringify([props.product])
    //         sessionStorage.setItem('cart', cart);
    //         Router.reload(window.location.pathname)
    //     }
    // }

    return (
        <button className={styles.custom_button} style={{color: color, backgroundColor: bgColor, marginLeft: mLeft}} onClick={props.onShopping}>
            {text}
        </button>
    )
}

export default CustomButton;