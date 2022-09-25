import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
// import UserAuthContext from '../context/userAuthContext';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import styles from '../../styles/auth.module.scss';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('+1');
    const [password, setPassword] = useState('');
    // const { updateUserAuthInfo } = useContext(UserAuthContext); // import method updateUserAuth from context API
    //const [errors, setErrors] = useState([]);
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,
            phoneNumber,
            password,
            role: 'guest',
            verifiedNumber: false
        },
        onSuccess: (data) => Router.push('/auth/verify')
    });
  
    const onSubmit = async event => {
        event.preventDefault();
        await doRequest();
    };
  
    return (
        <div className={styles.signup_wrapper}>
        {/* <Container> */}
        <form onSubmit={onSubmit}>
            <div className={styles.form_centered} >
                <h1 className={styles.title}>Sign Up</h1>
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
                    <label>Phone Number</label>
                    <input
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
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
                {/* {errors ? (<div style={{color: 'red'}}>{errors.map(err => err.message)}</div>)
                        : null } */}
                <div>
                Already a user? Login <a href="/auth/signin">here</a>
                </div>
                <div className={styles.auth_buttoncontainer}>
                    <button className={styles.button}>Sign Up</button>
                </div>
            </div>
        </form>
        {/* </Container> */}
        </div>
    );
};

export default SignUp;