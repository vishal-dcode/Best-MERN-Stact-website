// * IMPORTS
import React, {useState, Fragment, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
// * UI
import {Dialog, Disclosure, Menu, Transition} from '@headlessui/react';
// * CONTAINERS
import {ITEMS_PER_PAGE, DISCOUNTED_PRICE} from '../../../app/constants';
// * REDUX
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
  selectBrands,
  selectCategories,
  selectProductListStatus,
  selectTotalItems,
} from '../../product/productSlice';
import Loader from '../../../components/Loader';
import Pagination from '../../../components/Pagination';

const sortOptions = [
  {name: 'Best Rating', sort: 'rating', order: 'desc', current: false},
  {name: 'Price: Low to High', sort: 'price', order: 'asc', current: false},
  {name: 'Price: High to Low', sort: 'price', order: 'desc', current: false},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const totalItems = useSelector(selectTotalItems);
  const status = useSelector(selectProductListStatus);

  const filters = [
    {
      id: 'category',
      name: 'Category',
      options: categories,
    },
    {
      id: 'brand',
      name: 'Brands',
      options: brands,
    },
  ];

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const handleFilter = (e, section, option) => {
    console.log(e.target.checked);
    const newFilter = {...filter};
    // TODO : on server it will support multiple categories
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    console.log({newFilter});

    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const sort = {_sort: option.sort, _order: option.order};
    console.log({sort});
    setSort(sort);
  };

  const handlePage = (page) => {
    console.log({page});
    setPage(page);
  };

  useEffect(() => {
    const pagination = {_page: page, _limit: ITEMS_PER_PAGE};
    dispatch(
      fetchProductsByFiltersAsync({filter, sort, pagination, admin: true})
    );
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <div className="bg-white">
      <div>
        {/* //! ------------------------------ MOBILE FILTER ----------------------------- */}
        <MobileFilter
          handleFilter={handleFilter}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={filters}
        />

        <main>
          <div className="flex items-center">
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6"
              onClick={() => setMobileFiltersOpen(true)}>
              <span className="sr-only">Filters</span>
            </button>
          </div>

          <section
            className="product_list-wrapper"
            aria-labelledby="products-heading">
            <div className="product_list-ctr">
              {/* //! ------------------------------ DESKTOP FILTER ----------------------------- */}
              <DesktopFilter handleFilter={handleFilter} filters={filters} />

              {/* //! ------------------------------ MAIN ----------------------------- */}
              {status === 'pending' && <Loader />}
              <div className="product_list">
                {/* //!  SORT  */}
                <div className="sorting-wrapper">
                  <span></span>
                  <div className="flex align-middle">
                    <Menu as="div">
                      <Menu.Button className="sorting-ctr group gap-1 inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        <strong>Sort by:</strong> High to Low
                      </Menu.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {sortOptions.map((option) => (
                              <Menu.Item key={option.name}>
                                {({active}) => (
                                  <p
                                    onClick={(e) => handleSort(e, option)}
                                    className={classNames(
                                      option.current
                                        ? 'font-medium text-gray-900'
                                        : 'text-gray-500',
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm'
                                    )}>
                                    {option.name}
                                  </p>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    {/* //! MOBILE FILTER */}
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="hidden -m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                        onClick={() => setMobileFiltersOpen(true)}>
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M23 0H3C1.35 0 0 1.35 0 3V4.17C0 4.97 0.31 5.73 0.88 6.29L9 14.41V25C9 25.32 9.15 25.62 9.41 25.81C9.59 25.94 9.79 26 10 26C10.1 26 10.21 25.98 10.31 25.95L14.95 24.4C16.18 24 17 22.85 17 21.56V14.41L25.12 6.29C25.69 5.73 26 4.97 26 4.17V3C26 1.35 24.65 0 23 0Z"
                            fill="black"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                {/* //!  PRODUCT GRID  */}
                <ProductGrid products={products} />

                {/* //! ------------------------------ PAGINATION ----------------------------- */}
                <Pagination
                  page={page}
                  setPage={setPage}
                  handlePage={handlePage}
                  totalItems={totalItems}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full">
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}>
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_25_281)">
                      <path
                        d="M6.36395 6.36396L19.0919 19.0919"
                        stroke="black"
                        strokeWidth="2"
                      />
                      <path
                        d="M6.36394 19.0919L19.0919 6.36396"
                        stroke="black"
                        strokeWidth="2"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_25_281">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(12.7279) rotate(45)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6">
                    {({open}) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <svg
                                  width="13"
                                  height="2"
                                  viewBox="0 0 18 2"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <line
                                    y1="1"
                                    x2="18"
                                    y2="1"
                                    stroke="black"
                                    strokeWidth="2.5"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <line
                                    y1="9"
                                    x2="18"
                                    y2="9"
                                    stroke="black"
                                    strokeWidth="2.5"
                                  />
                                  <line
                                    x1="9"
                                    y1="18"
                                    x2="9"
                                    y2="4.37114e-08"
                                    stroke="black"
                                    strokeWidth="2.5"
                                  />
                                </svg>
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center">
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e) =>
                                    handleFilter(e, section, option)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500">
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function DesktopFilter({handleFilter, filters}) {
  return (
    <form className="product_filter-wrapper">
      {filters.map((section) => (
        <Disclosure as="div" key={section.id} className="product_filter-ctr">
          {({open}) => (
            <>
              <Disclosure.Button className="filter_menu">
                <span>{section.name}</span>
                <span>
                  {open ? (
                    <svg
                      width="13"
                      height="2"
                      viewBox="0 0 18 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <line
                        y1="1"
                        x2="18"
                        y2="1"
                        stroke="black"
                        strokeWidth="2.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <line
                        y1="9"
                        x2="18"
                        y2="9"
                        stroke="black"
                        strokeWidth="2.5"
                      />
                      <line
                        x1="9"
                        y1="18"
                        x2="9"
                        y2="4.37114e-08"
                        stroke="black"
                        strokeWidth="2.5"
                      />
                    </svg>
                  )}
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="filter_items-ctr">
                <div className="">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="filter_items">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) => handleFilter(e, section, option)}
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}

function ProductGrid({products}) {
  return (
    <section className="product_grid-ctr mt-4 mb-2">
      {products.map((product) => (
        <Link
          className="product_wrapper relative"
          to={`/product-detail/${product.id}`}
          key={product.id}>
          {product.stock <= 0 && (
            <div>
              <p className="out_of_stock">out of stock</p>
            </div>
          )}
          <Link
            to={`/admin/product-form/edit/${product.id}`}
            className="edit_product">
            Edit Product
          </Link>
          {product.deleted && (
            <p className="deleted_product">product deleted</p>
          )}
          <div
            className={`product_card ${
              product.stock === 0 ? 'product-not-allowed' : ''
            }  group relative border-solid`}>
            <div className="product_img min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden lg:aspect-none lg:h-60">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="product_detail">
              <h3 className="text-gray-700 font-black">{product.title}</h3>
              <p className="my-1 text-sm text-gray-500 line-clamp-1">
                {product.description}
              </p>
              <div className="product_price flex gap-2">
                <h5 className="block font-medium text-gray-900">
                  ${DISCOUNTED_PRICE(product)}
                </h5>
                <p className=" block line-through font-medium text-gray-400">
                  ${product.price}
                </p>
                <h6 className=" block  font-medium text-gray-400">
                  -{Math.round(product.discountPercentage)}%
                </h6>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
