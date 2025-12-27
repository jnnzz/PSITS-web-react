import { useState, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router';
import { Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'Organizations', href: '/organizations' },
  { name: 'Resources', href: '/resources' },
  { name: 'Shop', href: '/shop', hasDropdown: true },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  /* original imports */
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const location = useLocation();
  const isStaticPage = ['/privacy', '/terms'].includes(location.pathname);

  useMotionValueEvent(scrollY, 'change', latest => {
    if (isStaticPage) {
      setHidden(false);
      return;
    }

    const previous = lastScrollY.current;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  return (
    <div
      className={cn(
        'z-50 flex justify-center px-3 md:px-0 left-0 right-0 top-2 md:top-4',
        isStaticPage ? 'absolute' : 'fixed'
      )}
    >
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={cn(
          'w-full max-w-7xl h-14 md:h-16 bg-white/95 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 px-4 md:px-6 flex items-center justify-between'
        )}
      >
        {/* Logo and Title */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
            <motion.img
              src={logo}
              alt="PSITS Logo"
              className="w-full h-full object-contain"
              whileHover={{ rotate: 10, scale: 1.05 }}
            />
          </div>
          <div className="hidden lg:flex flex-col leading-tight">
            <span className="font-extrabold text-[10px] md:text-sm text-gray-900 tracking-tight">
              PHILIPPINE SOCIETY OF INFORMATION
            </span>
            <span className="font-extrabold text-[10px] md:text-sm text-gray-900 tracking-tight">
              TECHNOLOGY STUDENTS
            </span>
          </div>
          <span className="lg:hidden font-bold text-lg text-gray-900">
            PSITS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-4">
          {navLinks.map(link => (
            <div key={link.name} className="relative group">
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold transition-all duration-200 rounded-full',
                    isActive
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )
                }
              >
                {link.name}
                {link.hasDropdown && (
                  <ChevronDown size={14} className="opacity-50" />
                )}
              </NavLink>
            </div>
          ))}
        </div>

        {/* Right Section: Cart and Sign In */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Cart */}
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-50">
            <ShoppingCart size={20} />
            <span className="text-sm font-semibold hidden xl:inline">Cart</span>
          </button>

          {/* Join Us Button */}
          <Button
            asChild
            className="rounded-full h-9 px-4 md:px-5 bg-[#1c9dde] hover:bg-[#1c9dde]/90 text-white font-semibold shadow-md active:scale-95 transition-all"
          >
            <Link to="/auth/login">Sign in</Link>
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="absolute top-full left-0 right-0 mt-4 mx-4 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-2xl lg:hidden overflow-hidden overflow-y-auto max-h-[80vh] z-[60]"
            >
              <div className="flex flex-col p-4 gap-2">
                {navLinks.map(link => (
                  <NavLink
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between p-4 rounded-2xl transition-all duration-200',
                        isActive
                          ? 'bg-primary/10 text-primary font-bold'
                          : 'text-gray-600 hover:bg-gray-50'
                      )
                    }
                  >
                    <span className="text-lg">{link.name}</span>
                    {link.hasDropdown && (
                      <ChevronDown
                        size={18}
                        className={cn(
                          'transition-transform duration-200',
                          'opacity-50'
                        )}
                      />
                    )}
                  </NavLink>
                ))}
                <div className="h-px bg-gray-100 my-2 mx-2" />
                <div className="flex flex-col gap-2">
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full rounded-2xl py-6 text-base font-semibold"
                  >
                    <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                      Sign in
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full rounded-2xl py-6 text-base font-bold bg-[#1c9dde] shadow-xl"
                  >
                    <Link to="/auth/signup" onClick={() => setIsOpen(false)}>
                      Join Us
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};
