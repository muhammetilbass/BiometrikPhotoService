'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
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
    id: 'vize',
    name: 'Vize Başvurusu',
    slug: 'vize-fotografi',
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    id: 'kimlik',
    name: 'Kimlik Kartı',
    slug: 'kimlik-karti-fotografi',
    color: 'bg-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    id: 'ogrenci-karti',
    name: 'Öğrenci Kartı',
    slug: 'ogrenci-karti-fotografi',
    color: 'bg-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  {
    id: 'is-basvurusu',
    name: 'İş Başvurusu',
    slug: 'is-basvuru-fotografi',
    color: 'bg-indigo-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200'
  }
];

export default function SupportedDocumentTypes() {
  const [documentTypes] = useState<DocumentType[]>(initialDocumentTypes);

  return (
    <Card className="p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {documentTypes.map((type) => (
          <Link key={type.id} href={`/${type.slug}`} className="text-center group cursor-pointer relative block">
            <div className={`w-16 h-16 ${type.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform relative border ${type.borderColor}`}>
              <div className={`w-10 h-12 ${type.color} rounded-sm flex items-center justify-center`}>
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
            </div>
            <p className="font-medium text-sm">{type.name}</p>
          </Link>
        ))}
      </div>
    </Card>
  );
}