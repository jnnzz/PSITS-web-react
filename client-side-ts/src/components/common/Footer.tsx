import { Link } from 'react-router';
import { CardDescription, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import logo from '@/assets/logo.png';
import { ArrowRight, Facebook, Github, Mail, MapPin } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { BackgroundText } from './BackgroundText';

interface FooterLinkProps {
  title: string;
  href: string;
}

const FooterLink = ({ title, href }: FooterLinkProps) => {
  return (
    <Link
      to={href}
      className="text-sm transition-colors duration-200 text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transform"
    >
      {title}
    </Link>
  );
};

export const Footer = () => {
  const quickLinks = [
    { title: 'Home', href: '/' },
    { title: 'Events', href: '/events' },
    { title: 'Organizations', href: '/organizations' },
  ];

  const legalLinks = [
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
  ];

  return (
    <footer className="relative mt-auto overflow-hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 pt-16 pb-16 md:pb-24 lg:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Section */}
          <div className="flex flex-col gap-6 col-span-1 lg:col-span-2">
            <div className="flex gap-4 items-center group">
              <div className="relative">
                <img
                  src={logo}
                  alt="PSITS Logo"
                  className="h-14 w-14 object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <CardTitle className="leading-tight text-md font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent tracking-tight">
                  Philippine Society of Information Technology
                </CardTitle>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mt-1">
                  Student Chapter
                </p>
              </div>
            </div>
            <CardDescription className="max-w-md text-sm leading-relaxed text-muted-foreground/80">
              Empowering the next generation of IT professionals through
              innovation, collaboration, and professional excellence. Join our
              community and shape the future of technology in the Philippines.
            </CardDescription>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
                { icon: Github, href: '#', color: 'hover:bg-zinc-800' },
                { icon: FaDiscord, href: '#', color: 'hover:bg-indigo-600' },
              ].map((social, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="icon"
                  className={cn(
                    'rounded-full transition-all duration-300 hover:text-white',
                    social.color
                  )}
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noreferrer">
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80">
              Navigation
            </h3>
            <nav className="flex flex-col gap-3.5">
              {quickLinks.map(link => (
                <FooterLink key={link.href} {...link} />
              ))}
            </nav>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80">
              Stay Connected
            </h3>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3.5 text-sm text-muted-foreground/90">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="leading-snug pt-0.5">
                  Sanciangko St., Cebu City, Central Visayas
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-muted-foreground font-medium">
                  Join our newsletter for updates
                </p>
                <form className="flex" onSubmit={e => e.preventDefault()}>
                  <div className="relative flex-1 group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 transition-colors group-focus-within:text-primary" />
                    <Input
                      type="email"
                      placeholder="Your email address"
                      className="pl-9 pr-11 rounded-full bg-muted/30 border-muted group-focus-within:bg-background transition-all"
                    />
                    <Button
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full shrink-0 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-95 group"
                    >
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted-foreground/60 font-medium">
            © {new Date().getFullYear()} PSITS Student Chapter. Designed with
            excellence.
          </p>
          <div className="flex gap-8">
            {legalLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="text-xs text-muted-foreground/60 hover:text-primary transition-colors font-medium"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <BackgroundText
        text="PSITS"
        parentStyle="absolute -bottom-16 sm:-bottom-24 md:-bottom-32 lg:-bottom-44 xl:-bottom-56 left-1/2 -translate-x-1/2 w-full text-center -z-10"
        childStyle="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/80"
      />
    </footer>
  );
};
