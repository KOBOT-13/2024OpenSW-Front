import React from 'react';
import ReactLoading from 'react-loading';

const STTLoading = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={35} width={35}/>
);

export default STTLoading;