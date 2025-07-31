import { NextResponse } from 'next/server';
import { join } from 'path';
import { readdir } from 'fs/promises';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: 'Fotoğraf ID\'si gerekli' },
        { status: 400 }
      );
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const files = await readdir(uploadDir);
    
    const originalFile = files.find((f: string) => f.startsWith(id));
    const processedFile = files.find((f: string) => f.startsWith(`processed-${id}`));

    if (!originalFile) {
      return NextResponse.json(
        { message: 'Fotoğraf bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id,
      status: processedFile ? 'completed' : 'processing',
      originalUrl: `/uploads/${originalFile}`,
      processedUrl: processedFile ? `/uploads/${processedFile}` : null
    });
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { message: 'Fotoğraf durumu kontrol edilirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 