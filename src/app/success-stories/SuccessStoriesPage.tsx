import React from 'react'
import Navigation from '@/components/Navigation'
import { Star, TrendingUp, Play, Users, DollarSign, Eye } from 'lucide-react'

export default function SuccessStoriesPage() {
  const stories = [
    {
      id: 1,
      channel: "TechReview Pro",
      creator: "Sarah Chen",
      niche: "Technology Reviews",
      subscribers: "2.5M",
      beforeAfter: {
        ctr: "2.1% → 2.6%",
        views: "150K → 195K per video",
        revenue: "$1,200 → $1,560 per video"
      },
      quote: "My thumbnails looked amazing on phones but terrible on my Samsung TV. ThumbnailTV showed me exactly what was wrong and helped me redesign everything. Views increased by 23% in the first week.",
      metrics: {
        ctrIncrease: "+23%",
        viewIncrease: "+30%",
        revenueIncrease: "+30%",
        timeframe: "First week"
      },
      image: "/success-stories/tech-review.jpg",
      tagline: "From Phone-Perfect to TV-Stunning"
    },
    {
      id: 2,
      channel: "GameZone Network",
      creator: "Mike Rodriguez",
      niche: "Gaming Content",
      subscribers: "1.8M",
      beforeAfter: {
        ctr: "1.8% → 2.3%",
        views: "200K → 255K per video",
        revenue: "$1,600 → $2,040 per video"
      },
      quote: "I was losing so many views because my text was cut off on TV. The AI analysis helped me understand exactly where to place text for maximum visibility. Best $79 I've ever spent on my channel.",
      metrics: {
        ctrIncrease: "+28%",
        viewIncrease: "+28%",
        revenueIncrease: "+28%",
        timeframe: "First month"
      },
      image: "/success-stories/gaming.jpg",
      tagline: "Domination in the Living Room"
    },
    {
      id: 3,
      channel: "Cooking with Emma",
      creator: "Emma Kim",
      niche: "Food & Cooking",
      subscribers: "890K",
      beforeAfter: {
        ctr: "2.5% → 3.1%",
        views: "80K → 99K per video",
        revenue: "$640 → $792 per video"
      },
      quote: "The frame upscaling feature alone is worth it. I can now use perfect moments from my videos as thumbnails. The AI quality is incredible and my audience engagement has never been higher.",
      metrics: {
        ctrIncrease: "+24%",
        viewIncrease: "+24%",
        revenueIncrease: "+24%",
        timeframe: "First 2 weeks"
      },
      image: "/success-stories/cooking.jpg",
      tagline: "Perfect Moments, Perfect Thumbnails"
    }
  ]

  return (