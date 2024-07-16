import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import cookie from 'react-cookies';

function Login(){
    const code = new URL(window.location.href).searchParams.get("code");
    const rest_api_key = process.env.REACT_APP_REST_API_KEY;
    const redirect_uri = process.env.REACT_APP_LOGIN_REDIRECT_URI;
    const navigate = useNavigate();
            
    useEffect(() => {
        // code 를 백엔드로 넘겨주는 코드 작성해야 함.
        async function fetchData(){
            const headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            const data = {
                grant_type : "authorization_code",
                client_id : rest_api_key,
                redirect_uri : redirect_uri,
                code : code
            }
            try{
                const res = await axios.post("https://kauth.kakao.com/oauth/token", qs.stringify(data), { headers });
                if(res && res.data){
                    const expires = new Date();
                    expires.setSeconds(expires.getSeconds() + res.data.expires_in);
                    cookie.save('token', res.data.access_token, {
                        path : '/',
                        expires,
                    });
                    navigate('/');
                }
            } catch(err){
                console.log(err);
            }
        }
        if(code){
            fetchData();
        }
    });
    
    return (
        <h1>로그인 중입니다.</h1>
    )
}

export default Login;