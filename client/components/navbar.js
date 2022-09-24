import { useEffect, useState, useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import Router from 'next/router';
import Trie from '../utils/trie';
//import useWindowDimensions from '../api/get-dimension';
import { BsBag, BsPerson, BsBoxArrowInRight, BsGrid1X2 } from "react-icons/bs";
// import { BsPerson } from "react-icons/bs";
import style from '../styles/components/navbar.module.scss';
import CartItemContext from '../context/cartItemContext';
import UserAuthContext from '../context/userAuthContext';

const HomeNav = ({ currentUser, products }) => {
    console.log('current user nav ', currentUser)
    const [ cartItem, setCartItem ] = useState(0);
    const { cartItemCount } = useContext(CartItemContext);
    //const { userAuthInfo } = useContext(UserAuthContext);
    const [ searchPrefix, setSearchPrefix ] = useState("");
    const [ suggestionList, setSuggestionList ] = useState([]);
    const [ suggestion, setSuggestion ] = useState("");
    const [ dropDownOpen, setDropDownOpen ] = useState(false);
    
    // initial trie data structure
    let searchTrie = new Trie();

    let cart;
    let searchList = [
        {name: 'products', url: 'products'},
        {name: 'locations', url: 'locations'},
        {name: 'info', url: 'info'},
        {name: 'story', url: 'story'},
        {name: 'men', url: 'products/men'},
        {name: 'women', url: 'products/women'},
        {name: 'kids', url: 'products/kids'},
        {name: 'boys', url: 'products/kids/boys'},
        {name: 'girls', url: 'products/kids/girls'},
    ];

    if (products && products.length > 0) {
        for (let i = 0; i < products.length; i++) {
            let product = products[i];
            product.url = `products/${product.id}`
            searchList.push(products[i])
        }
    }

    //add data into trie
    for (let i = 0; i < searchList.length; i++) {
        const word = searchList[i].name.toLowerCase();
        searchTrie.insert(word);
    }

    const onSearchChange = e => {
        var value = e.target.value;

        if (value==="") {
            setSearchPrefix("")
            setDropDownOpen(false);
            setSuggestionList([]);
        } else {
            setSearchPrefix(value);
            //var words = value.split(" ");
            var trie_prefix = value.toLowerCase();
            var found_words = searchTrie.find(trie_prefix).sort((a, b) => {
              return a.length - b.length;
            });
            found_words.length > 0 ? setDropDownOpen(true) : setDropDownOpen(false);
            setSuggestionList(found_words)
            var first_word = found_words[0];
    
            if (
              found_words.length !== 0 &&
              value !== "" &&
              value[value.length - 1] !== " "
            ) {
                if (first_word != null) {
                    var remainder = first_word.slice(trie_prefix.length);
                    setSuggestion(value + remainder);
                }
            } else {
              setSuggestion(value);
            }
        }
    }

    const onDropdownItemClick = e => {
        let url;
        for (let i = 0; i < searchList.length; i++) {
            if (searchList[i].name.toLowerCase() === e.target.innerHTML) {
                url = searchList[i].url;
            }
        }
        return Router.push(`/${url}`);
    }

    const onNavToggleClick = () => {
        console.log('on nav toggle click')
    }

    if (typeof window !== 'undefined') {
        cart = JSON.parse(sessionStorage.getItem('cart'));
    }

    const links = [
        !currentUser && { label: 'Sign In', href: '/auth/signin' },
        currentUser && { label: 'Sign Out', href: '/auth/signout' }
    ]
        .filter(linkConfig => linkConfig)
        .map(({ label, href }) => {
            return <li key={href}>
                <Link href={href}>
                    <a>{label}</a>
                </Link>
            </li>
        })
        console.log('search list ', searchList)
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
            {/* <Container> */}
            <Navbar.Brand style={{ cursor: 'pointer', marginLeft: '2rem' }} onClick={() => Router.push('/')}>E-Commerce</Navbar.Brand>
            {/* <Navbar.Brand href="/">E-Commerce</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className={style.nav_icon} onClick={onNavToggleClick}/>
            <Navbar.Collapse id="responsive-navbar-nav" className={style.nav_icons_mobile}>
                <Nav className="me-auto">
                    {/* <NavDropdown title="Products" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                    {/* <Nav.Link href="/products">Products</Nav.Link> */}
                    <Nav.Link onClick={() => Router.push('/products')}>Products</Nav.Link>
                    <Nav.Link onClick={() => Router.push('/locations')}>Locations</Nav.Link>
                    <Nav.Link onClick={() => Router.push('/info')}>Info</Nav.Link>
                    <Nav.Link onClick={() => Router.push('/story')}>Story</Nav.Link>
                    
                </Nav>
                <Nav style={{ marginRight: '2rem' }}>
                    {/* <Nav.Link href="#deets">More deets</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Dank memes
                    </Nav.Link> */}
                    <Form className="d-flex">
                        <Form.Group>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className={style.search_box}
                            aria-label="Search"
                            onChange={onSearchChange}
                            value={searchPrefix}
                        />
                        {dropDownOpen && <Dropdown >
                                {dropDownOpen && <Dropdown.Menu show rootCloseEvent="click" className>
                                {suggestionList.map(item => (
                                     <Dropdown.Item key={item} onClick={ onDropdownItemClick }>
                                         {item}
                                         {/* <Nav.Link onClick={ onDropdownItemClick }>{item}</Nav.Link> */}
                                     </Dropdown.Item>
                                ))}
                                </Dropdown.Menu>}
                            </Dropdown>}
                        </Form.Group>
                        
                        <Nav.Link href="/cart" className={style.notification}>
                            <BsBag className={style.nav_icon} />
                            {cartItemCount && cartItemCount > 0 ? <span className={style.cart_notification}>{cartItemCount}</span> : null}
                        </Nav.Link>
                        {currentUser
                            ? <Nav.Link href="/admin"><BsGrid1X2 className={style.nav_icon} /></Nav.Link>
                            : null
                        }
                        {currentUser
                            ? <Nav.Link href="/auth/signout"><BsBoxArrowInRight className={style.nav_icon} /></Nav.Link>
                            : <Nav.Link href="/auth/signin"><BsPerson className={style.nav_icon} /></Nav.Link>
                        }

                        {/* {links} */}
                    </Form>
                </Nav>
            </Navbar.Collapse>
            {/* </Container> */}
        </Navbar>
    )
};

// export default HomeNav;

// HomeNav.getInitialProps = async (context, client, currentUser) => {

//     try {
//         const { data } = await client.get('/api/products');
//         return { products: data };
//     } catch (err) {
//         return {};
//     }
// }

export default HomeNav;
