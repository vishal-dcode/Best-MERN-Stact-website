// TODO:
// add word limit to discription and title

import {PhotoIcon, UserCircleIcon} from '@heroicons/react/24/solid';
import {
  addProductAsync,
  deleteProductAsync,
  fetchAllProductByIdAsync,
  productActions,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from '../../../features/product/productSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();
  const brandsSelected = useSelector(selectBrands);
  const categoriesSelected = useSelector(selectCategories);
  const params = useParams();
  const productIdSelected = useSelector(selectProductById);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchAllProductByIdAsync(params.id));
    } else {
      dispatch(productActions.resetProductForm());
    }
  }, [dispatch, params.id]);
  useEffect(() => {
    if (productIdSelected && params.id) {
      setValue('title', productIdSelected.title);
      setValue('description', productIdSelected.description);
      setValue('price', productIdSelected.price);
      setValue('rating', productIdSelected.rating);
      setValue('discountPercentage', productIdSelected.discountPercentage);
      setValue('stock', productIdSelected.stock);
      setValue('brand', productIdSelected.brand);
      setValue('category', productIdSelected.category);
      setValue('thumbnail', productIdSelected.thumbnail);
      setValue('image1', productIdSelected.images[0]);
      setValue('image2', productIdSelected.images[1]);
      setValue('image3', productIdSelected.images[2]);
    }
  }, [productIdSelected, params.id, setValue]);

  const handleDelete = () => {
    dispatch(deleteProductAsync(selectProductById));
  };
  return (
    <main className="add_product-wrapper">
      <h1>Add New Product</h1>
      <form
        className="add_product-form"
        noValidate
        onSubmit={handleSubmit((data) => {
          const products = {...data};
          products.images = [
            products.image1,
            products.image2,
            products.image3,
            products.thumbnail,
          ];
          products.rating = productIdSelected.rating || 0;
          delete products['image1'];
          delete products['image2'];
          delete products['image3'];
          products.price = +products.price; // Using "+" it changes string to number
          products.stock = +products.stock;
          products.discountPercentage = +products.discountPercentage;
          // console.log(products);

          if (params.id) {
            products.id = params.id;
            dispatch(updateProductAsync(products));
          } else {
            dispatch(addProductAsync(products));
          }
          reset();
        })}>
        <section className="">
          {/* //! Name and description */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex shadow-sm ring-1 ring-inset ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    placeholder="Product Name"
                    {...register('title', {
                      required: 'Title is required',
                      maxLength: 15,
                    })}
                    id="title"
                    className="border-0 w-full bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  placeholder="Write a few sentences about your product."
                  {...register('description', {
                    required: 'description is required',
                  })}
                  rows={5}
                  className="block w-full border-0 w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          {/* //! CATEGORY */}
          <div className="mt-8">
            <div className="sm:col-span-2">
              <label
                htmlFor="brand"
                className="block text-sm font-medium leading-6 text-gray-900">
                Brand
              </label>
              <div className="mt-2">
                <select
                  id="brand"
                  {...register('brand', {
                    required: 'Brand is required',
                  })}>
                  <option value=""> -- </option>
                  {brandsSelected.map((brands) => (
                    <option value={brands.value}>{brands.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-2 mt-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  {...register('category', {
                    required: 'Category is required',
                  })}>
                  <option value=""> -- </option>
                  {categoriesSelected.map((categories) => (
                    <option value={categories.value}>{categories.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* //! IMAGES */}
          <div className="mt-8">
            <div className="sm:col-span-2">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium leading-6 text-gray-900">
                Thumbnail
              </label>
              <div className="mt-2">
                <div className="flex shadow-sm ring-1 ring-inset ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register('thumbnail', {
                      required: 'Thumbnail is required',
                    })}
                    id="thumbnail"
                    className="border-0 w-full bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="image1"
                className="block text-sm font-medium leading-6 text-gray-900">
                Image 1
              </label>
              <div className="mt-2">
                <div className="flex shadow-sm ring-1 ring-inset ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register('image1', {
                      required: 'Image1 is required',
                    })}
                    id="image1"
                    className="border-0 w-full bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="image2"
                className="block text-sm font-medium leading-6 text-gray-900">
                Image 2
              </label>
              <div className="mt-2">
                <div className="flex shadow-sm ring-1 ring-inset ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register('image2', {
                      required: 'Image2 is required',
                    })}
                    id="image2"
                    className="border-0 w-full bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="image3"
                className="block text-sm font-medium leading-6 text-gray-900">
                Image 3
              </label>
              <div className="mt-2">
                <div className="flex shadow-sm ring-1 ring-inset ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register('image3', {
                      required: 'Image3 is required',
                    })}
                    id="image3"
                    className="border-0 w-full bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          {/* //! Price and discount */}
          <div>
            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900">
                Product Price
              </label>
              <div className="mt-2">
                <div className="flex shadow-sm ring-1 ring-inset  ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="number"
                    {...register('price', {
                      required: 'Price is required',
                      min: 1,
                    })}
                    id="price"
                    className="border-0 w-full bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="discountPercentage"
                className="block text-sm font-medium leading-6 text-gray-900">
                Discount Percentage
              </label>
              <div className="mt-2">
                <div className="flex shadow-sm ring-1 ring-inset ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="number"
                    {...register('discountPercentage', {
                      required: 'Discount is required',
                      min: 0,
                      max: 100,
                    })}
                    id="discount"
                    className="border-0 w-full bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="stock"
                className="block text-sm font-medium leading-6 text-gray-900">
                Stock available
              </label>
              <div className="mt-2">
                <div className="flex shadow-sm ring-1 ring-inset ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="number"
                    {...register('stock', {
                      required: 'Stock is required',
                      min: 0,
                    })}
                    id="stock"
                    className="border-0 w-full bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* //! BUTTON */}
          <div className="mt-8 flex items-center justify-end gap-x-2">
            <button type="button" className="btn secondary-btn">
              Discard
            </button>
            {selectProductById && ( // this delete will only show when a existing product is selected
              <button
                onClick={handleDelete}
                type="button"
                className="btn reset-btn">
                Delete
              </button>
            )}
            <button type="submit" className="btn primary-btn">
              Save
            </button>
          </div>
        </section>
      </form>
    </main>
  );
}
