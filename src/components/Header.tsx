"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, ChevronDown, Menu, X } from 'lucide-react';
import PhotoCreationModal from '@/components/PhotoCreationModal';

export default function Header() {
  const [menuAcik, setMenuAcik] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Camera className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              <span className="text-primary">Biyometrik</span>
              <span className="text-foreground">Foto</span>
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <div className="relative group">
              <button className="flex items-center text-foreground/60 transition-colors hover:text-foreground/80 px-3 py-2 rounded-md hover:bg-accent">
                <span>Belge Seçin</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              <div className="absolute left-0 mt-2 w-80 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-3">Popüler Belge Tipleri</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <Link href="/pasaport-fotografi" className="flex items-center space-x-3 px-3 py-3 hover:bg-accent rounded-md transition-colors group/item">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="w-8 h-10 bg-blue-600 rounded-sm flex items-center justify-center">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-sm">Pasaport Fotoğrafı</div>
                        <div className="text-xs text-muted-foreground">35x45mm, beyaz arka plan</div>
                      </div>
                    </Link>
                    <Link href="/ehliyet-fotografi" className="flex items-center space-x-3 px-3 py-3 hover:bg-accent rounded-md transition-colors group/item">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="w-8 h-6 bg-green-600 rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-sm">Ehliyet Fotoğrafı</div>
                        <div className="text-xs text-muted-foreground">50x60mm, açık arka plan</div>
                      </div>
                    </Link>
                    <Link href="/olustur?tip=vize" className="flex items-center space-x-3 px-3 py-3 hover:bg-accent rounded-md transition-colors group/item">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="w-8 h-10 bg-purple-600 rounded-sm flex items-center justify-center">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-sm">Vize Başvurusu</div>
                        <div className="text-xs text-muted-foreground">Ülkeye göre değişken boyutlar</div>
                      </div>
                    </Link>
                    <div className="-mx-1 my-1 h-px bg-muted"></div>
                    <Link href="/standartlar" className="block select-none space-y-1 rounded-sm p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-primary font-medium">
                      Tüm Belge Tipleri
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <Link 
              href="/standartlar" 
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Fotoğraf Standartları
            </Link>
            
            <Link 
              href="/sss" 
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Nasıl Çalışır?
            </Link>
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Mobile logo */}
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <Camera className="h-6 w-6 text-primary" />
              <span className="font-bold">
                <span className="text-primary">Biyometrik</span>
                <span className="text-foreground">Foto</span>
              </span>
            </Link>
          </div>
          <nav className="flex items-center">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="hidden md:inline-flex"
            >
              <Camera className="mr-2 h-4 w-4" />
              Fotoğraf Oluştur
            </Button>
            <Button
              variant="ghost"
              className="ml-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              onClick={() => setMenuAcik(!menuAcik)}
            >
              {menuAcik ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Menüyü aç</span>
            </Button>
          </nav>
        </div>
      </div>

      {menuAcik && (
        <div className="border-t md:hidden">
          <div className="grid gap-2 p-4">
            <div className="px-2 py-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Belge Seçin</p>
            </div>
            <Link
              href="/olustur?tip=pasaport"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              onClick={() => setMenuAcik(false)}
            >
              Pasaport
            </Link>
            <Link
              href="/olustur?tip=ehliyet"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              onClick={() => setMenuAcik(false)}
            >
              Ehliyet
            </Link>
            <Link
              href="/olustur?tip=vize"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              onClick={() => setMenuAcik(false)}
            >
              Vize Başvurusu
            </Link>
            <Link
              href="/standartlar"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              onClick={() => setMenuAcik(false)}
            >
              Fotoğraf Standartları
            </Link>
            <Link
              href="/sss"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              onClick={() => setMenuAcik(false)}
            >
              Nasıl Çalışır?
            </Link>
            
            <div className="pt-2">
              <Button 
                onClick={() => {
                  setIsModalOpen(true);
                  setMenuAcik(false);
                }}
                className="w-full"
              >
                <Camera className="mr-2 h-4 w-4" />
                Fotoğraf Oluştur
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Photo Creation Modal */}
      <PhotoCreationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </header>
  );
}