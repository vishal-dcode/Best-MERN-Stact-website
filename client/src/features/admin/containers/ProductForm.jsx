// * IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// * COMPONENTS
import Modal from '../../../components/Modal';
// * REDUX
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync
} from '../../product/productSlice';

export default function ProductForm() {
  const dispatch = useDispatch();
  const params = useParams();
  const [openModal, setOpenModal] = useState(null);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const selectedProduct = useSelector(selectProductById);
  const {
    register,
    handleSubmit,
    setValue,
    reset
    // formState: { errors },
  } = useForm();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue('title', selectedProduct.title);
      setValue('description', selectedProduct.description);
      setValue('price', selectedProduct.price);
      setValue('discountPercentage', selectedProduct.discountPercentage);
      setValue('thumbnail', selectedProduct.thumbnail);
      setValue('stock', selectedProduct.stock);
      setValue('image1', selectedProduct.images[0]);
      setValue('image2', selectedProduct.images[1]);
      setValue('image3', selectedProduct.images[2]);
      setValue('brand', selectedProduct.brand);
      setValue('category', selectedProduct.category);
    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
    alert('Product Deleted');
  };

  return (
    <main className="add_product-wrapper">
      <h1>Add New Product</h1>
      <form
        className="add_product-form"
        noValidate
        onSubmit={handleSubmit((data) => {
          const products = { ...data };
          products.images = [products.image1, products.image2, products.image3];
          products.rating = selectedProduct ? selectedProduct.rating || 0 : 0;
          delete products['image1'];
          delete products['image2'];
          delete products['image3'];
          products.price = +products.price; // Using "+" it changes string to number
          products.stock = +products.stock;
          products.discountPercentage = +products.discountPercentage;
          console.log(products);

          if (params.id) {
            products.id = params.id;
            dispatch(updateProductAsync(products));
            alert('Product Updated');
          } else {
            dispatch(createProductAsync(products));
            alert('Product Created');
          }
          reset();
        })}>
        <section>
          {selectedProduct && selectedProduct.deleted && (
            <h2 className="text-red-500 sm:col-span-6">This product is deleted</h2>
          )}
          {/* //! Name and description */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex shadow-sm ring-1 ring-inset ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    placeholder="Product Name"
                    {...register('title', {
                      required: 'Title is required',
                      maxLength: 15
                    })}
                    id="title"
                    className="border-0 w-full bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  placeholder="Write a few sentences about your product."
                  {...register('description', {
                    required: 'description is required'
                  })}
                  rows={5}
                  className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          {/* //! CATEGORY */}
          <div className="mt-8 w-full flex items-center gap-3">
            <div className="sm:col-span-2 w-full">
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                Brand
              </label>
              <div className="mt-2">
                <select
                  id="brand"
                  className="w-full"
                  {...register('brand', {
                    required: 'Brand is required'
                  })}>
                  <option value="">Select</option>
                  {brands.map((brands, idx) => (
                    <option key={idx} value={brands.value}>
                      {brands.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-2 w-full">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  className="w-full"
                  {...register('category', {
                    required: 'Category is required'
                  })}>
                  <option value="">Select</option>
                  {categories.map((categories, idx) => (
                    <option key={idx} value={categories.value}>
                      {categories.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* //! IMAGES */}
          <div className="mt-8">
            <div className="sm:col-span-2">
              <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                Thumbnail
              </label>
              <div className="mt-2">
                <div className="flex shadow-sm ring-1 ring-inset ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register('thumbnail', {
                      required: 'Thumbnail is required'
                    })}
                    id="thumbnail"
                    className="border-0 w-full bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2 py-3">
              <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                Image 1
              </label>
              <div className="mt-2">
                <div className="flex shadow-sm ring-1 ring-inset ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register('image2', {
                      required: 'Image2 is required'
                    })}
                    id="image2"
                    className="border-0 w-full bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                Image 2
              </label>
              <div className="mt-2">
                <div className="flex shadow-sm ring-1 ring-inset ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register('image3', {
                      required: 'Image3 is required'
                    })}
                    id="image3"
                    className="border-0 w-full bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2 pt-3">
              <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                Image 3
              </label>
              <div className="mt-2">
                <div className="flex shadow-sm ring-1 ring-inset ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register('image3', {
                      required: 'Image3 is required'
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
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Product Price
              </label>
              <div className="mt-2">
                <div className="flex shadow-sm ring-1 ring-inset  ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="number"
                    {...register('price', {
                      required: 'Price is required',
                      min: 1
                    })}
                    id="price"
                    className="border-0 w-full bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2 py-3">
              <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                Discount Percentage
              </label>
              <div className="mt-2">
                <div className="flex shadow-sm ring-1 ring-inset ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="number"
                    {...register('discountPercentage', {
                      required: 'Discount is required',
                      min: 0,
                      max: 100
                    })}
                    id="discount"
                    className="border-0 w-full bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                Stock available
              </label>
              <div className="mt-2">
                <div className="flex shadow-sm ring-1 ring-inset ring-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="number"
                    {...register('stock', {
                      required: 'Stock is required',
                      min: 0
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
            <button onClick={() => reset()} type="button" className="btn secondary-btn ">
              Discard
            </button>
            {selectedProduct && !selectedProduct.deleted && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModal(true);
                  // handleDelete();
                }}
                className="delete-btn btn">
                Delete
              </button>
            )}
            <button type="submit" className="btn primary-btn">
              Save
            </button>
          </div>
        </section>
      </form>
      {selectedProduct && (
        <Modal
          title={`Delete ${selectedProduct.title}`}
          message="Are you sure you want to delete this Product ?"
          dangerOption="Delete"
          cancelOption="Cancel"
          dangerAction={handleDelete}
          cancelAction={() => setOpenModal(null)}
          showModal={openModal}></Modal>
      )}
    </main>
  );
}

