import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap';
import {useState, useContext} from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import styles from '../../styles/auth.module.scss';
import UserAuthContext from '../../context/userAuthContext';

const AuthVerify = ({ currentUser }) => {

    const [authNumber, setAuthNumber] = useState('');
    const { userAuthInfo } = useContext(UserAuthContext);

    const { doRequest, errors } = useRequest({
        url: '/api/users/auth-verify',
        method: 'post',
        body: {
          authNumber,
          email: userAuthInfo.email,
          phoneNumber: userAuthInfo.phoneNumber,
          role: userAuthInfo.role,
          verifiedNumber: userAuthInfo.verifiedNumber
        },
        onSuccess: (data) => Router.push('/')
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
                <h1 className={styles.title}>Auth Verification</h1>
                <div className="form-group">
                    <label>Enter code in your text message</label>
                    <input 
                        style={{ marginTop: '10px', marginBottom: '20px'}}
                        value={authNumber}
                        onChange={e => setAuthNumber(e.target.value)}
                        className="form-control"
                    />
                </div>
                
                {errors}

                <div className={styles.auth_buttoncontainer}>
                    <div>
                        <button className={styles.button}>Submit</button>
                    </div>
                   
                 </div>

                </div>
            </form>
    
        </div>
    );
};

export default AuthVerify;