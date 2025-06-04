import './Books.css';
import Navbar3 from '../../../components/NavBars/Navbar3';
import Footer from '../../../components/Footer/Footer';
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const genres = [
    { label: 'YA Fantasy', subject: 'fantasy', query: 'young+adult+fantasy', orderBy: 'relevance' },
    { label: 'YA Romance', subject: 'romance', query: 'young+adult+romance', orderBy: 'relevance' },
    { label: 'YA Mystery', subject: 'mystery', query: 'young+adult+mystery', orderBy: 'relevance' },
    { label: 'YA Dystopian', subject: 'dystopian', query: 'young+adult+dystopian', orderBy: 'relevance' },
    { label: 'YA Thriller', subject: 'thriller', query: 'young+adult+thriller', orderBy: 'relevance' },
    { label: 'YA Horror', subject: 'horror', query: 'young+adult+horror', orderBy: 'relevance' },
];
// {book.volumeInfo.imageLinks?.thumbnail ||
//                                 'https://via.placeholder.com/128x195.png?text=No+Cover'}
//                                     alt={book.volumeInfo.title || 'Book'}


export default function Books() {
    const [booksByGenre, setBooksByGenre] = useState({});
    const scrollRefs = useRef({});
    const carouselRefs = useRef({});
    const intervalRefs = useRef({});
    // const title = encodeURIComponent(book.volumeInfo.title);
    // const author = encodeURIComponent(book.volumeInfo.authors?.[0] || '');
    // const amazonLink = `https://www.amazon.com/s?k=${title}+${author}&i=stripbooks`;


    // useEffect(() => {
    //     const fetchBooks = async () => {
    //     const newBooks = {};
    //     for (const genre of genres) {
    //         try {
    //         const res = await fetch(
    //             `https://www.googleapis.com/books/v1/volumes?q=${genre.query}&orderBy=${genre.orderBy}&maxResults=20`
    //         );
    //         const data = await res.json();
    //         newBooks[genre.label] = data.items || [];
    //         } catch (err) {
    //         console.error(`Error fetching ${genre.label}:`, err);
    //         newBooks[genre.label] = [];
    //         }
    //     }
    //     setBooksByGenre(newBooks);
    //     };
    //     fetchBooks();
    // }, []);

    useEffect(() => {
        const fetchTopRatedBooks = async (query, genre) => {
            const res = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=relevance&maxResults=40`
            );
            const data = await res.json();

            const topBooks = data.items?.filter(
            (book) =>
                book.volumeInfo?.averageRating &&
                book.volumeInfo.averageRating >= 3.5 &&
                book.volumeInfo.imageLinks?.thumbnail
            ).slice(0, 15); // fewer items = smoother infinite loop


            setBooksByGenre((prev) => ({ ...prev, [genre]: topBooks }));
            };

        genres.forEach(({ query, label }) => fetchTopRatedBooks(query, label));
    }, []);

    // useEffect(() => {
    //     const scrollIntervals = [];

    //     genres.forEach(({ label }) => {
    //         const scrollContainer = scrollRefs.current[label];
    //         if (!scrollContainer) return;

    //         const interval = setInterval(() => {
    //         if (!scrollContainer || scrollContainer.matches(':hover')) return;

    //         scrollContainer.scrollLeft += 1;

            
    //         if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
    //             scrollContainer.scrollLeft = 0;
    //         }
    //         }, 30);

    //         scrollIntervals.push(interval);
    //     });

    //     return () => {
    //         scrollIntervals.forEach(clearInterval);
    //     };
    // }, [booksByGenre]);

    // useEffect(() => {
    //     const scrollIntervals = [];

    //     genres.forEach(({ label }) => {
    //         const container = scrollRefs.current[label];
    //         if (!container) return;

    //         const scroll = () => {
    //         if (container.matches(':hover')) return;

    //         container.scrollLeft += 1;

    //         if (container.scrollLeft >= container.scrollWidth / 2) {
    //             container.scrollLeft = 0;
    //         }

    //         requestAnimationFrame(scroll);
    //         };

    //         const id = requestAnimationFrame(scroll);
    //         scrollIntervals.push(id);
    //     });

    //     return () => {
    //         scrollIntervals.forEach(cancelAnimationFrame);
    //     };
    // }, [booksByGenre]);

    // useEffect(() => {
    //     genres.forEach((genre) => {
    //         const carousel = carouselRefs.current[genre.label];
    //         if (!carousel) return;

    //         const scroll = () => {
    //             if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
    //             carousel.scrollTo({ left: 0, behavior: 'smooth' });
    //             } else {
    //             carousel.scrollBy({ left: 1, behavior: 'smooth' });
    //             }
    //         };

    //         let interval = setInterval(scroll, 30);
    //         intervalRefs.current[genre.label] = interval;

    //         const pause = () => clearInterval(intervalRefs.current[genre.label]);
    //         const resume = () => {
    //             intervalRefs.current[genre.label] = setInterval(scroll, 30);
    //         };

    //         carousel.addEventListener('mouseenter', pause);
    //         carousel.addEventListener('mouseleave', resume);
    //         });

    //     return () => {
    //     Object.values(intervalRefs.current).forEach(clearInterval);
    //     };
    // }, [booksByGenre]);

    useEffect(() => {
    const intervals = [];

        genres.forEach(({ label }) => {
            const container = scrollRefs.current[label];
            if (!container) return;

            const scrollSpeed = 1;
            const interval = setInterval(() => {
            if (!container || container.matches(':hover')) return;

            container.scrollLeft += scrollSpeed;

            const scrollEnd = container.scrollWidth / 2;
            if (container.scrollLeft >= scrollEnd) {
                container.scrollLeft = 0;
            }
            }, 16); // ~60fps

            intervals.push(interval);
        });

        return () => intervals.forEach(clearInterval);
    }, [booksByGenre]);



    const handleRedirect = (book) => {
        const title = encodeURIComponent(book.volumeInfo.title);
        const author = encodeURIComponent(book.volumeInfo.authors?.[0] || '');
        const amazonLink = `https://www.amazon.com/s?k=${title}+${author}&i=stripbooks`;
        window.open(amazonLink, '_blank');
    };


    return (
        <>
            <Navbar3 />
            <div className="book-page">
                <h1 className="book-title">YA Book Recommendations</h1>
                {/* {genres.map((genre) => (
                    <div key={genre.label} className="genre-section">
                    <h2>{genre.label}</h2>
                    <div className="carousel-container">
                        <motion.div
                        className="carousel"
                        ref={(el) => (carouselRefs.current[genre.label] = el)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}>
                        {booksByGenre[genre.label]?.map((book, i) => (
                            <motion.div
                            key={i}
                            className="book-card"
                            onClick={() => handleRedirect(book)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}>
                                <a
                                href={`https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}+${encodeURIComponent(book.volumeInfo.authors?.[0] || '')}&i=stripbooks`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="book-card">
                                <motion.img
                                    src={book.volumeInfo.imageLinks?.thumbnail ||
                                'https://via.placeholder.com/128x195.png?text=No+Cover'}
                                    alt={book.volumeInfo.title || 'Book'}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}/>
                                <p>{book.volumeInfo.title}</p>
                                </a>
                            </motion.div>
                        ))}
                        <div style={{ flex: '0 0 1px' }} />
                        </motion.div>
                        <div
                        className="carousel"
                        ref={(el) => (scrollRefs.current[label] = el)}
                        >
                        {[...booksByGenre[label], ...booksByGenre[label]]?.map((book, index) => (
                            <div
                            key={`${book.id}-${index}`}
                            className="book-card"
                            onClick={() => handleRedirect(book)}
                            >
                            <img
                                src={book.volumeInfo.imageLinks?.thumbnail ||
                                'https://via.placeholder.com/128x195.png?text=No+Cover'}
                                alt={book.volumeInfo.title || 'Book'}
                            />
                            <p>{book.volumeInfo.title}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>
                ))} */}
                {genres.map(({ label }) => (
                <div className="genre-section" key={label}>
                <h2>{label}</h2>
                <div className="carousel-container">
                    <div className="carousel" ref={(el) => (scrollRefs.current[label] = el)}>
                    {[...Array(2)].flatMap(() => booksByGenre[label] || []).map((book, index) => (
                        <div
                        key={`${book.id}-${index}`}
                        className="book-card"
                        onClick={() => handleRedirect(book)}
                        >
                        <img
                            src={book.volumeInfo.imageLinks.thumbnail  ||
                                'https://via.placeholder.com/128x195.png?text=No+Cover'}
                            alt={book.volumeInfo.title || 'Book'}
                        />
                        <p>{book.volumeInfo.title}</p>
                        {book.volumeInfo.averageRating && (
                            <div className="rating">⭐ {book.volumeInfo.averageRating.toFixed(1)}</div>
                        )}
                        </div>
                    ))}
                    </div>

                </div>
                </div>
            ))}
                </div>
            <Footer />
        </>
    );
}