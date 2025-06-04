import React, { useEffect, useState } from 'react';
import './BooksCarousel.css';

const GENRES = ['fantasy', 'romance', 'mystery', 'thriller', 'horror', 'dystopian'];

export default function BooksCarousel() {
    const [booksByGenre, setBooksByGenre] = useState({});

    useEffect(() => {
            GENRES.forEach((genre) => {
            fetch(
                `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}+young-adult&orderBy=relevance&printType=books&maxResults=20&filter=paid-ebooks&key=AIzaSyDxAG1ccyzeax9c9YITjs1sQpzCbrQXy4I`
            )
                .then((res) => res.json())
                .then((data) => {
                setBooksByGenre((prev) => ({
                    ...prev,
                    [genre]: data.items || [],
                }));
                });
            });
        }, []);

        const handleRedirect = (book) => {
            const link = book.volumeInfo.infoLink || '#';
            window.open(link, '_blank');
        };
        
    return (
        <div className="books-carousel-wrapper">
            <h1 className="book-title">YA Book Recommendations</h1>
        {GENRES.map((genre) => (
            <div key={genre} className="genre-section">
            <h2 className="genre-heading">{genre.toUpperCase()}</h2>
            <div className="carousel-track" onMouseEnter={(e) => e.currentTarget.classList.add('paused')} onMouseLeave={(e) => e.currentTarget.classList.remove('paused')}>
                <div className="carousel-row">
                {(booksByGenre[genre] || []).map((book) => {
                    const image = book.volumeInfo.imageLinks?.thumbnail;
                    return (
                    <div className="book-card" key={book.id} onClick={() => handleRedirect(book)}>
                        <img src={image} alt={book.volumeInfo.title} />
                        <p>{book.volumeInfo.title}</p>
                    </div>
                    );
                })}
                </div>
            </div>
            </div>
        ))}
        </div>
    );
};