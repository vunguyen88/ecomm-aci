import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
//import { Container, Row } from 'react-bootstrap';

const NewProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [details, setDetails] = useState('');
    const [type, setType] = useState('');
    const [color, setColor] = useState('');
    const [productUrl, setProductUrl] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/products',
        method: 'post',
        body: {
            name, price, size, details, type, color, productUrl
        },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = (event) => {
        event.preventDefault();

        doRequest();
    }

    const onBlur = () => {
        const value = parseFloat(price);
        console.log(value)

        if (isNaN(value)) {
            return;
        }

        setPrice(value.toFixed(2));
    }

    return (
        <div style={{paddingTop: '4rem'}}>
            <h1>Create a product</h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>Product Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} className='form-control'/>
                </div>
                <div className='form-group'>
                    <label>Price</label>
                    <input value={price} onBlur={onBlur} onChange={e => setPrice(e.target.value)} className='form-control'/>
                </div>
                <div className='form-group'>
                    <label>Size</label>
                    <input value={size} onChange={e => setSize(e.target.value)} className='form-control'/>
                </div>
                <div className='form-group'>
                    <label>Details</label>
                    <input value={details} onChange={e => setDetails(e.target.value)} className='form-control'/>
                </div>
                <div className='form-group'>
                    <label>Type</label>
                    <input value={type} onChange={e => setType(e.target.value)} className='form-control'/>
                </div>
                <div className='form-group'>
                    <label>Color</label>
                    <input value={color} onChange={e => setColor(e.target.value)} className='form-control'/>
                </div>
                <div className='form-group'>
                    <label>Product Url</label>
                    <input value={productUrl} onChange={e => setProductUrl(e.target.value)} className='form-control'/>
                </div>
                {errors}
                <button className='btn btn-primary'>Submit</button>
            </form>

        </div>
    )
}

export default NewProduct;