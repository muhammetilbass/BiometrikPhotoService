"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Menu, X, ChevronDown } from 'lucide-react';
import PhotoCreationModal from '@/components/PhotoCreationModal';

export default function Header() {
  const [menuAcik, setMenuAcik] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Camera className="h-7 w-7 text-blue-600" />
            <span className="text-xl font-bold">
              <span className="text-blue-600">Biyometrik</span>
              <span className="text-gray-900">Foto</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 ml-8">
            <div className="relative group">
              <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium group">
                <span className="group-hover:hidden">Belge Türleri</span>
                <span className="hidden group-hover:inline">Belge seç</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              <div className="absolute left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-3">
                  <div className="px-4 py-2">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Popüler Belgeler</h3>
                  </div>
                  <Link href="/pasaport-fotografi" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-xs font-bold">TR</span>
                    </div>
                    <div>
                      <div className="font-medium">Türk Pasaportu</div>
                      <div className="text-sm text-gray-500">50x60mm</div>
                    </div>
                  </Link>
                  <Link href="/kimlik-karti-fotografi" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 text-xs font-bold">ID</span>
                    </div>
                    <div>
                      <div className="font-medium">TC Kimlik Kartı</div>
                      <div className="text-sm text-gray-500">32x40mm</div>
                    </div>
                  </Link>
                  <Link href="/ehliyet-fotografi" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-orange-600 text-xs font-bold">DL</span>
                    </div>
                    <div>
                      <div className="font-medium">Ehliyet</div>
                      <div className="text-sm text-gray-500">50x60mm</div>
                    </div>
                  </Link>
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <Link href="/standartlar" className="block px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors font-medium text-center">
                      Tüm belge türlerini görüntüle
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link 
              href="/sss" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Nasıl Çalışır?
            </Link>
          </nav>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4 ml-auto">
            <div className="hidden md:block group">
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Belge seç
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden p-2"
              onClick={() => setMenuAcik(!menuAcik)}
            >
              {menuAcik ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Menüyü aç</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuAcik && (
          <div className="md:hidden border-t bg-white">
            <div className="py-4 space-y-3">
               <div className="px-4">
                 <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Belge Türleri</p>
                 <div className="space-y-2">
                   <Link
                     href="/pasaport-fotografi"
                     className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                     onClick={() => setMenuAcik(false)}
                   >
                     Pasaport Fotoğrafı
                   </Link>
                   <Link
                     href="/ehliyet-fotografi"
                     className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                     onClick={() => setMenuAcik(false)}
                   >
                     Ehliyet Fotoğrafı
                   </Link>
                   <Link
                     href="/kimlik-karti-fotografi"
                     className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                     onClick={() => setMenuAcik(false)}
                   >
                     Kimlik Kartı
                   </Link>
                 </div>
               </div>
               
               <div className="border-t border-gray-200 pt-3">
                 <Link
                   href="/standartlar"
                   className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                   onClick={() => setMenuAcik(false)}
                 >
                   Tüm Standartlar
                 </Link>
                 <Link
                   href="/sss"
                   className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                   onClick={() => setMenuAcik(false)}
                 >
                   Nasıl Çalışır?
                 </Link>
               </div>
              
              <div className="px-4 pt-2">
                <Button 
                  onClick={() => {
                    setIsModalOpen(true);
                    setMenuAcik(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Belge seç
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Photo Creation Modal */}
      <PhotoCreationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </header>
  );
}