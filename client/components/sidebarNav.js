import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { BiSearch, BiUser, BiChat, BiAnalyse, BiBarChartAlt, BiCart, BiCog, BiLogOut, BiMenu, BiMenuAltLeft, BiPackage } from "react-icons/bi";
import styles from '../styles/components/sidebar_nav.module.scss';
// import 'boxicons';

const SidebarNav = () => {
    const [sidebarActive, setSidebarActive] = useState(false);

    const onMenuButtonClick = () => {
        setSidebarActive(!sidebarActive)
    }

    console.log('sidebar ', sidebarActive)
    return (
       <div className={sidebarActive ? styles.sidebar_active : styles.sidebar}>
           <div className={styles.logo_content} >
                <div className={styles.logo}>
                    {/* <BsFillGrid3X3GapFill /> */}
                    <div className={styles.logo_name}>E-Commerce</div>
                </div>
                <BiMenu className={styles.menu_button} onClick={onMenuButtonClick}/>
           </div>
           <ul className={styles.nav_list}>
                <li>
                    {/* <Link href="/products/men"> */}
                        <a  >
                            <BiSearch className={styles.icon_search}/>
                            <input type="text" placeholder="Search..."></input>
                        </a>
                    {/* </Link>   */}
                </li>

                <li>
                    <Link href="/admin/dashboard">
                        <a>
                            <BsFillGrid3X3GapFill className={styles.icon}/>
                            <span className={styles.links_name}>Dashboard</span>
                        </a>
                    </Link>   
                    <span className={styles.tooltip}>Dashboard</span> 
                </li>

                <li>
                    <Link href="/admin/products">
                        <a  >
                            <BiPackage className={styles.icon}/>
                            <span className={styles.links_name}>Products</span>
                        </a>
                    </Link>   
                    <span className={styles.tooltip}>Products</span> 
                </li>
                
                <li>
                    <Link href="/admin/orders">
                        <a  >
                            <BiCart className={styles.icon}/>
                            <span className={styles.links_name}>Order</span>
                        </a>
                    </Link>   
                    <span className={styles.tooltip}>Orders</span> 
                </li>

                <li>
                    <Link href="/admin/users">
                        <a  >
                            <BiUser className={styles.icon}/>
                            <span className={styles.links_name}>User</span>
                        </a>
                    </Link>   
                    <span className={styles.tooltip}>User</span> 
                </li>

                <li>
                    <Link href="/admin/messages">
                        <a  >
                            <BiChat className={styles.icon}/>
                            <span className={styles.links_name}>Messages</span>
                        </a>
                    </Link>  
                    <span className={styles.tooltip}>Messages</span>  
                </li>

                <li>
                    <Link href="/admin/analytics">
                        <a  >
                            <BiBarChartAlt className={styles.icon}/>
                            <span className={styles.links_name}>Analytics</span>
                        </a>
                    </Link>   
                    <span className={styles.tooltip}>Analytics</span> 
                </li>

                <li>
                    <Link href="/admin/settings">
                        <a  >
                            <BiCog className={styles.icon}/>
                            <span className={styles.links_name}>Setting</span>
                        </a>
                    </Link>   
                    <span className={styles.tooltip}>Settings</span> 
                </li>
           </ul>
           <div className={styles.profile_content}>
                <div className={styles.profile}>
                    <div className={styles.profile_details}>
                        <img src="https://scontent.ftpa1-2.fna.fbcdn.net/v/t1.6435-9/81644247_10216748283247559_950395074838003712_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=174925&_nc_ohc=1_Ndgl9ORK0AX_eXIT8&_nc_ht=scontent.ftpa1-2.fna&oh=fb223e23a305a56c979b4a5564b256ee&oe=615DFFAF" alt="" />
                        <div className={styles.name_title}>
                            <div className={styles.name}>Vu Nguyen</div>
                            <div className={styles.title}>Admin</div>
                        </div>  
                    </div>
                    <BiLogOut className={styles.log_out}/>
                </div>
           </div>
       </div>
    )
}

export default SidebarNav;