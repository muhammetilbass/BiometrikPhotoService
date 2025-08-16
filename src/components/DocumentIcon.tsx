import React from 'react';
import Link from 'next/link';

interface DocumentIconProps {
  href: string;
  title: string;
  bgColor: 'blue' | 'green' | 'red' | 'orange' | 'indigo';
  iconColor: 'blue' | 'green' | 'red' | 'orange' | 'indigo';
}

const colorMap = {
  blue: { bg: 'bg-blue-100', icon: 'bg-blue-600' },
  green: { bg: 'bg-green-100', icon: 'bg-green-600' },
  red: { bg: 'bg-red-100', icon: 'bg-red-600' },
  orange: { bg: 'bg-orange-100', icon: 'bg-orange-600' },
  indigo: { bg: 'bg-indigo-100', icon: 'bg-indigo-600' }
};

export default function DocumentIcon({ href, title, bgColor, iconColor }: DocumentIconProps) {
  const colors = colorMap[bgColor];
  const iconColors = colorMap[iconColor];

  return (
    <Link href={href} className="p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mx-auto mb-2`}>
        <div className={`w-8 h-10 ${iconColors.icon} rounded-sm flex items-center justify-center`}>
          <div className="w-5 h-5 bg-white rounded-full"></div>
        </div>
      </div>
      <p className="font-medium text-sm">{title}</p>
    </Link>
  );
}