import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap';
import {useState} from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import styles from '../../styles/auth.module.scss';
import {FaFacebook, FaGoogle} from 'react-icons/fa';

const SignIn = ({ currentUser }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
          email,
          password
        },
        onSuccess: (data) => Router.push('/auth/verify')
      });
    
    const onSubmit = async event => {
        event.preventDefault();
    
        await doRequest();
    };
  
    return (
        <div className={styles.signin_wrapper}> 
            {/* <Container> */}
            <form onSubmit={onSubmit}>
                <div className={styles.form_centered} >
                <h1 className={styles.title}>Sign In</h1>
                <div className="form-group">
                    <label>Email Address</label>
                    <input 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="form-control"
                        style={{ marginTop: '.5rem', marginBottom: '.5rem'}}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        style={{ marginTop: '.5rem', marginBottom: '.5rem'}}
                    />
                </div>
                {errors}
                <div>
                New user? Register <a href="/auth/signup">here</a>
                </div>
                <div className={styles.auth_buttoncontainer}>
                    <div>
                        <button className={styles.button}>Sign In</button>
                    </div>
                   
                    {/* <div>
                    <div className={styles.socialbutton}>
                        <div className={styles.socialbutton_fb}>
                            <FaGoogle/> Login with Facebook
                        </div>
                    </div>
                    </div>

                    <div>
                    <div className={styles.socialbutton}>
                        <div className={styles.socialbutton_google}>
                            <FaFacebook/> Login with Google+
                        </div>
                    </div>
                    </div> */}
                 </div>

                </div>
            </form>
            {/* </Container> */}
    
        </div>
    );
};

export default SignIn;