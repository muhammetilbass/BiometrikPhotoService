import { NextResponse } from 'next/server';
import { join } from 'path';
import { readFile, writeFile, readdir } from 'fs/promises';
import sharp from 'sharp';

export async function POST(request: Request) {
  try {
    const { id, documentType } = await request.json();

    if (!id || !documentType) {
      return NextResponse.json(
        { message: 'Geçersiz istek parametreleri' },
        { status: 400 }
      );
    }

    // Fotoğraf boyutlarını belirle
    const dimensions = {
      'pasaport': { width: 600, height: 600 },
      'kimlik': { width: 600, height: 600 },
      'ehliyet': { width: 600, height: 600 }
    };

    const { width, height } = dimensions[documentType as keyof typeof dimensions] || dimensions.pasaport;

    // Orijinal fotoğrafı oku
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const files = await readdir(uploadDir);
    const originalFile = files.find((f: string) => f.startsWith(id));
    
    if (!originalFile) {
      return NextResponse.json(
        { message: 'Fotoğraf bulunamadı' },
        { status: 404 }
      );
    }

    const originalPath = join(uploadDir, originalFile);
    const processedPath = join(uploadDir, `processed-${originalFile}`);

    // Fotoğrafı işle
    await sharp(originalPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 90 })
      .toFile(processedPath);

    return NextResponse.json({
      id,
      url: `/uploads/processed-${originalFile}`,
      status: 'completed'
    });
  } catch (error) {
    console.error('Process error:', error);
    return NextResponse.json(
      { message: 'Fotoğraf işlenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}