import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import banner from '../assets/banner.jpg'
import BookRequestModal from '../components/Modal/BookRequestModal';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    const [isBookRequestModalOpen, setIsBookRequestModalOpen] = useState(false);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            axios.get(`${process.env.REACT_APP_API_ADDRESS}books/AllBooks/`)
                .then((response) => {
                    setBooks(response.data)
                });
        }
        getBooks();
    }, [])

    return (
        <div className={styles.mainDiv}>
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
                    <button className={styles.applyBtn} onClick={() => setIsBookRequestModalOpen(true)}>
                        <strong>도서 신청하기</strong>
                    </button>
                </div>
            </div>
            <div className={styles.bookshelp}>
                <div>
                    <ul className={styles.bookFilter}>
                        <li className={styles.filter}>
                            <button className={styles.filterBtn}>
                                내 책장
                            </button>
                        </li>
                        <li className={styles.filter}>
                            <button className={styles.filterBtn}>
                                둘러보기
                            </button>
                        </li>
                    </ul>
                </div>
                <div className={styles.bookSlide}>
                    {
                        books.map((key, value) => {
                            console.log(key.cover_image);
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