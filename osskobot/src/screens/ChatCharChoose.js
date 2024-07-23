import CharProfile from "../components/CharProfile/CharProfile";
import styles from './ChatCharChoose.module.css';
function CharCharChoose() {
    return (
        <div className={styles.charProfileDiv}>
            <CharProfile mode={2}/>
            <CharProfile mode={2}/>
            <CharProfile mode={2}/>
            <CharProfile mode={2}/>
            <CharProfile mode={2}/>
        </div>
    )
}

export default CharCharChoose;