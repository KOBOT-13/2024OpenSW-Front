import cookies from 'js-cookie';
import { format } from 'date-fns';
import { privateAxios } from './axiosConfig';

function postReadBook(bookId) {
    const readBooks = JSON.parse(cookies.get("read_books"));
    if (!readBooks.includes(parseInt(bookId))) {
        privateAxios.post(`books/user-read-book-list/add/`,
            {
                "book": bookId,
                "read_date": format(new Date(), "yyyy-MM-dd")
            }
        ).then(() => {
            cookies.set("read_books", JSON.stringify([...readBooks, parseInt(bookId)]));
            console.log(cookies.get("read_books"));
        }).catch((error) => {
            console.log(error);
        });
    }
}

export default postReadBook;
