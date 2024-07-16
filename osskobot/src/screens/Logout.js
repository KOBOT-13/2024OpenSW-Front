import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData(){
            const token = cookie.load('token');
            if(!token){
                navigate('/');
                alert("로그아웃 실패");
                return;
            }
            const headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${cookie.load('token')}`
            }
            try{
                const res = await axios.post("https://kapi.kakao.com/v1/user/logout", null, { headers: headers });
                if(res && res.data){
                    cookie.remove("token", {path : '/'});
                    navigate('/');
                }
            } catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [navigate]);
    
    return (
        <div>
            <h1>로그아웃 중입니다.</h1>
        </div>
    )
}

export default Logout;