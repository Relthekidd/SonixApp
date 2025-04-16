import React from 'react';
import { Plus, Package, DollarSign, TrendingUp, ShoppingBag } from 'lucide-react';

const Merchandise: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Merchandise</h1>
          <p className="text-foreground/70">Manage your merch store and track sales</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-secondary/50 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-foreground/70">Total Sales</p>
              <h3 className="text-2xl font-bold mt-1">$2,450</h3>
            </div>
            <div className="p-2 bg-primary/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span>12% increase</span>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-foreground/70">Orders</p>
              <h3 className="text-2xl font-bold mt-1">156</h3>
            </div>
            <div className="p-2 bg-primary/20 rounded-lg">
              <Package className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span>8% increase</span>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-foreground/70">Products</p>
              <h3 className="text-2xl font-bold mt-1">12</h3>
            </div>
            <div className="p-2 bg-primary/20 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm text-foreground/70">
            <span>Active items</span>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-foreground/70">Avg. Order Value</p>
              <h3 className="text-2xl font-bold mt-1">$32</h3>
            </div>
            <div className="p-2 bg-primary/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span>5% increase</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div key={index} className="bg-secondary/50 rounded-xl overflow-hidden group">
            <div className="relative aspect-square">
              <img
                src={`https://images.unsplash.com/photo-${
                  index % 2 === 0
                    ? '1515886657613-9f3515b0c78f' // T-Shirt
                    : '1605923638533-5d08b4c0e138' // Hoodie
                }?w=300&h=300&fit=crop`}
                alt="Product"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Package className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium">Classic Logo Tee</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-foreground/70">$25.00</span>
                <span className="text-sm text-foreground/50">124 sold</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Merchandise;
