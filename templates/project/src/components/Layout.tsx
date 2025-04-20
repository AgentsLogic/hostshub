import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, Bed, Mountain, Camera, Mail, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  propertyData: {
    name: string;
    description: string;
    address: string;
  };
}

export const Layout = ({ children, propertyData }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Accommodations', href: '/accommodations', icon: Bed },
    { name: 'Activities', href: '/activities', icon: Mountain },
    { name: 'Gallery', href: '/gallery', icon: Camera },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-serif text-gray-900">Twin Hills River Ranch</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  // className={`${
                  //   router.pathname === item.href // Cannot use router in RSC
                  //     ? 'text-blue-600'
                  //     : 'text-gray-700 hover:text-blue-600'
                  // } flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200`}
                   className="text-gray-700 hover:text-blue-600 flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200" // Simplified for RSC
                >
                  <item.icon className="h-4 w-4 mr-1" />
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu button - needs client component */}
            {/* <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div> */}
          </div>
        </div>

        {/* Mobile Navigation - needs client component */}
        {/* {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    router.pathname === item.href // Cannot use router in RSC
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  } flex items-center px-3 py-2 text-base font-medium transition-colors duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )} */}
      </nav>

      <main className="pt-16">
        {children}
      </main>

      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{propertyData.name}</h3>
              <p className="text-gray-300">
                {propertyData.description}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              {/* Assuming a static Facebook link for now */}
              <a
                href="#" // Replace with dynamic link if available in propertyData
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Facebook
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} {propertyData.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
