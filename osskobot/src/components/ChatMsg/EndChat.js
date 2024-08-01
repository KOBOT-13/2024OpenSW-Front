import axios from 'axios';
import cookies from 'js-cookie';
import { publicAxios, privateAxios } from '../../services/axiosConfig';

export const EndChat = async (id, characterid) => {
    const response = await privateAxios.post(`dialogs/endchat/`,
        {
            book: id,
            character: characterid
        }
    );
};

export default EndChat;