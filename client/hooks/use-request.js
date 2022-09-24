import { useContext } from 'react';
import axios from 'axios';
import UserAuthContext from '../context/userAuthContext';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  const { updateUserAuthInfo } = useContext(UserAuthContext); // import method updateUserAuth from context API
  const doRequest = async (props = {}) => {
    // try {
      setErrors(null);
      // validate phone number when sign up
      if (body.phoneNumber && !body.authNumber) {
        if (body.phoneNumber && body.phoneNumber.length === 12) {

          const response = await axios[method](url, { ...body, ...props });
          let userAuthInfo = response.data;

          // update user context
          updateUserAuthInfo(userAuthInfo)
  
          // redirect page when success call
          if (onSuccess) {
            onSuccess(response.data);
          }
          return response.data;
        } else {
          return setErrors(
            <div className="alert alert-danger">
            <ul className="my-0">
              {/* {err.response.data.errors.map((err) => ( */}
                <li>Incorrect phone number format</li>
                <li>Phone number should be: +1XXXXXXXXXX</li>
              {/* ))} */}
            </ul>
          </div>
          )
        }

      // validate auth number after signup or signin
      } else if (body.authNumber) {
        if (body.authNumber && body.authNumber.length === 6) {
          const response = await axios[method](url, { ...body, ...props });
          
          // redirect page when success call
          if (onSuccess) {
            onSuccess(response.data);
          }

          return response.data;
        } else {
          return setErrors(
            <div className="alert alert-danger">
            <ul className="my-0">
              {/* {err.response.data.errors.map((err) => ( */}
                <li>Incorrect auth number format</li>
                <li>Auth number should only be 6 digits</li>
              {/* ))} */}
            </ul>
          </div>
          )
        }
        // no phonenumber process with signin and update user context
      } else {
        try {
          const response = await axios[method](url, { ...body, ...props });
          let userAuthInfo = response.data;
  
          // update user context
          updateUserAuthInfo(userAuthInfo)
  
          if (onSuccess) {
            onSuccess(response.data);
          }
          return response.data;
        } catch (err) {
          let errMsg = '';
          if (err.message === 'Request failed with status code 400') errMsg='Invalid credentials'
          return setErrors(
            <div className="alert alert-danger">
              <p>{errMsg}</p>
            </div>
          )
        }
      }
  };

  return { doRequest, errors };
};

export default useRequest;
