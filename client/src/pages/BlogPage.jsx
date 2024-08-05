import { useEffect, useState } from 'react';
import Loader from '../components/Loader.jsx';

export default function BlogPage() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const articlesPerPage = 12;

  useEffect(() => {
    fetch(`https://newsapi.org/v2/everything?q=tech&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
        setLoading(false);
      });
  }, []);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className="container-mx-auto px-4 py-8 min-h-[80vh] bg-white">
      <h1 className="text-center text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[12rem] font-bold leading-[1] mb-10">
        THE BLOG
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-4 gap-8 column-divider md:mx-10">
            {currentArticles.map((post, idx) => (
              <div key={idx} className="break-inside-avoid mb-8 overflow-hidden">
                <figure className="relative overflow-hidden" style={{ paddingTop: '75%' }}>
                  <img
                    src={post.urlToImage || 'https://placehold.co/640x480'}
                    alt={post.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </figure>
                <div>
                  <h2 className="text-sm mt-2">{post.author || 'Unknown Author'}</h2>
                  <p className="text-gray-600 text-base font-bold">{post.title}</p>
                </div>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 whitespace-nowrap text-sm mt-1 font-bold flex gap-1 items-center hover:gap-2 duration-100 ease-in-out">
                  Read More
                  <span className="rotate-180 translate-y-[1px]">
                    <svg width="40" height="16" viewBox="0 0 65 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 18L65 18L65 16L10 16L10 18Z" fill="blue" />
                      <path
                        d="M9 16C10.1819 16 11.3522 16.2328 12.4442 16.6851C13.5361 17.1374 14.5282 17.8003 15.364 18.636C16.1997 19.4718 16.8626 20.4639 17.3149 21.5558C17.7672 22.6478 18 23.8181 18 25L16.0178 25C16.0178 24.0784 15.8363 23.1658 15.4836 22.3144C15.1309 21.463 14.614 20.6893 13.9623 20.0377C13.3107 19.386 12.537 18.8691 11.6856 18.5164C10.8342 18.1637 9.92159 17.9822 9 17.9822L9 16Z"
                        fill="blue"
                      />
                      <path
                        d="M18 9C18 11.3869 17.0518 13.6761 15.364 15.364C13.6761 17.0518 11.3869 18 9 18L9 16.0178C10.8612 16.0178 12.6462 15.2784 13.9623 13.9623C15.2784 12.6462 16.0178 10.8612 16.0178 9L18 9Z"
                        fill="blue"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            ))}
          </section>

          <div className="mt-8 flex items-center justify-between">
            <div className="page_count text-sm text-gray-700 whitespace-nowrap">
              Showing {(currentPage - 1) * articlesPerPage + 1} to{' '}
              {currentPage * articlesPerPage > articles.length ? articles.length : currentPage * articlesPerPage} of{' '}
              {articles.length} results
            </div>

            <div className="w-fit flex rounded-full border border-black overflow-hidden">
              {Array.from({ length: Math.ceil(articles.length / articlesPerPage) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-5 border-l border-black py-2 ${
                    currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
                  }`}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
