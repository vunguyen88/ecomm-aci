import { useState, useEffect } from 'react';
import styles from '../styles/locations.module.scss';

const Locations = () => {
    const [state, setState] = useState('') ;
    const [stores, setStores] = useState();

    const westCoast = [
        { name: 'Neque ornare', address: '1139 Stockert Hollow Rd', city: 'Kirkland', state: 'Washington', zip: '98033' },
        { name: 'Ultrices eros', address: '4596 Brooklyn Street', city: 'Eugene', state: 'Oregon', zip: '97402' },
        { name: 'Senectus et netus', address: '2289 Freed Drive', city: 'Stockton', state: 'California', zip: '95219' },
        { name: 'Uctor elit sed', address: '938 Woodstock Drive', city: 'Los Angeles', state: 'California', zip: '90017' }
    ];
    const central = [
        { name: 'In nisl nisi', address: '1488 Court Street', city: 'Olivette', state: 'Missouri', zip: '63132' },
        { name: 'Eget mi proin', address: '473 Charter Street', city: 'Kansas City', state: 'Kansas', zip: '66223' },
        { name: 'Hendrerit dolor', address: '1483 Ashmor Drive', city: 'Wadena', state: 'Minnesota', zip: '56482' },
        { name: 'Proin nibh', address: '216 Hall Place', city: 'Dallas', state: 'Texas', zip: '75204' }
    ];
    const eastCoast = [
        { name: 'Nunc aliquet', address: '1139 Stockert Hollow Rd', city: 'Kirkland', state: 'Washington', zip: '98033' },
        { name: 'Donec pretium', address: '4596 Brooklyn Street', city: 'Eugene', state: 'Oregon', zip: '97402' },
        { name: 'Et pharetra', address: '2289 Freed Drive', city: 'Stockton', state: 'California', zip: '95219' },
        { name: 'Sed augue lacus', address: '938 Woodstock Drive', city: 'Los Angeles', state: 'California', zip: '90017' }
    ];
    const international = [
        { name: 'Curabitur vitae', address: '1067 Corpening Drive', city: 'Vienna', state: 'Austria', zip: 'V93 K3F' },
        { name: 'Nibh tortor', address: '1516 6th St SW', city: 'Sydney', state: 'Australia', zip: 'M6G 1M2' },
        { name: 'Faucibus purus', address: '2289 Freed Drive', city: 'Toronto', state: 'Canada', zip: 'V8W 2G7' },
        { name: 'Eleifend quam', address: '832 Bloor St. West', city: 'London', state: 'England', zip: 'H4A 1H2' },
        { name: 'Tincidunt eget', address: '3633 Bird Spring Lane', city: 'Paris', state: 'France', zip: 'HIU76' },
        { name: 'Sed augue lacus', address: '6050 Monkland Ave', city: 'Milan', state: 'Italy', zip: 'V5V 3R3' },
    ]

    useEffect(() => {
        setStores(westCoast);
    }, [])

    
    const displayStore = stores ? (stores.map(store => (      
        <div className={styles.store}>
            <div className={styles.state_name}>
                {store.state}
            </div>
            <div className={styles.store_name}>
                {store.name}
            </div>
            <div className={styles.store_address}>
                <p>{store.address}</p>
                <p>{store.city}, {store.state}</p>
                <p>{store.zip}</p>
            </div>
        </div>    
    ))) : null
    
    const toggleMenu = e => {
        console.log('value', e.target.innerHTML);
        setState(e.target.innerHTML);
        if (e.target.innerHTML === 'us west coast') {
            setStores(westCoast)
        } else if (e.target.innerHTML === 'us central') {
            setStores(central)
        } else if (e.target.innerHTML === 'us east coast') {
            setStores(eastCoast)
        } else {
            setStores(international)
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {/*=========== Intro ========== */}
                <div className={styles.intro_section}>
                    <p className={styles.title}>
                        Stockists
                    </p>
                    <p className={styles.content}>
                    Id eu nisl nunc mi ipsum faucibus vitae aliquet nec. Donec pretium vulputate sapien nec sagittis. Rutrum quisque non tellus orci ac auctor augue mauris. Bibendum est ultricies integer quis auctor elit sed vulputate. Purus semper eget duis at. Et pharetra pharetra massa massa ultricies mi. Quis vel eros donec ac. Pellentesque nec nam aliquam sem et tortor consequat id porta. Sed augue lacus viverra vitae congue.
                    </p>
                </div>

                {/*=========== Area ========== */}
                <div className={styles.page_menu}>
                    <div className={state === 'us west coast' ? styles.sub_page_menu_active : styles.sub_page_menu} onClick={toggleMenu}>us west coast</div>
                    <div className={state === 'us central' ? styles.sub_page_menu_active : styles.sub_page_menu} onClick={toggleMenu}>us central</div>
                    <div className={state === 'us east coast' ? styles.sub_page_menu_active : styles.sub_page_menu} onClick={toggleMenu}>us east coast</div>
                    <div className={state === 'international' ? styles.sub_page_menu_active : styles.sub_page_menu} onClick={toggleMenu}>international</div>
                </div>
                <hr />

                {/*=========== State ========== */}
                <div className={styles.state_section}>
                    {displayStore}
                </div>
            </div>
        </div>
    )
};

export default Locations;