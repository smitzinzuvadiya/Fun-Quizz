import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import quizData from '../data/quizData.json';
import { CategoryCard } from '../components/CategoryCard';

export function Search() {
  const [query, setQuery] = useState('');

  const filteredCategories = quizData.categories.filter((cat) =>
    cat.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="pb-24 px-[20px] pt-8 animate-in fade-in duration-500 min-h-full">
      <h1 className="text-3xl font-extrabold tracking-tight text-primary mb-6">Search</h1>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-on-surface-variant" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find a category..."
          className="w-full bg-surface py-4 pl-12 pr-4 rounded-xl shadow-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4 text-on-surface-variant">
          {query ? 'Search Results' : 'All Categories'}
        </h2>
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-on-surface-variant font-medium">No categories found for "{query}".</p>
          </div>
        )}
      </div>
    </div>
  );
}
