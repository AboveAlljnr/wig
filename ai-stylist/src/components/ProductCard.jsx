export default function ProductCard({ product }) {
  const { type, name, price, image, currency } = product;

  const typeLabels = {
    top: 'Top',
    bottom: 'Bottom',
    shoes: 'Shoes',
    accessory: 'Accessory',
  };

  const gradients = {
    top: 'from-amber-900/20 to-rose-900/10',
    bottom: 'from-indigo-900/20 to-slate-900/10',
    shoes: 'from-emerald-900/20 to-teal-900/10',
    accessory: 'from-yellow-900/20 to-orange-900/10',
  };

  const svgPaths = {
    top: 'M6 6h4l2-4 2 4h4l-3 5h2l-5 7-5-7h2l-3-5z',
    bottom: 'M6 5v14l4-2V5M14 5v12l4 2V5',
    shoes: 'M2 18h20l-2-10H4L2 18zM2 18l2 2h16l2-2',
    accessory: 'M7 17l5-12 5 17M4 17h16',
  };

  return (
    <div className="group flex flex-col border border-grey-subtle bg-surface-container-low transition-all duration-500 hover:border-gold/30">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F0E8D6]">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradients[type] || 'from-grey-subtle to-grey-mid'} flex items-center justify-center`}>
            <div className="text-center">
              <svg className="w-10 h-10 mx-auto mb-2 text-grey-mid/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d={svgPaths[type] || ''} />
              </svg>
              <span className="text-[10px] tracking-[0.15em] uppercase text-grey-mid/40 font-semibold">
                {typeLabels[type] || type}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div>
          <span className="text-[10px] tracking-[0.15em] uppercase text-grey-dark font-semibold">
            {typeLabels[type] || type}
          </span>
          <h3 className="font-display text-base text-charcoal mt-1 leading-snug">
            {name}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gold font-medium tracking-wide">
            {currency}{price.toFixed(2)}
          </span>
          <button className="text-[11px] tracking-[0.1em] uppercase font-semibold text-charcoal border border-charcoal px-4 py-2 transition-all duration-300 hover:bg-charcoal hover:text-bone">
            Rent Look
          </button>
        </div>
      </div>
    </div>
  );
}
