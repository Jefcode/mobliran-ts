import React from 'react';
import { Category } from '../../../shared/types';
import Message from '../components/common/Message';
import Filter from '../components/Products/Filter';
import { useProducts } from '../components/Products/hooks/useProducts';
import ProductItem from '../components/Products/ProductItem';
import SkeletonProducts from '../components/Products/SkeletonProducts';

const ShopScreen = () => {
  const {
    productsQuery: { data: products = [], isLoading, isError },
    category,
    setCategory,
  } = useProducts();

  const categoryChangeHandler = (category: Category | undefined) => {
    setCategory(category);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className='w-full py-8 bg-stone-100'>
        <div className='container px-6 mx-auto'>
          <div className='flex flex-wrap w-full gap-4 text-gray-400'>
            <div className='after:content-["/"] after:mr-4 last:after:content-[""]'>
              <a href='/' className='transition hover:text-gray-600'>
                خانه
              </a>
            </div>

            <div className='after:content-["/"] after:mr-4 last:after:content-[""]'>
              فروشگاه
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <section id='products' className='mt-5 md:mt-14 mb-14'>
        {/* Container */}
        <div className='container mx-auto'>
          <Filter
            selectedCategory={category}
            onChangeCategory={categoryChangeHandler}
          />

          {/* Products Flex Container */}
          <div className='flex flex-col items-start sm:flex-row sm:flex-wrap'>
            {isLoading && <SkeletonProducts />}
            {isError && (
              <div className='w-full px-5 py-4 bg-rose-200 border-rose-400 font-both'>
                خطایی رخ داده است
              </div>
            )}
            {products.length === 0 && !isLoading && (
              <Message variant='info'>
                هیچ محصولی با این دسته بندی یافت نشد.
              </Message>
            )}
            {products.map((product) => (
              <ProductItem product={product} key={product._id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopScreen;
