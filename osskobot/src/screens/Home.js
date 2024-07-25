import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import banner from '../assets/banner.jpg'
import BookRequestModal from '../components/Modal/BookRequestModal';
import { useState } from 'react';

function Home() {
    const [isBookRequestModalOpen, setIsBookRequestModalOpen] = useState(true);

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
                    <div className={styles.book}>
                        <Link to="/bookclick/1">
                            <img className={styles.bookImg} alt='책' src="https://image.yes24.com/goods/128199845/XL" />
                        </Link>
                        <Link to="/bookclick/1">
                            <img className={styles.bookImg} alt='책' src="https://image.yes24.com/goods/128199845/XL" />
                        </Link>
                        <Link to="/bookclick/1">
                            <img className={styles.bookImg} alt='책' src="https://image.yes24.com/goods/128199845/XL" />
                        </Link>
                        <Link to="/bookclick/1">
                            <img className={styles.bookImg} alt='책' src="https://image.yes24.com/goods/128199845/XL" />
                        </Link>
                        <Link to="/bookclick/1">
                            <img className={styles.bookImg} alt='책' src="https://image.yes24.com/goods/128199845/XL" />
                        </Link>
                    </div>
                </div>
            </div>
            <BookRequestModal isOpen={isBookRequestModalOpen} onRequestClose={setIsBookRequestModalOpen} />
        </div>
    )
}

export default Home;