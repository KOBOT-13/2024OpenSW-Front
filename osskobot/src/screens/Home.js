import styles from './Home.module.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className={styles.mainDiv}>
            <div className={styles.banner}>
                <div className={styles.imgDiv}>
                    <img className={styles.bannerImg} src='https://ci3.googleusercontent.com/meips/ADKq_NZWpXCcwS5WLxUAJUoR0x0UwOHOEtHQao9UtwGuDZsw8CgPZ6SjyAA5PxXcd3g192Hdik48hSLWPVucde9ovYmtItnDxGXqEORmaoC9-C87lcU=s0-d-e1-ft#https://img2.stibee.com/1863_2278046_1720571255588408847.png' />
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
                        <Link to="/book">
                            <img className={styles.bookImg} src="https://image.yes24.com/goods/128199845/XL" />
                        </Link>
                        <Link to="/book">
                            <img className={styles.bookImg} src="https://image.yes24.com/goods/128199845/XL" />
                        </Link>
                        <Link to="/book">
                            <img className={styles.bookImg} src="https://image.yes24.com/goods/128199845/XL" />
                        </Link>
                        <Link to="/book">
                            <img className={styles.bookImg} src="https://image.yes24.com/goods/128199845/XL" />
                        </Link>
                        <Link to="/book">
                            <img className={styles.bookImg} src="https://image.yes24.com/goods/128199845/XL" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;