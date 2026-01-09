import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Minus, Plus, Trash } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { useTransactions } from '@/lib/transactions';

export const Cart: React.FC = () => {
  const { items, removeItem, updateQty, total } = useCart();
  const { addTransaction } = useTransactions();
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

  const navigate = useNavigate();

  if (!items.length) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-40 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-sm text-gray-500 mb-6">Looks like you haven't added any items yet. Start shopping to add products to your cart.</p>
          <div className="flex items-center justify-center">
            <Button onClick={() => navigate('/shop')} className="bg-[#1C9DDE] cursor-pointer text-white">
              Shop products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-40 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-semibold mb-6">My Cart</h1>

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center gap-3 text-sm text-gray-600">
            <Checkbox
              className='cursor-pointer border-gray-300'
              checked={selectedIds.size === items.length}
              onCheckedChange={(v) => {
                if (v) setSelectedIds(new Set(items.map((i) => i.uid)));
                else setSelectedIds(new Set());
              }}
            />
            <span>Select All</span>
          </label>
          <button
            className="text-sm text-red-500 cursor-pointer"
            onClick={() => {
              selectedIds.forEach((id) => removeItem(id));
              setSelectedIds(new Set());
            }}
          >
            Remove
          </button>
        </div>

        <div className="space-y-6">
          {items.map((it) => (
            <Card key={it.uid} className="rounded-2xl">
              <div className="flex items-center gap-6 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Checkbox
                      className="cursor-pointer border-gray-300"
                      checked={selectedIds.has(it.uid)}
                      onCheckedChange={(v) => {
                        setSelectedIds((prev) => {
                          const copy = new Set(prev);
                          if (v) copy.add(it.uid);
                          else copy.delete(it.uid);
                          return copy;
                        });
                      }}
                    />
                  </div>

                  <Avatar className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden">
                    <AvatarImage src={it.image} alt={it.name} className="w-full h-full object-cover" />
                  </Avatar>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{it.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{it.color}, {it.size}, {it.course}</p>
                    <div className="text-[#1C9DDE] font-bold pt-2 sm:pt-0">₱{(it.price * it.qty).toFixed(2)}</div>
                  </div>

                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <div className="flex items-center gap-3">
                      <Button className='cursor-pointer' variant="ghost" size="icon" onClick={() => updateQty(it.uid, it.qty - 1)}>
                        <Minus />
                      </Button>
                      <div className="text-base font-bold w-10 text-center">{it.qty}</div>
                      <Button className='cursor-pointer' variant="ghost" size="icon" onClick={() => updateQty(it.uid, it.qty + 1)}>
                        <Plus />
                      </Button>
                    </div>
                    <button onClick={() => removeItem(it.uid)} className="text-red-500 cursor-pointer lg:pr-5">
                      <Trash />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <aside>
        <Card className="rounded-2xl">
          <div className="px-6 py-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            {selectedIds.size === 0 ? (
              <div className="text-sm text-gray-500 mb-4">No items selected.</div>
            ) : (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Items</span>
                  <span className="text-sm text-gray-800">{selectedIds.size}</span>
                </div>
              </div>
            )}

              <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-gray-600">Total</span>
              <span className="text-[#1C9DDE] font-bold">₱{
                items
                  .filter((i) => selectedIds.has(i.uid))
                  .reduce((a, b) => a + b.price * b.qty, 0)
                  .toFixed(2)
              }</span>
            </div>
            <Button
              disabled={selectedIds.size === 0}
              className="w-full bg-[#1DA1F2] hover:bg-[#1c9dde]/ cursor-pointer text-white"
              onClick={() => {
                const selected = items.filter((i) => selectedIds.has(i.uid));
                if (selected.length === 0) return;

                const txnPayload = {
                  items: selected.map((s) => ({ ...s })),
                  total: selected.reduce((a, b) => a + b.price * b.qty, 0),
                };

                addTransaction(txnPayload);

                selected.forEach((s) => removeItem(s.uid));
                setSelectedIds(new Set());

                window.alert(`Order placed for ${selected.length} item(s). Transaction saved.`);
              }}
            >
              Order
            </Button>
          </div>
        </Card>
      </aside>
    </div>
  );
};

export default Cart;
