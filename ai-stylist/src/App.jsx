import { useState, useCallback } from 'react';
import Header from './components/Header.jsx';
import AiConsole from './components/AiConsole.jsx';
import WardrobeGrid from './components/WardrobeGrid.jsx';

const INITIAL_PRODUCTS = [
  { id: 1, type: 'top',       name: 'Silk Evening Blouse',    price: 89,  image: '../assets/images/ai-stylist-top.jpg', currency: '$' },
  { id: 2, type: 'bottom',    name: 'Tailored Trousers',      price: 120, image: '../assets/images/ai-stylist-bottom.jpg', currency: '$' },
  { id: 3, type: 'shoes',     name: 'Leather Loafers',        price: 195, image: '../assets/images/ai-stylist-shoes.jpg', currency: '$' },
  { id: 4, type: 'accessory', name: 'Gold Chain Bracelet',    price: 45,  image: '../assets/images/ai-stylist-accessory.jpg', currency: '$' },
];

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = useCallback(async (prompt) => {
    setIsLoading(true);

    // Simulate AI latency — replace with real API call
    await new Promise((r) => setTimeout(r, 2000));

    // Placeholder: map real AI response data here later
    setProducts([
      { id: 1, type: 'top',       name: 'Linen Blend Overshirt',   price: 95,  image: '../assets/images/ai-stylist-top.jpg', currency: '$' },
      { id: 2, type: 'bottom',    name: 'Cargo Trousers',          price: 110, image: '../assets/images/ai-stylist-bottom.jpg', currency: '$' },
      { id: 3, type: 'shoes',     name: 'Technical Sneakers',      price: 160, image: '../assets/images/ai-stylist-shoes.jpg', currency: '$' },
      { id: 4, type: 'accessory', name: 'Digital Wristband',       price: 35,  image: '../assets/images/ai-stylist-accessory.jpg', currency: '$' },
    ]);

    setHasGenerated(true);
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-bone text-charcoal">
      <Header />

      <main className="pt-20 min-h-screen">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-5rem)]">
          <section className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-grey-subtle">
            <div className="p-6 md:p-10 lg:p-14 xl:p-16 h-full">
              <AiConsole
                onGenerate={handleGenerate}
                isLoading={isLoading}
                hasResults={hasGenerated}
              />
            </div>
          </section>

          <section className="w-full lg:w-1/2">
            <div className="p-6 md:p-10 lg:p-14 xl:p-16 h-full">
              <WardrobeGrid
                products={products}
                hasGenerated={hasGenerated}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
