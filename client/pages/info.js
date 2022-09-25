import styles from '../styles/info.module.scss';

const Info = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.title}>Ecommerce Info</h1>
                <p className={styles.intro}>
                    Id eu nisl nunc mi ipsum faucibus vitae aliquet nec. Donec pretium vulputate sapien nec sagittis. Rutrum quisque non tellus orci ac auctor augue mauris. Bibendum est ultricies integer quis auctor elit sed vulputate. Purus semper eget duis at. Et pharetra pharetra massa massa ultricies mi. Quis vel eros donec ac. Pellentesque nec nam aliquam sem et tortor consequat id porta. Sed augue lacus viverra vitae congue. Proin sagittis nisl rhoncus mattis. Neque sodales ut etiam sit. Ut eu sem integer vitae justo eget magna fermentum. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus.
                </p>
                <div className={styles.product_section}>
                    <img className={styles.img} src="https://images.pexels.com/photos/4191618/pexels-photo-4191618.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
                    <div className={styles.colors}>
                        <p className={styles.text}>colors</p>
                        <div className={styles.color_choices}>
                            <div className={styles.circle_color_first} style={{backgroundColor: '#EFEFD7'}}>
                                <p className={styles.color_number}>W10</p>
                            </div>
                            <div className={styles.circle_color} style={{backgroundColor: '#66664A'}}>
                                <p className={styles.color_number}>W15</p>
                            </div>
                        </div>
                    </div>
                    <p className={styles.img_title}>Egestas maecenas pharetra</p>
                </div>
                <div className={styles.product_section}>
                    <img className={styles.img} src="https://images.pexels.com/photos/2062069/pexels-photo-2062069.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
                    <div className={styles.colors}>
                        <p className={styles.text}>colors</p>
                        <div className={styles.color_choices}>
                            <div className={styles.circle_color_first} style={{backgroundColor: '#3D3837'}}>
                                <p className={styles.color_number}>D10</p>
                            </div>
                            <div className={styles.circle_color} style={{backgroundColor: '#DD3C1A'}}>
                                <p className={styles.color_number}>R15</p>
                            </div>
                            <div className={styles.circle_color} style={{backgroundColor: '#884EA0'}}>
                                <p className={styles.color_number}>P10</p>
                            </div>
                            <div className={styles.circle_color} style={{backgroundColor: '#21618C'}}>
                                <p className={styles.color_number}>B22</p>
                            </div>
                        </div>
                    </div>
                    <p className={styles.img_title}>Curabitur vitae nunc</p>
                </div>
                <div className={styles.product_section}>
                    <img className={styles.img} src="https://images.pexels.com/photos/2062061/pexels-photo-2062061.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
                    <div className={styles.colors}>
                        <p className={styles.text}>colors</p>
                        <div className={styles.color_choices}>
                            <div className={styles.circle_color_first} style={{backgroundColor: '#D4EFDF'}}>
                                <p className={styles.color_number}>G05</p>
                            </div>
                            <div className={styles.circle_color} style={{backgroundColor: '#A9DFBF'}}>
                                <p className={styles.color_number}>G17</p>
                            </div>
                        </div>
                    </div>
                    <p className={styles.img_title}>Donec pretium vulputate sapien</p>
                </div>
                <div className={styles.product_section}>
                    <img className={styles.img} src="https://images.pexels.com/photos/3654776/pexels-photo-3654776.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
                    <div className={styles.colors}>
                    <p className={styles.text}>colors</p>
                        <div className={styles.color_choices}>
                            <div className={styles.circle_color_first} style={{backgroundColor: '#F39C12'}}>
                                <p className={styles.color_number}>B12</p>
                            </div>
                            <div className={styles.circle_color} style={{backgroundColor: '#AAB7B8'}}>
                                <p className={styles.color_number}>W21</p>
                            </div>
                            <div className={styles.circle_color} style={{backgroundColor: '#B29266'}}>
                                <p className={styles.color_number}>C16</p>
                            </div>
                        </div>
                    </div>
                    <p className={styles.img_title}>Neque sodales ut etiam</p>
                </div>
            </div>
        </div>
    )
};

export default Info;