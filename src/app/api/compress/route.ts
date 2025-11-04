import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Demo mode - simulate compression
    const originalSize = file.size
    const targetSize = 50 * 1024 * 1024 // 50MB
    const compressionRatio = Math.min(targetSize / originalSize, 1)

    return NextResponse.json({
      success: true,
      originalSize,
      compressedSize: Math.floor(originalSize * compressionRatio),
      compressionRatio: compressionRatio * 100,
      message: 'Demo mode - compression simulated'
    })
  } catch (error) {
    console.error('Compression error:', error)
    return NextResponse.json(
      { error: 'Compression failed' },
      { status: 500 }
    )
  }
}
