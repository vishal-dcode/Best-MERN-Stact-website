import {ITEMS_PER_PAGE} from '../app/constants';

export default function Pagination({page, setPage, handlePage, totalItems}) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <section className="pagination-wrapper flex items-center justify-between">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
          className="pagination_prev">
          Previous
        </button>
        <button
          onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
          className="pagination_prev">
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="page_count text-sm text-gray-700 whitespace-nowrap">
          Showing{' '}
          <span className="font-medium">{(page - 1) * ITEMS_PER_PAGE + 1}</span>{' '}
          to{' '}
          <span className="font-medium">
            {page * ITEMS_PER_PAGE > totalItems
              ? totalItems
              : page * ITEMS_PER_PAGE}
          </span>{' '}
          of <span className="font-medium">{totalItems}</span> results
        </p>
        <div className="line w-full"></div>
        <div>
          <nav
            className="page_number cursor-pointer isolate inline-flex -space-x-px"
            aria-label="Pagination">
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Previous</span>
              <svg
                className="rotate-90 mx-1.5"
                width="15"
                height="9"
                viewBox="0 0 15 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.3949 1.90518L12.7598 1.30146L7.26315 6.84275L1.61318 1.43083L1 2.03455L7.26315 8.07175L13.3949 1.90518Z"
                  fill="black"
                  stroke="black"
                />
              </svg>
            </div>

            {Array.from({length: totalPages}).map((el, index) => (
              <div
                key={index}
                onClick={(e) => handlePage(index + 1)}
                aria-current="page"
                className={`page_single_number relative cursor-pointer z-10 inline-flex items-center ${
                  index + 1 === page
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400'
                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                {index + 1}
              </div>
            ))}

            <div
              onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 focus:outline-offset-0">
              <span className="sr-only">Next</span>
              <svg
                className="rotate-270 mx-1.5"
                width="15"
                height="9"
                viewBox="0 0 15 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.3949 1.90518L12.7598 1.30146L7.26315 6.84275L1.61318 1.43083L1 2.03455L7.26315 8.07175L13.3949 1.90518Z"
                  fill="black"
                  stroke="black"
                />
              </svg>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
