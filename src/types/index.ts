export interface CompressionResult {
  originalSize: number
  compressedSize: number
  compressionRatio: number
  platformCompliant: boolean
}

export interface UpscaleResult {
  originalResolution: string
  targetResolution: string
  enhancements: string[]
}

export interface AIAnalysis {
  issues: string[]
  recommendations: string[]
  score: number
}
