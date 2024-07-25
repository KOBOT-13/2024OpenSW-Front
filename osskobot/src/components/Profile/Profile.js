import styles from './Profile.module.css';

function Profile({img, id, url}){
    const onClickOpenNewWab = () => {
        window.open(url, "_blank", "noopener, noreferrer");
    }
    return(
        <div className={styles.mainContanier} onClick={onClickOpenNewWab}>
            <img className={styles.profileImg} src={img}/>
            <p>{id}</p>
        </div>
    )
}

export default Profile;