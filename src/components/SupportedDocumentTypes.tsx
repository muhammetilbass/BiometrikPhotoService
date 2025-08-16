'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface DocumentType {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  slug: string;
}

const initialDocumentTypes: DocumentType[] = [
  {
    id: 'pasaport',
    name: 'Pasaport',
    slug: 'pasaport-fotografi',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 'ehliyet',
    name: 'Ehliyet',
    slug: 'ehliyet-fotografi',
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },

  {
    id: 'kimlik',
    name: 'T.C. Kimlik Kartı',
    slug: 'kimlik-karti-fotografi',
    color: 'bg-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    id: 'ogrenci',
    name: 'Öğrenci Kartı',
    slug: 'ogrenci-karti-fotografi',
    color: 'bg-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  {
    id: 'osym',
    name: 'ÖSYM Sınavları',
    slug: 'osym-sinav-fotografi',
    color: 'bg-indigo-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200'
  },
  {
    id: 'is-basvuru',
    name: 'İş Başvurusu',
    slug: 'is-basvuru-fotografi',
    color: 'bg-teal-500',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200'
  }
];

export default function SupportedDocumentTypes() {
  const [documentTypes] = useState<DocumentType[]>(initialDocumentTypes);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {documentTypes.map((type) => (
        <div key={type.id} className="group">
          <Link href={`/${type.slug}`} className="block">
            <div className={`relative w-full aspect-square ${type.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300 border-2 ${type.borderColor} overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className={`w-12 h-16 ${type.color} rounded-lg flex items-center justify-center shadow-lg relative z-10`}>
                <div className="w-8 h-8 bg-white rounded-full shadow-inner"></div>
              </div>
            </div>
            <h3 className="font-semibold text-center text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{type.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}