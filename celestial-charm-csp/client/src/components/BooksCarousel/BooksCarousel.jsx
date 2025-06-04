import React, { useEffect, useState } from 'react';
import './BooksCarousel.css';

const genres = ['fantasy', 'romance', 'mystery', 'thriller', 'horror', 'dystopian', 'comedy'];

export default function BooksCarousel() {
    const [booksByGenre, setBooksByGenre] = useState({});

    useEffect(() => {
        const fetchBooks = async () => {
            const results = {};
            for (const genre of genres) {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}+young+adult&orderBy=relevance&maxResults=40&key=AIzaSyDxAG1ccyzeax9c9YITjs1sQpzCbrQXy4I`
            );
            const data = await response.json();
            results[genre] = data.items || [];
            }
            setBooksByGenre(results);
        };

        fetchBooks();
    }, []);

    // const handleRedirect = (book) => {
    //     const link = book.volumeInfo.infoLink || '#';
    //     window.open(link, '_blank');
    // };

    const getAmazonLink = (book) => {
        const title = book.volumeInfo?.title || '';
        const author = book.volumeInfo?.authors?.[0] || '';
        const searchQuery = `${title} ${author}`;
        return `https://www.amazon.com/s?k=${encodeURIComponent(searchQuery)}&i=stripbooks`;
    };


        
    return (
        <div className="books-carousel-wrapper">
            <h1 className="book-title-heading">YA Book Recommendations</h1>
                {genres.map((genre) => {
                    const books = booksByGenre[genre] || [];
                    return (
                    <div key={genre} className="genre-section">
                        <h2 className="genre-heading">{genre.toUpperCase()}</h2>
                        <p className="meta-count">Showing 1–{books.length} of {books.length} results</p>
                        <div
                        className="carousel-track"
                        onMouseEnter={(e) => e.currentTarget.classList.add('paused')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('paused')}
                        >
                        <div className="carousel-row">
                            {books.map((book, index) => {
                            const uniqueKey = `${book.id}-${index}`;
                            return (
                                <a
                                    key={`${uniqueKey || book.etag}`}
                                    href={getAmazonLink(book)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="book-card">
                                    <img
                                        src={book.volumeInfo.imageLinks?.thumbnail}
                                        alt={book.volumeInfo.title}
                                        className="book-cover"/>
                                    <div className="book-title">{book.volumeInfo.title}</div>
                                    <div className="book-author">
                                        {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}
                                    </div>
                                    <div className="book-published-date">
                                        {book.volumeInfo.publishedDate || 'Unknown Date'}
                                    </div>
                                    <div className="book-page-count">
                                        {book.volumeInfo.pageCount ? `${book.volumeInfo.pageCount} pages` : 'Page count not available'}
                                    </div>
                                    
                                </a>
                            );
                            })}
                        </div>
                        </div>
                    </div>
                    );
                })}
        </div>
    );
};