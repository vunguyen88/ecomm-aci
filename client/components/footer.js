import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { IoCall, IoMail, IoChatbubblesSharp, IoStar, IoEllipse, IoLogoTwitter, IoLogoFacebook, IoLogoLinkedin } from "react-icons/io5";

import Link from 'next/link';
import Router from 'next/router';

import { BsBag, BsPerson, BsBoxArrowInRight, BsGrid1X2 } from "react-icons/bs";
// import { BsPerson } from "react-icons/bs";
import styles from '../styles/components/footer.module.scss';

const Footer = ({ currentUser }) => { 

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.col_md_4, styles.footer_column}>
                        <ul className={styles.flex_column}>
                            <li className={styles.nav_item}>
                                <span className={styles.footer_title}>Product</span>
                            </li>
                            <li className={styles.nav_item}>
                                <a className={styles.nav_link} href="/products/men">Men</a>
                            </li>
                            <li className={styles.nav_item}>
                                <a className={styles.nav_link} href="/products/women">Women</a>
                            </li>
                            <li className={styles.nav_item}>
                                <a className={styles.nav_link} href="/products/kids">Kids</a>
                            </li>
                            <li className={styles.nav_item}>
                                <a className={styles.nav_link} href="#">Frequently asked questions</a>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.col_md_4, styles.footer_column}>
                        <ul className={styles.flex_column}>
                            <li className={styles.nav_item}>
                                <span className={styles.footer_title}>Company</span>
                            </li>
                            <li className={styles.nav_item}>
                                <a className={styles.nav_link} href="#">About us</a>
                            </li>
                            <li className={styles.nav_item}>
                                <a className={styles.nav_link} href="#">Job postings</a>
                            </li>
                            <li className={styles.nav_item}>
                                <a className={styles.nav_link} href="#">News and articles</a>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.col_md_4, styles.footer_column}>
                        <ul className={styles.nav, styles.flex_column}>
                            <li className={styles.nav_item}>
                                <span className={styles.footer_title}>Contact & Support</span>
                            </li>
                            <li className={styles.nav_item}>
                                <span className={styles.nav_link}><IoCall />&nbsp; +1 (407) 493-5333</span>
                            </li>
                            <li className={styles.nav_item}>
                                <a className={styles.nav_link} href="#"><IoChatbubblesSharp />&nbsp; Live chat</a>
                            </li>
                            <li className={styles.nav_item}>
                                <a className={styles.nav_link} href="#"><IoMail />&nbsp; nguyenanhhoanvu@gmail.com</a>
                            </li>
                            <li className={styles.nav_item}>
                                <a className={styles.nav_link} href="#"><IoStar />&nbsp; Give feedback</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.row}>
                    <IoEllipse style={{color: 'white', fontSize: '22px', paddingRight: '10px'}}/> 
                    <IoEllipse style={{color: 'white', fontSize: '22px', paddingRight: '10px'}}/> 
                    <IoEllipse style={{color: 'white', fontSize: '22px', paddingRight: '10px'}}/>
                </div>
                
                <div className={styles.row}>
                    <div className={styles.footer_column}>
                        <p className={styles.copyright}>Copyright &copy; Your Website {new Date().getFullYear()}</p>
                    </div>

                    <div className={styles.col_md_4, styles.footer_column}>
                        <ul className={styles.flex_column_inline}>
                            <li >
                                <IoLogoTwitter style={{color: 'white', fontSize: '30px', marginRight: '10px'}}/>
                            </li>
                            <li >
                                <IoLogoFacebook style={{color: 'white', fontSize: '30px', marginRight: '10px'}}/>  
                            </li>
                            <li >
                                <IoLogoLinkedin style={{color: 'white', fontSize: '30px'}} />
                            </li>
                        </ul>
                    </div>                                
                   
                    <div className={styles.col_md_4, styles.footer_column}>
                        <ul className={styles.flex_column_inline}>
                            <li className={styles.nav_item}>
                                <a className={styles.nav_link} style={{marginRight: '20px'}} href="#">Privacy Policy</a>
                            </li>
                            <li className={styles.nav_item}>
                                <a className={styles.nav_link} href="#">Terms of Use</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;