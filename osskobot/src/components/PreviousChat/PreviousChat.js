import { useEffect, useState } from "react";
import { privateAxios } from "../../services/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { format } from 'date-fns';

function PreviousChat({}) {
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        privateAxios.get(`dialogs/conversation/`)
            .then(response => { 
                console.log(response.data)
                const sortedConversations = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                setConversations(sortedConversations);
            })

    }, []);

    const click = (id, characterid) => {
        navigate(`/bookclick/${id}/chatcharchoose/${characterid}/chat`)
    };

    return (
        <div>
            <h1>이전 대화</h1>
            <u1>
                {conversations.map(conversation => (

                    <li key={conversation.id} onClick={() => click(conversation.id, conversation.character)}>
                        <p>책 제목: {conversation.book_title}</p>
                        <p>대화한 등장인물: {conversation.character_name}</p>
                        <p>마지막 대화: {format(new Date(conversation.updated_at), 'yyyy-MM-dd hh:mm aa')}</p>

                    </li>
                ))}
            </u1>
        </div>
    );
};

export default PreviousChat;