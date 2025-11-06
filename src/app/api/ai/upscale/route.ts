import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { imageData, upscaleFactor = 2 } = await request.json()

    if (!imageData) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      )
    }

    // Get Claid.ai API key from environment
    const apiKey = process.env.CLAID_AI_API_KEY
    if (!apiKey) {
      // For demo purposes, return a mock enhanced image
      console.log('Claid.ai API key not configured, returning mock response')
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      return NextResponse.json({
        success: true,
        enhancedImageUrl: imageData, // Return original for demo
        message: 'Image enhanced (demo mode)',
        upscaleFactor,
        processingTime: '2.0s'
      })
    }

    // Convert base64 to buffer
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '')
    const imageBuffer = Buffer.from(base64Data, 'base64')

    // Create form data for Let's Enhance API
    const formData = new FormData()
    formData.append('image', new Blob([imageBuffer]), 'image.png')
    formData.append('scale', upscaleFactor.toString())

    // Call Claid.ai API
    const response = await fetch('https://api.claid.ai/v1-beta1/image/upscale', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input_image: base64Data,
        upscale_factor: upscaleFactor,
        enhancement: {
          upscale: {
            factor: upscaleFactor,
            mode: 'auto'
          }
        }
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Claid.ai API error: ${errorData.message || 'Unknown error'}`)
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      enhancedImageUrl: result.url,
      message: 'Image enhanced successfully',
      upscaleFactor,
      processingTime: result.processingTime || 'Unknown'
    })

  } catch (error) {
    console.error('Upscaling error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to upscale image',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}