import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';


function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData(){
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