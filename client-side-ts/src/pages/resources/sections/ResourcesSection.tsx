import React, { useState, useEffect, useCallback, memo, type ChangeEvent } from 'react';
import { tutorials } from '@/data/sections-data';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { Card, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Resource = {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  link?: string;
  year: 'First Year' | 'Second Year' | 'Third Year' | 'Fourth Year';
};

const buildResourcesFromTutorials = (): Resource[] => {
  const resources: Resource[] = [];
  let id = 1;

  const pushList = (list: any[], year: Resource['year']) => {
    list.forEach((t) => {
      resources.push({
        id: id++,
        title: t.course,
        category: 'Tutorial',
        excerpt: t.excerpt ?? generateSummary(t.course),
        link: t.link ?? '',
        image: t.image ?? `https://picsum.photos/seed/tutorial-${id}/640/480`,
        year,
      });
    });
  };

  pushList(tutorials.firstYear || [], 'First Year');
  pushList(tutorials.secondYear || [], 'Second Year');
  pushList(tutorials.thirdYear || [], 'Third Year');
  pushList(tutorials.fourthYear || [], 'Fourth Year');

  return resources;
};

const DUMMY_RESOURCES: Resource[] = buildResourcesFromTutorials();

function generateSummary(course: string): string {
  const c = course.toLowerCase();
  if (c.includes('introduction to computing') || c.includes('intcom'))
    return 'Fundamental computing concepts: hardware, software, algorithms, and basic problem solving.';
  if (c.includes('computer programming 1'))
    return 'Covers programming basics: variables, control flow, functions, and problem-solving using C-like syntax.';
  if (c.includes('computer programming 2'))
    return 'Builds on programming fundamentals with data structures, modular design, and intermediate language features.';
  if (c.includes('web') || c.includes('webdev'))
    return 'Introduction to web design and development: HTML, CSS, JavaScript, and responsive layouts.';
  if (c.includes('discrete') || c.includes('discret'))
    return 'Covers logic, set theory, combinatorics, and graph theory foundational to CS theory and algorithms.';
  if (c.includes('digital logic') || c.includes('digilog'))
    return 'Digital circuits and logic design: gates, flip-flops, combinational and sequential circuits.';
  if (c.includes('object oriented') || c.includes('ooprog'))
    return 'Object-oriented programming principles: classes, objects, inheritance, and polymorphism.';
  if (c.includes('platform') || c.includes('op. sys') || c.includes('os'))
    return 'Platform technologies and operating system concepts: processes, memory, and system services.';
  if (c.includes('system analysis') || c.includes('sad'))
    return 'System analysis and design methodologies: requirements, modeling, and design patterns.';
  if (c.includes('applications') || c.includes('appsdev'))
    return 'Application development techniques and emerging technologies for building modern software.';
  if (c.includes('data structure') || c.includes('dastruc'))
    return 'Core data structures and algorithms: arrays, lists, trees, sorting, and algorithmic complexity.';
  if (c.includes('data communications') || c.includes('datacom'))
    return 'Fundamentals of networking and data communication protocols, topologies, and transmission concepts.';
  if (c.includes('information management') || c.includes('db sys') || c.includes('imdbsys'))
    return 'Database fundamentals: relational design, SQL, normalization, and basic database operations.';
  if (c.includes('network') || c.includes('network31'))
    return 'Computer networking principles: OSI model, routing, switching, and network protocols.';
  if (c.includes('security') || c.includes('infosec'))
    return 'Information assurance and security basics: threats, defenses, cryptography, and best practices.';
  if (c.includes('testing') || c.includes('quality'))
    return 'Software testing and quality assurance: test planning, methods, and automation basics.';
  if (c.includes('system integration') || c.includes('sysarch'))
    return 'System integration and architecture concepts: component integration, middleware, and architectures.';
  if (c.includes('human computer interaction') || c.includes('hci'))
    return 'HCI principles: usability, user-centered design, and interaction techniques.';
  if (c.includes('technopreneur') || c.includes('technopreneurship'))
    return 'Technopreneurship topics: startup basics, product-market fit, and tech entrepreneurship.';
  if (c.includes('integrative') || c.includes('intprog'))
    return 'Integrative programming topics combining multiple technologies into cohesive projects.';
  if (c.includes('hacker') || c.includes('hackerrank'))
    return 'Practice coding problems and algorithm challenges to improve problem-solving and contest skills.';
  return `Overview and learning materials for ${course}.`;
}

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

        <nav className="flex items-center justify-center gap-6 mb-10" aria-label="Years">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => { setActiveYear(y); setPage(1); }}
              className={`text-sm md:text-base cursor-pointer mt-25 sm:mt-10  font-medium pb-2 ${
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
    <Card className="group h-full rounded-3xl transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2 border border-gray-100">
      <div className="relative aspect-video overflow-hidden rounded-t-2xl">
        <OptimizedImage
          src={res.image}
          alt={res.title}
          className="w-full h-full object-cover"
          containerClassName="h-full w-full"
        />
        <div className="absolute left-4 top-4">
          <Badge className="bg-white/90 text-[#1C9DDE] px-3 py-1 rounded-full font-semibold border-0">{res.category}</Badge>
        </div>
      </div>

      <CardContent className="flex flex-col gap-3 px-5 pt-4 pb-0">
        <CardTitle className="text-sm font-semibold text-gray-800 truncate">{res.title}</CardTitle>
        <CardDescription className="text-sm text-gray-500 line-clamp-3 flex-1">{res.excerpt}</CardDescription>
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between px-5">
        <button
          onClick={() => {
            if (res.link) window.open(res.link, '_blank', 'noopener');
          }}
          className="text-sm cursor-pointer text-[#1C9DDE] font-medium py-2 px-4 rounded-full border border-[#E6F6FF] hover:bg-[#F2FBFF]"
        >
          Learn more ↗
        </button>
        <span className="text-xs text-gray-400">{res.year}</span>
      </CardFooter>
    </Card>
  );
};

export default ResourcesSection;
