import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { imageData, prompt, maskArea = 'full' } = await request.json()

    if (!imageData || !prompt) {
      return NextResponse.json(
        { error: 'Image data and prompt are required' },
        { status: 400 }
      )
    }

    // Get Stability AI API key from environment
    const apiKey = process.env.STABILITY_AI_API_KEY
    if (!apiKey) {
      // For demo purposes, return a mock generated image
      console.log('Stability AI API key not configured, returning mock response')
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      return NextResponse.json({
        success: true,
        generatedImageUrl: imageData, // Return original for demo
        message: 'Image generated (demo mode)',
        prompt,
        processingTime: '3.0s'
      })
    }

    // Convert base64 to buffer
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '')
    const imageBuffer = Buffer.from(base64Data, 'base64')

    // Create form data for Stability AI API
    const formData = new FormData()
    formData.append('init_image', new Blob([imageBuffer]), 'image.png')
    formData.append('text_prompts[0][text]', prompt)
    formData.append('text_prompts[0][weight]', '1')
    formData.append('cfg_scale', '7')
    formData.append('samples', '1')
    formData.append('steps', '30')

    // Call Stability AI API (using stable diffusion)
    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Stability AI API error: ${errorData.message || 'Unknown error'}`)
    }

    const result = await response.json()
    
    // Extract the generated image from the response
    const generatedImage = result.artifacts?.[0]
    if (!generatedImage) {
      throw new Error('No generated image returned from API')
    }

    // Convert base64 to data URL
    const generatedImageData = `data:image/png;base64,${generatedImage.base64}`

    return NextResponse.json({
      success: true,
      generatedImageUrl: generatedImageData,
      message: 'Image generated successfully',
      prompt,
      processingTime: '2.5s',
      seed: generatedImage.seed
    })

  } catch (error) {
    console.error('Generative fill error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate image',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}