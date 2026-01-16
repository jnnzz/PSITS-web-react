import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart';
import { addToCartApi } from '../../student/api/student';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  isSoldOut: boolean;
  category: string;
}

interface ProductDetailsProps {
  product?: Product;
  onBack?: () => void;
}

const SAMPLE_NAMES = [
  'CCS Uniform',
  'Event Hoodie',
  'Faculty Polo',
  'Core Team Jacket',
  'PSITS Tee',
  'Limited Edition Jacket',
];

const MOCK_PRODUCTS: Product[] = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `${SAMPLE_NAMES[i % SAMPLE_NAMES.length]} ${i + 1}`,
  price: 400 + (i % 5) * 50,
  image: '/assets/awarding/uniform.jpg',
  isSoldOut: false,
  category: 'uniform',
}));

const ADD_TO_CART_TOAST_STYLE = {
  background: '#1DA1F2',
  color: '#ffffff',
  borderRadius: '0.75rem',
  padding: '0.75rem 1rem',
} as const;


interface AddToCartButtonProps {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  selectedCourse: string;
  quantity: number;
  disabled?: boolean;
}

const BuyNowButton: React.FC<AddToCartButtonProps> = ({
  product,
  selectedColor,
  selectedSize,
  selectedCourse,
  quantity,
  disabled = false,
}) => {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = React.useCallback(() => {
    if (disabled) return;

    const uid = addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
      course: selectedCourse,
      qty: quantity,
    });

    if (uid) {
      sessionStorage.setItem('buyNowItemId', uid);
    }

    navigate('/cart');
  }, [addItem, product, selectedColor, selectedSize, selectedCourse, quantity, disabled, navigate]);

  const baseClass = 'flex-1 py-4 sm:py-7 cursor-pointer rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all shadow-xl';

  return (
    <Button
      disabled={disabled}
      onClick={handleBuyNow}
      className={cn(
        baseClass,
        disabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
          : 'bg-[#1c9dde] text-white hover:bg-[#1a8acb]/90 hover:-translate-y-1 active:scale-[0.98] shadow-blue-100'
      )}
    >
      Buy Now
    </Button>
  );
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  selectedColor,
  selectedSize,
  selectedCourse,
  quantity,
  disabled = false,
}) => {
  const { addItem } = useCart();

  const handleAdd = React.useCallback(() => {
    if (disabled) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
      course: selectedCourse,
      qty: quantity,
    });

    toast.success('Added to cart', {
      style: ADD_TO_CART_TOAST_STYLE,
    });
    try {
      const token = sessionStorage.getItem('Token');
      if (token) {
        // try to find an id_number in sessionStorage under common keys
        const possibleKeys = ['id_number', 'IdNumber', 'idNumber', 'student_id', 'StudentId', 'user'];
        let id_number: string | undefined = undefined;
        for (const k of possibleKeys) {
          const v = sessionStorage.getItem(k);
          if (!v) continue;
          if (k === 'user' || k === 'User' || v.trim().startsWith('{')) {
            try {
              const parsed = JSON.parse(v);
              if (parsed && (parsed.id_number || parsed.idNumber || parsed.student_id)) {
                id_number = parsed.id_number || parsed.idNumber || parsed.student_id;
                break;
              }
            } catch (e) {
            }
          }
          if (!id_number) id_number = v;
          if (id_number) break;
        }

        const payload: any = {
          product_id: product.id,
          sizes: selectedSize,
          variation: selectedColor,
          quantity,
        };
        if (id_number) payload.id_number = id_number;

        addToCartApi(payload).catch((e) => console.error('addToCartApi failed', e));
      }
    } catch (e) {
      console.error(e);
    }
  }, [addItem, product, selectedColor, selectedSize, selectedCourse, quantity, disabled]);

  const baseClass = 'flex-1 py-4 sm:py-7 cursor-pointer rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all';

  return (
    <Button
      disabled={disabled}
      onClick={handleAdd}
      className={cn(
        baseClass,
        disabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#1c9dde]/60 hover:text-[#1c9dde] hover:bg-[#f0f9ff] hover:shadow-sm active:scale-[0.98]'
      )}
    >
      <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {disabled ? 'Currently Unavailable' : 'Add to Cart'}
    </Button>
  );
};

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('White');
  const [selectedCourse, setSelectedCourse] = useState('BSIT');

  const routeId = id ? Number(id) : undefined;
  const location = useLocation();
  const stateProduct = (location.state as any)?.product as Product | undefined;
  const currentProduct = product ?? stateProduct ?? MOCK_PRODUCTS.find(p => p.id === routeId);

  if (!currentProduct) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-20">
        <Button variant="ghost" size="sm" onClick={() => navigate('/shop')} className="mb-4 text-[#1c9dde]">← Back to shop</Button>
        <div className="text-center text-gray-500 py-12">Product not found.</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-12 mt-16 sm:mt-20 font-sans bg-transparent min-h-screen animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Breadcrumbs / Back Button */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/shop')} className="text-gray-400 hover:text-[#1c9dde] cursor-pointer">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="ml-2 font-medium">Shop</span>
        </Button>
        <span className="mx-2 text-gray-400">•</span>
        <span className="text-gray-600">Product Details</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-start">
        
        {/* Left: Product Image */}
        <div className="bg-[#f3f0e9] rounded-2xl sm:rounded-[2.5rem] overflow-hidden aspect-square flex items-center justify-center shadow-sm ">
          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            className={cn('w-full h-full object-contain transition-transform duration-700 hover:scale-105', currentProduct.isSoldOut && 'grayscale')}
          />
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col h-full">
            <div className="mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 sm:mb-4">{currentProduct.name}</h1>
            <p className="text-xl sm:text-2xl font-bold text-[#1c9dde]">₱ {currentProduct.price.toFixed(2)}</p>
          </div>

          <div className="space-y-6 sm:space-y-10">
            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Color</h3>
                <div className="flex space-x-4">
                  <Button onClick={() => setSelectedColor('Purple')} className={cn('w-10 h-10 rounded-full p-0', selectedColor === 'Purple' ? 'ring-2 ring-offset-2 ring-purple-600 bg-purple-600' : 'border-2 border-gray-100')} aria-label="Select purple" />
                  <Button onClick={() => setSelectedColor('White')} className={cn('w-10 h-10 rounded-full p-0', selectedColor === 'White' ? 'ring-2 ring-offset-2 ring-gray-300 bg-white' : 'border-2 border-gray-100')} aria-label="Select default color" />
                </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Size</h3>
                <button className=" text-xs font-bold flex items-center gap-1 text-[#1c9dde]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M11 5L6 9v4l5 4V5z" />
                  </svg>
                  SIZE GUIDE
                </button>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <Button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn('px-5 sm:px-8 cursor-pointer py-3 sm:py-5 rounded-full text-xs sm:text-sm font-bold transition-all',
                      selectedSize === size
                        ? 'bg-[#1c9dde] text-white  shadow-lg shadow-blue-200'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-[#1c9dde]/90 hover:text-white'
                    )}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Course Selection */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Course</h3>
              <div className="flex gap-2 sm:gap-3">
                {['BSCS', 'BSIT'].map((course) => (
                  <Button
                    key={course}
                    onClick={() => setSelectedCourse(course)}
                    className={cn('px-5 sm:px-8 py-3 sm:py-5 cursor-pointer rounded-full text-xs sm:text-sm font-bold transition-all',
                      selectedCourse === course
                        ? 'bg-[#1c9dde] text-white  shadow-lg shadow-blue-200'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-[#1c9dde]/90 hover:text-white'
                    )}
                  >
                    {course}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity and Stock */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 sm:mb-4">Quantity</h3>
              <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                <div className="flex items-center border-2 border-gray-100 rounded-full px-4 sm:px-6 py-1 sm:py-2 space-x-4 sm:space-x-8">                  
                  <Button variant="ghost" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-400 hover:text-gray-900 cursor-pointer text-xl sm:text-2xl font-light p-0 h-auto">−</Button>
                  <span className="text-sm sm:text-base font-bold min-w-[1.5rem] text-center">{quantity}</span>
                  <Button variant="ghost" onClick={() => setQuantity(quantity + 1)} className="text-gray-400 hover:text-gray-900 cursor-pointer text-xl sm:text-2xl font-light p-0 h-auto">+</Button>
                </div>
                <span className="text-gray-400 text-xs sm:text-sm font-medium">436 Stocks Available</span>
              </div>
            </div>

            {/* Final Action */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
              <BuyNowButton
                product={currentProduct}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                selectedCourse={selectedCourse}
                quantity={quantity}
                disabled={currentProduct.isSoldOut}
              />
              <AddToCartButton
                product={currentProduct}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                selectedCourse={selectedCourse}
                quantity={quantity}
                disabled={currentProduct.isSoldOut}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

