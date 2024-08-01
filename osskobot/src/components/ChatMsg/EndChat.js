import axios from 'axios';
import cookies from 'js-cookie';

export const EndChat = async (id, characterid) => {
    const response = await axios.post(`${process.env.REACT_APP_API_ADDRESS}dialogs/endchat/`,
        {
            book: id,
            character: characterid
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.get('token')}`
            }
        }
    );
};

export default EndChat;