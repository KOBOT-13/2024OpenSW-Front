import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import cookies from 'js-cookie';
import CustomModal from '../components/Modal/CheckModal';

function Logout() {
    const navigate = useNavigate();

    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [isLogout, setIsLogout] = useState(undefined);

    useEffect(() => {
        if(isLogout){
            const logoutAPI = async() => {
                axios.post(`${process.env.REACT_APP_API_ADDRESS}users/auth/logout/`, 
                    {},
                    {
                        headers:{
                            'Authorization' : `Bearer ${cookies.get('token')}`
                        }
                    }
                ).then((response) => {
                    console.log(response);
                    cookies.remove('token');
                    cookies.remove('refresh_token');
                    cookies.remove('username');
                    cookies.remove('pk');
                    navigate('/');
                    alert("로그아웃 되었습니다.");
                }).catch((error) => {
                    console.log(error);
                })
            }
            logoutAPI();
        }
        else if(isLogout === false){
            console.log(isLogout);
            navigate('/');
        }
    }, [isLogout]);
    
    return (
        <div>
            <CustomModal isOpen={modalIsOpen} onRequestClose={setModalIsOpen} setIsDel={setIsLogout} msg={"정말로 로그아웃 하시겠습니까?"} />
        </div>
    )
}

export default Logout;