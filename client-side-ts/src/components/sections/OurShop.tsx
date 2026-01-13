import React, { useState, useEffect, useCallback, memo, type ChangeEvent } from 'react';
import { Link } from 'react-router';
import image from '../../assets/awarding/1.jpg';
import image1 from '../../assets/awarding/2.jpg';
import image2 from '../../assets/awarding/3.jpg';
import image3 from '../../assets/awarding/4.jpg';
import image4 from '../../assets/awarding/5.jpg';
import image5 from '../../assets/awarding/6.jpg';
import image6 from '../../assets/awarding/7.jpg';
import image7 from '../../assets/awarding/8.jpg';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  isSoldOut: boolean;
  category: string;
}

const baseProducts = [
  { name: 'CCS Official Polo', price: 450, category: 'Uniform', image: image },
  { name: 'CS Department Shirt', price: 350, category: 'Apparel', image: image1 },
  { name: 'Lanyard v1 (Black)', price: 120, category: 'Accessories', image: image3 },
  { name: 'Organization Hoodie', price: 850, category: 'Apparel', image: image2 },
  { name: 'CCS Sticker Pack', price: 50, category: 'Stationery', image: image4 },
  { name: 'Tech Tote Bag', price: 180, category: 'Accessories', image: image5 },
  { name: 'Premium Mousepad', price: 300, category: 'Tech', image: image6 },
  { name: 'Enamel Pin Set', price: 150, category: 'Accessories', image: image7 },
];

const ALL_PRODUCTS: Product[] = Array.from({ length: 10 }, (_, i) => {
  const base = baseProducts[i % baseProducts.length];
  return {
    id: i + 1,
    name: `${base.name} ${Math.floor(i / baseProducts.length) > 0 ? '(Batch ' + (Math.floor(i / baseProducts.length) + 1) + ')' : ''}`,
    price: base.price,
    image: base.image,
    category: base.category,
    isSoldOut: (i + 1) % 7 === 0,
  };
});

const PRODUCTS_PER_PAGE = 8;

export const OurShop: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  const filtered = ALL_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const pageCount = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const paginatedItems = filtered.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);


  return (
    <section className="relative w-full min-h-screen bg-gray-50/30 overflow-visible">
      <div className="sticky top-[7vh] left-0 w-full flex justify-center pointer-events-none z-0 hidden md:flex">
        <span className="text-[8vw] md:text-[10vw] font-black text-gray-200 opacity-40 select-none uppercase tracking-tighter">
          Merchandise
        </span>
      </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 -mt-[10vh] pb-20">
        
        {/* Title Section */}
        <header className="pt- pb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
            Our Shop
          </h2>
        </header>

        {/* Search Bar Container */}
        <div className="flex justify-center md:justify-end mb-12">
          <div className="relative w-full max-w-xs pt-25 sm:pt-20 md:pt-0">
            <InputGroup className="rounded-full">
              <InputGroupInput
                type="text"
                placeholder="Search products..."
                aria-label="Search products"
                value={search}
                onChange={handleSearch}
                className="rounded-full pl-5 pr-10"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton aria-label="Search" variant="ghost" size="xs" className="p-2">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                  </svg>
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {paginatedItems.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-400 italic">No products found.</div>
          ) : (
            paginatedItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {/* Pagination Section */}
        {pageCount > 1 && (
          <footer className="mt-20 flex justify-center gap-3 border-t border-gray-100 pt-10">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={cn(
                  buttonVariants({
                    variant: page === i + 1 ? 'outline' : 'ghost',
                    size: 'icon',
                  }),
                   page === i + 1 ? 'bg-[#1c9dde]  text-white border-transparent hover:bg-[#1a8acb] hover:text-white' : '',
                  'w-12 h-12 rounded-2xl font-bold text-sm transition-all shadow-sm cursor-pointer'
                )}
              >
                {i + 1}
              </button>
            ))}
          </footer>
        )}
      </div>
    </section>
  );
};

const ProductCardInner: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link
      to={`/shop/${product.id}`}
      state={{ product }}
      className={`${product.isSoldOut ? 'pointer-events-none' : ''}`}
      aria-disabled={product.isSoldOut}
    >
      <div
        className={`group bg-white border border-gray-100 rounded-3xl pb-4 transition-all duration-300 shadow-sm
          ${product.isSoldOut ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-xl hover:-translate-y-2'}
        `}
      >
        <div className="relative aspect-square overflow-hidden mb-6 rounded-t-2xl">
          {product.isSoldOut && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-[2px]">
              <Badge variant="destructive" className="uppercase tracking-tighter">Sold Out</Badge>
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover transition-transform duration-500 ${!product.isSoldOut && 'group-hover:scale-110'}`}
          />
        </div>

        <div className="space-y-2 px-5">
          <p className="text-[10px] font-bold text-[#1c9dde] uppercase tracking-widest">
            <Badge className="bg-transparent text-[#1c9dde] border-0 p-0">{product.category}</Badge>
          </p>
          <p className="text-sm md:text-base font-semibold text-gray-800 truncate">{product.name}</p>
          <p className="text-xs text-gray-500">{product.isSoldOut ? 'Currently unavailable' : 'In stock'}</p>
        </div>
        <div className="flex items-end justify-end px-5">
          <p className="text-base md:text-lg lg:text-xl font-black text-[#1c9dde]">₱{product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

const ProductCard = memo(ProductCardInner);

export default OurShop;