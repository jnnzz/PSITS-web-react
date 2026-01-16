import React, { useState, useEffect, useCallback, memo, type ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Resource = {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  year: 'First Year' | 'Second Year' | 'Third Year' | 'Fourth Year';
};

const DUMMY_RESOURCES: Resource[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `IT-NETWORK${30 + i} Computer Networks`,
  category: ['Networking', 'Programming', 'Mathematics', 'Systems'][i % 4],
  excerpt:
    'Learn the fundamentals of computer networking, including network models, protocols, and basic configuration.',
  image: `https://picsum.photos/seed/resource-${i}/640/480`,
  year: (['First Year', 'Second Year', 'Third Year', 'Fourth Year'][(i % 4)] as Resource['year']),
}));

export const ResourcesSection: React.FC = () => {
  const years: Resource['year'][] = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];
  const [activeYear, setActiveYear] = useState<Resource['year']>('Third Year');
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  const filtered = DUMMY_RESOURCES.filter((r) => r.year === activeYear && (
    r.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    r.category.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    r.excerpt.toLowerCase().includes(debouncedSearch.toLowerCase())
  ));

  const RES_PER_PAGE = 9;
  const pageCount = Math.ceil(filtered.length / RES_PER_PAGE);
  const paginatedItems = filtered.slice((page - 1) * RES_PER_PAGE, page * RES_PER_PAGE);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-gray-50/20 overflow-visible">
      <div className="sticky top-[7vh] left-0 w-full flex justify-center pointer-events-none z-0 hidden md:flex">
        <span className="text-[8vw] md:text-[10vw] font-black text-gray-200 opacity-40 select-none uppercase tracking-tighter">
          Materials
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 -mt-[10vh] pb-20">
        <header className="pt-6 pb-6 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 tracking-tight">Resources</h2>
        </header>

        <div className="flex justify-center md:justify-end mb-8">
          <div className="relative w-full max-w-xs">
            <InputGroup className="rounded-full">
              <InputGroupInput
                type="text"
                placeholder="Search resources..."
                aria-label="Search resources"
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

        <nav className="flex items-center justify-center gap-6 mb-10" aria-label="Years">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => { setActiveYear(y); setPage(1); }}
              className={`text-sm md:text-base font-medium pb-2 ${
                activeYear === y
                  ? 'text-[#1C9DDE] border-b-2 border-[#1C9DDE]'
                  : 'text-gray-400'
              }`}
            >
              {y}
            </button>
          ))}
        </nav>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {paginatedItems.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-400 italic">No resources found.</div>
          ) : (
            paginatedItems.map((res) => (
              <ResourceCard key={res.id} res={res} />
            ))
          )}
        </div>

        {pageCount > 1 && (
          <footer className="mt-12 flex justify-center gap-3">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={cn(
                  buttonVariants({ variant: page === i + 1 ? 'outline' : 'ghost', size: 'icon' }),
                  page === i + 1 ? 'bg-[#1c9dde] text-white border-transparent hover:bg-[#1a8acb] hover:text-white' : '',
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

const ResourceCard: React.FC<{ res: Resource }> = ({ res }) => {
  return (
    <article className={`group bg-white border border-gray-100 rounded-3xl pb-4 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2`}>
      <div className="relative aspect-video overflow-hidden mb-6 rounded-t-2xl">
        <img src={res.image} alt={res.title} className="w-full h-full object-cover" />
        <div className="absolute left-4 top-4">
          <Badge className="bg-white/90 text-[#1C9DDE] px-3 py-1 rounded-full font-semibold border-0">{res.category}</Badge>
        </div>
      </div>

      <div className="space-y-2 px-5">
        <p className="text-sm font-semibold text-gray-800 truncate">{res.title}</p>
        <p className="text-sm text-gray-500 line-clamp-3">{res.excerpt}</p>
      </div>

      <div className="flex items-center justify-between px-5 mt-4">
        <button className="text-sm text-[#1C9DDE] font-medium py-2 px-4 rounded-full border border-[#E6F6FF] hover:bg-[#F2FBFF]">Learn more ↗</button>
        <span className="text-xs text-gray-400">{res.year}</span>
      </div>
    </article>
  );
};

export default ResourcesSection;
