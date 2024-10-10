import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { USERS_API } from '../../api';
import { MdFavorite } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaReadme } from 'react-icons/fa';
import { styles } from '../../styles';

function Read() {
    const [readBooks, setReadBooks] = useState([])
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const res = await axios.get(`${USERS_API}/${userId}`);
            setUser(res.data);
            setReadBooks(res.data.read)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser()
    }, [])


    const addFav = async (book) => {
        if (!user) return;

        try {
            const isBookFav = user.read.find(favBook => favBook.title === book.title)
            if (!isBookFav) {
                const updatedReadBooks = [...user.read, book];
                setUser({ ...user, read: updatedReadBooks });
                await axios.patch(`${USERS_API}/${userId}`, {
                    read: updatedReadBooks
                });
            } else {
                const updatedReadBooks = user.read.filter(favBook => favBook.rank != book.rank)
                setUser({ ...user, read: updatedReadBooks });
                await axios.patch(`${USERS_API}/${userId}`, {
                    read: updatedReadBooks
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addRead = async (book) => {
        if (!user) return;

        try {
            const isBookFav = user.read.find(favBook => favBook.title === book.title)
            if (!isBookFav) {
                const updatedFavBooks = [...user.read, book];
                setUser({ ...user, read: updatedFavBooks });
                await axios.patch(`${USERS_API}/${userId}`, {
                    read: updatedFavBooks
                });
            } else {
                const updatedFavBooks = user.read.filter(favBook => favBook.rank != book.rank)
                setUser({ ...user, read: updatedFavBooks });
                await axios.patch(`${USERS_API}/${userId}`, {
                    read: updatedFavBooks
                });
            }
        } catch (error) {
            console.log(error);
        }
    };


    const checkFav = (bookRank) => {
        if (user.favorites.find(book => book.rank == bookRank)) {
            return true
        }
        return false
    }

    const checkRead = (bookRank) => {
        if (user.read.find(book => book.rank == bookRank)) {
            return true
        }
        return false
    }

    // if (readBooks.length === 0) {
    //     return (
    //         <div className='w-full flex justify-center items-center mx-auto'>
    //             <span className="loading loading-spinner loading-md"></span>
    //         </div>
    //     );
    // }

    return (
        <main className='py-10'>
            <div className='max-w-[1200px] mx-auto'>
                <h1 className='text-3xl sm:text-4xl font-bold mx-auto text-center '>Read</h1>
                <div className='mt-10 gap-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto'>
                    {readBooks.length !== 0 ? (
                        readBooks.map((book, index) => (
                            <div key={index} className="card bg-base-100 w-96 shadow-xl mx-auto border border-slate-800">
                                <div className='max-h-[400px] pt-5 overflow-hidden'>
                                    <img className='h-full w-full object-contain rounded-md'
                                        src={book.book_image}
                                        alt="Book Cover" />
                                </div>
                                <div className="card-body">
                                    <h2 className="card-title">{book.title}</h2>
                                    <p>{book.author}</p>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-3'>
                                            <div title='Add to favorite' onClick={() => addFav(book)} className={`${checkFav(book.rank) ? "text-red-500 fill-current" : ""} ${styles.transition400} hover:text-red-500 cursor-pointer`}>
                                                <MdFavorite size={20} />
                                            </div>
                                            <div title='Add to read' onClick={() => addRead(book)} className={`${checkRead(book.rank) ? "text-blue-500 fill-current" : ""} ${styles.transition400} hover:text-blue-500 cursor-pointer`}>
                                                <FaReadme size={20} />
                                            </div>
                                        </div>
                                        <Link to={`/book/${book.rank}`} className="btn btn-primary" >Details</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='mx-auto'>
                            <p>No book found</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

export default Read