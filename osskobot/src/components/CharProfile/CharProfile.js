import profile from '../../assets/profile.png';
import styles from './CharProfile.module.css';
function CharProfile({img, type, name}){
    const Name = "이재영";
    return (
        <div className={styles.profileDiv}>
            <button className={styles.profileBtn}>
                <img className={styles.profileImg} src={profile}/>
            </button>
            <p>{Name}</p>
        </div>
    )
};

export default CharProfile;