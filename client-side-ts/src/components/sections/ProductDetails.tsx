import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart';

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
  }, [addItem, product, selectedColor, selectedSize, selectedCourse, quantity, disabled]);

  const baseClass = 'w-full py-7 cursor-pointer rounded-2xl font-bold text-lg transition-all shadow-xl mt-4';

  return (
    <Button
      disabled={disabled}
      onClick={handleAdd}
      className={cn(
        baseClass,
        disabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
          : 'bg-[#1c9dde] text-white hover:bg-[#1a8acb]/90 hover:-translate-y-1 active:scale-[0.98] shadow-blue-100'
      )}
    >
      {disabled ? 'Currently Unavailable' : 'Add to cart'}
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
    <div className="max-w-6xl mx-auto p-6 lg:p-12 mt-20 font-sans bg-transparent min-h-screen animate-in fade-in slide-in-from-right-4 duration-500">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left: Product Image */}
        <div className="bg-[#f3f0e9] rounded-[2.5rem] overflow-hidden aspect-square flex items-center justify-center shadow-sm ">
          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            className={cn('w-full h-full object-contain transition-transform duration-700 hover:scale-105', currentProduct.isSoldOut && 'grayscale')}
          />
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col h-full">
            <div className="mb-8">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{currentProduct.name}</h1>
            <p className="text-2xl font-bold text-[#1c9dde]">₱ {currentProduct.price.toFixed(2)}</p>
          </div>

          <div className="space-y-10">
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
              <div className="flex flex-wrap gap-3">
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <Button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn('px-8 cursor-pointer py-5 rounded-full text-sm font-bold transition-all',
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
              <div className="flex gap-3">
                {['BSCS', 'BSIT'].map((course) => (
                  <Button
                    key={course}
                    onClick={() => setSelectedCourse(course)}
                    className={cn('px-8 py-5 cursor-pointer rounded-full text-sm font-bold transition-all',
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
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quantity</h3>
              <div className="flex items-center space-x-6">
                <div className="flex items-center border-2 border-gray-100 rounded-full px-6 py-2 space-x-8">                  
                  <Button variant="ghost" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-400 hover:text-gray-900 cursor-pointer text-2xl font-light">−</Button>
                  <span className="text-base font-bold min-w-[1.5rem] text-center">{quantity}</span>
                  <Button variant="ghost" onClick={() => setQuantity(quantity + 1)} className="text-gray-400 hover:text-gray-900 cursor-pointer text-2xl font-light">+</Button>
                </div>
                <span className="text-gray-400 text-sm font-medium">436 Stocks Available</span>
              </div>
            </div>

            {/* Final Action */}
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
  );
};

