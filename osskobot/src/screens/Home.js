import styles from './Home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import banner from '../assets/banner.jpg'
import BookRequestModal from '../components/Modal/BookRequestModal';
import { useEffect, useState } from 'react';
import { publicAxios, privateAxios } from '../services/axiosConfig';
import cookies from 'js-cookie';
import SubHeader from '../components/Header/SubHeader';

function Home() {
    const navigate = useNavigate();
    const [isBookRequestModalOpen, setIsBookRequestModalOpen] = useState(false);
    const [books, setBooks] = useState([]);

    const filters = [
        { id: 1, text: '내 책장' },
        { id: 2, text: '둘러보기' },
    ];

    const onClickApplyBtn = async () => {
        const token = cookies.get('token');
        if(token){
            await privateAxios.post(`users/auth/token/verify/`,
                {
                    token: token
                }
            ).then((response) => {
                setIsBookRequestModalOpen(true);
            }).catch((error) => {
                setIsBookRequestModalOpen(true);
            })
        } else{
            alert("로그인을 해주세요.");
            navigate('/login');
        }
    } 

    useEffect(() => {
        const getBooks = async () => {
            publicAxios.get(`books/AllBooks/`)
                .then((response) => {
                    setBooks(response.data)
                })
                .catch((error) => {
                    console.log(error);
                    alert("로그인을 해주세요.");
                });
        }
        getBooks();
    }, [])

    return (
        <div className={styles.mainDiv}>
            <SubHeader/>
            <div className={styles.banner}>
                <div className={styles.imgDiv}>
                    <img className={styles.bannerImg} alt='이미지' src={banner} />
                </div>
                <div className={styles.buttonDiv}>
                    <Link className={styles.serviceLink} to="/serviceinfo">
                        <button className={styles.serviceBtn}>

                            <strong>서비스 소개</strong>
                        </button>
                    </Link>
                    <button className={styles.applyBtn} onClick={onClickApplyBtn}>
                        <strong>도서 신청하기</strong>
                    </button>
                </div>
            </div>
            <div className={styles.bookshelp}>
                <div>
                    <ul className={styles.bookFilter}>
                        {filters.map(filter => (
                            <li className={styles.filter} key={filter.id}>
                                <button className={styles.filterBtn}>
                                    {filter.text}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.bookSlide}>
                    {
                        books.map((key, value) => {
                            return <Link to={`/bookclick/${key.id}`}>
                                <img className={styles.bookImg} alt='책' src={`${process.env.REACT_APP_ADDRESS}${key.cover_image}/`} />
                            </Link>
                        })
                    }
                </div>
            </div>
            <BookRequestModal isOpen={isBookRequestModalOpen} onRequestClose={setIsBookRequestModalOpen} />
        </div>
    )
}

export default Home;