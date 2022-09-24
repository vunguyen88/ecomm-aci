import axios from 'axios';

const BuildClient = ({ req }) => {
    if(typeof window === 'undefined') {
        // api call from server
        console.log('CALL FROM SERVER');
        return axios.create({
            //baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            // baseURL: 'http://ecommerce-microservices.me',
            baseURL: '',
            headers: req.headers
        });
    } else {
        // api call from browser
        console.log('CALL FROM BROWSER');

        return axios.create({
            baseURL: '/',
        });
    }
};

export default BuildClient;