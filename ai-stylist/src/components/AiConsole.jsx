import { useState } from 'react';

const QUICK_TAGS = ['Casual', 'Formal', 'Streetwear', 'Afro-chic'];

export default function AiConsole({ onGenerate, isLoading, hasResults }) {
  const [prompt, setPrompt] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  const handleGenerate = () => {
    const query = selectedTag ? `${prompt} [${selectedTag}]` : prompt;
    if (!query.trim()) return;
    onGenerate(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h2 className="font-display text-3xl md:text-[32px] text-charcoal leading-tight">
          Describe your event
        </h2>
        <p className="mt-2 text-sm text-grey-dark font-light leading-relaxed">
          Tell the stylist what you're dressing for, and we'll curate an outfit from our collection.
        </p>
      </div>

      <div className="relative mb-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Attending a tech hackathon in Accra"
          rows={3}
          className="w-full bg-transparent border-b border-grey-subtle px-0 py-4 text-base text-charcoal placeholder:text-grey-mid focus:outline-none focus:border-charcoal transition-colors resize-none"
        />
        <div className="absolute bottom-4 right-4 text-[10px] text-grey-dark/40 font-body tracking-wider uppercase">
          {prompt.length > 0 && '↵ send'}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {QUICK_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={`px-4 py-2 text-[11px] tracking-[0.1em] uppercase font-semibold border transition-all duration-150 ${
              selectedTag === tag
                ? 'border-charcoal bg-charcoal text-bone'
                : 'border-charcoal text-charcoal hover:bg-charcoal hover:text-bone'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading || !prompt.trim()}
        className="w-full py-4 px-8 bg-charcoal text-bone text-sm tracking-[0.1em] uppercase font-medium transition-all duration-300 hover:bg-gold hover:text-charcoal disabled:opacity-30 disabled:hover:bg-charcoal disabled:hover:text-bone disabled:cursor-not-allowed"
      >
        <span className="flex items-center justify-center gap-3">
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Curating your look...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3a6 6 0 0 0-6 6c0 4 6 10 6 10s6-6 6-10a6 6 0 0 0-6-6Z" />
                <circle cx="12" cy="9" r="2" />
              </svg>
              Generate Outfit with AI
            </>
          )}
        </span>
      </button>

      {hasResults && (
        <p className="mt-4 text-[11px] text-grey-dark/60 text-center tracking-wider uppercase">
          Press <span className="text-gold">Enter</span> to regenerate
        </p>
      )}
    </div>
  );
}
