import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './BookReport.module.css';
import reportForm1 from '../forms/reportForm1';
import reportForm2 from '../forms/reportForm2';
import reportForm3 from '../forms/reportForm3';
import { privateAxios } from '../services/axiosConfig';

function BookReport() {
    const naviate = useNavigate();
    const bookId = useParams('id').id;
    const selectList = [
        { id: 0, value: "양식 선택" },
        { id: 1, value: "독후감" },
        { id: 2, value: "등장인물에게 편지쓰기" },
        { id: 3, value: "뒷 내용 생각해보기" }
    ]

    const [selected, setSelected] = useState("양식 선택");
    const [formContent, setFormContent] = useState("");

    const handleSelect = (e) => {
        const selectForm = e.target.value;
        setSelected(selectForm);

        if (selectForm === "독후감") {
            setFormContent(reportForm1);
        }
        else if (selectForm === "등장인물에게 편지쓰기") {
            setFormContent(reportForm2);
        }
        else if(selectForm === "뒷 내용 생각해보기"){
            setFormContent(reportForm3);
        }
        else{
            setFormContent("");
        }
    };

    const handleContent = (e) => {
        setFormContent(e.target.value);
    }

    const onClickApply = () =>{
        privateAxios.post(`books/posts/`,
            {
                "book": bookId,
                "body": formContent
            }
        ).then((response) => {
            alert("독후감 작성이 완료되었습니다.");
            naviate(`/bookclick/${bookId}`);
        }).catch((error) =>{
            console.log(error);
        });
    }

    const onClickCancle = () =>{
        naviate(-1);
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.titleDiv}>
                <span className={styles.titleSpan}>독후감 작성</span>
                <select value={selected} onChange={handleSelect}>
                    {selectList.map((item) => {
                        return <option value={item.value} key={item.id}>
                            {item.value}
                        </option>
                    })}
                </select>
            </div>
            <div className={styles.contentDiv}>
                <textarea className={styles.contentText} value={formContent} onChange={handleContent}>
                </textarea>
            </div>
            <div className={styles.btnDiv}>
                <button className={styles.btn} onClick={onClickApply}>작성</button>
                <button className={styles.btn} onClick={onClickCancle}>취소</button>
            </div>
        </div>
    )
}

export default BookReport;