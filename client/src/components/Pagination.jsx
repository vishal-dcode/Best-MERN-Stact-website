import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/outline';
import {ITEMS_PER_PAGE} from '../app/constants';

export default function Pagination({page, setPage, handlePage, totalItems}) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <section className="pagination-wrapper mt-4 flex items-center justify-between">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Previous
        </div>
        <div
          onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Next
        </div>
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
        <div className="line"></div>
        <div>
          <nav
            className="page_number cursor-pointer isolate inline-flex -space-x-px"
            aria-label="Pagination">
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
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
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
