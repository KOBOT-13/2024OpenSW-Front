import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import banner from '../assets/banner.jpg'

function Home() {
    return (
        <div className={styles.mainDiv}>
            <div className={styles.banner}>
                <div className={styles.imgDiv}>
                    <img className={styles.bannerImg} alt='이미지' src={banner} />
                </div>
                <div className={styles.buttonDiv}>
                    <button className={styles.serviceBtn}>
                        <Link className={styles.serviceLink} to="/">
                            <strong>서비스 소개</strong>
                        </Link>
                    </button>
                    <button className={styles.applyBtn}>
                        <Link className={styles.applyLink} to="/">
                            <strong>도서 신청하기</strong>
                        </Link>
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
                        <Link to="/bookclick">
                            <img className={styles.bookImg} alt='책' src="https://image.yes24.com/goods/128199845/XL" />
                        </Link>
                        <Link to="/bookclick">
                            <img className={styles.bookImg} alt='책' src="https://image.yes24.com/goods/128199845/XL" />
                        </Link>
                        <Link to="/bookclick">
                            <img className={styles.bookImg} alt='책' src="https://image.yes24.com/goods/128199845/XL" />
                        </Link>
                        <Link to="/bookclick">
                            <img className={styles.bookImg} alt='책' src="https://image.yes24.com/goods/128199845/XL" />
                        </Link>
                        <Link to="/bookclick">
                            <img className={styles.bookImg} alt='책' src="https://image.yes24.com/goods/128199845/XL" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;