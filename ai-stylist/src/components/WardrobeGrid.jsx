import ProductCard from './ProductCard.jsx';

export default function WardrobeGrid({ products, hasGenerated }) {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h2 className="font-display text-3xl md:text-[32px] text-charcoal leading-tight">
          Curated Look
        </h2>
        <p className="mt-2 text-sm text-grey-dark font-light leading-relaxed">
          {hasGenerated
            ? 'Your AI-styled outfit. Each piece is handpicked from our collection.'
            : 'Describe your event to receive a personalized curation.'}
        </p>
      </div>

      {hasGenerated ? (
        <div className="grid grid-cols-2 gap-4 flex-1 content-start">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex-1 border border-dashed border-grey-subtle flex items-center justify-center">
          <div className="text-center max-w-[260px]">
            <svg className="w-12 h-12 mx-auto mb-4 text-grey-subtle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M6 6h4l2-4 2 4h4l-3 5h2l-5 7-5-7h2l-3-5z" />
            </svg>
            <p className="text-xs tracking-[0.1em] uppercase font-semibold text-grey-dark/60">
              Your curated look will appear here
            </p>
            <p className="text-[11px] text-grey-dark/40 mt-2 leading-relaxed">
              Four pieces — top, bottom, shoes, accessory —<br />selected for your event.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
