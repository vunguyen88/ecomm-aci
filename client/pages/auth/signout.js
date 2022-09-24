import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import styles from '../../styles/auth.module.scss';

//KNOWN ERROR FOR MAPPED ERRORS
const SignOut = () => {
    const { doRequest } = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/')
      });
    
      useEffect(() => {
        doRequest();
      }, []);
    
      return (
        <div className={styles.container}>
          <div>Signing you out...</div>
        </div>
      );
};

export default SignOut;