import React from 'react';
import {Background, LoadingText} from './Styles';
import Spinner from '../assets/Spinner.gif';

export default () => {
    return (
        <Background>
            <LoadingText>로딩 중이에요~</LoadingText>
            <img src = {Spinner} alt = '로딩 중' width="5%" /> 
            </Background>

    );
};
