import Logo from '../assets/Logo.svg'
import styles from './ServiceInfo.module.css';
import Profile from '../components/Profile/Profile';
function ServiceInfo() {
    const developerInfo = [
        {url : "https://github.com/rktlskan021", img : "https://avatars.githubusercontent.com/u/68416831?v=4", id : "@rktlskan021"},
        {url : "https://github.com/forestsol", img : "https://avatars.githubusercontent.com/u/51287968?v=4", id : "@forestsol"},
        {url : "https://github.com/ima9ine4", img : "https://avatars.githubusercontent.com/u/105336619?v=4", id : "@ima9ine4"},
        {url : "https://github.com/IamWonILuvWon", img : "https://avatars.githubusercontent.com/u/113083948?v=4", id : "@IamWonILuvWon"},
        {url : "https://github.com/coladribble", img : "https://avatars.githubusercontent.com/u/134242170?v=4", id : "@coladribble"},
    ]

    return (
        <div className={styles.mainContainer}>
            <div className={styles.infoDiv}>
                <Logo size={"15%"} />
                <p className={styles.info}>OO 웹은 어린이들을 대상으로 기획하였고, 전자기기에 익숙해져 책을 멀리하게 된 아이들을 위한 기능들로 이루어져 있습니다.</p>
            </div>
            <div className={styles.developerDiv}>
                <h1 className={styles.title}>Developer</h1>
                <div className={styles.profileDiv}>
                    {developerInfo.map((item) => {
                        return <Profile url={item.url} img={item.img} id={item.id} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default ServiceInfo;