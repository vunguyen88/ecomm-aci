import styles from '../styles/story.module.scss';

const Story = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.img_section}>
                <div className={styles.img_container}>
                <img className={styles.img} src="https://images.pexels.com/photos/1050244/pexels-photo-1050244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
                </div>
            </div>
            <div className={styles.source_section}>
                <h1 className={styles.title}>
                    The source
                </h1>
                <p className={styles.content}>
                    Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Interdum velit laoreet id donec ultrices tincidunt arcu non. Consectetur adipiscing elit ut aliquam purus sit. Scelerisque felis imperdiet proin fermentum leo. Est ante in nibh mauris cursus mattis molestie a iaculis. Semper risus in hendrerit gravida rutrum. In nisl nisi scelerisque eu ultrices vitae auctor eu. Lobortis elementum nibh tellus molestie nunc non. Nisl pretium fusce id velit ut tortor pretium viverra suspendisse. Varius vel pharetra vel turpis nunc eget.
                </p>
            </div>
            <div className={styles.commitment_section}>
                <img className={styles.img} src="https://images.pexels.com/photos/539711/pexels-photo-539711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                <div className={styles.text}> 
                    <p>Learn more about</p>
                    <p>Sustainable environment</p>
                </div>
            </div>
            <div className={styles.structure_section}>
                <h1 className={styles.title}>The Structure</h1>
                <p className={styles.content}>
                    Neque ornare aenean euismod elementum. Senectus et netus et malesuada fames. Eget mi proin sed libero enim sed faucibus. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. Proin nibh nisl condimentum id. Auctor elit sed vulputate mi sit amet mauris commodo quis. Faucibus in ornare quam viverra orci sagittis eu volutpat. Urna condimentum mattis pellentesque id nibh tortor id. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Egestas maecenas pharetra convallis posuere morbi leo urna. Enim nulla aliquet porttitor lacus luctus accumsan. Non sodales neque sodales ut etiam sit amet nisl purus. Auctor elit sed vulputate mi sit.
                </p>
            </div>
        </div>
    )
};

export default Story;