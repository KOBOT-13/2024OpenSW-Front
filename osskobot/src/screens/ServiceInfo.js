import AiLogo from '../assets/AiLogo';
import styles from './ServiceInfo.module.css';

function ServiceInfo() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.infoDiv}>
                <AiLogo size={"15%"} />
                <p className={styles.info}>OO 웹은 어린이들을 대상으로 기획하였고, 전자기기에 익숙해져 책을 멀리하게 된 아이들을 위한 기능들로 이루어져 있습니다.</p>
            </div>
            <div className={styles.developerDiv}>
                <h1 className={styles.title}>Developer</h1>

            </div>
        </div>
    )
}

export default ServiceInfo;