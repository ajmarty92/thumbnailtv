'use client';

import React, { useState, useCallback } from 'react';
import { 
  Layout, 
  Download, 
  Eye, 
  Star,
  Search,
  Filter,
  Grid,
  List,
  Plus,
  Palette,
  Type,
  Image as ImageIcon,
  Zap,
  Heart,
  TrendingUp
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  thumbnail: string;
  tags: string[];
  popularity: number;
  isNew: boolean;
  isPro: boolean;
  author: string;
  downloads: number;
  rating: number;
  elements: {
    textLayers: number;
    imageLayers: number;
    effects: string[];
  };
  usage: string[];
}

interface TemplateLibraryProps {
  onTemplateSelect: (template: Template) => void;
  onApplyTemplate: (template: Template) => void;
}

const templates: Template[] = [
  {
    id: 'gaming-action-1',
    name: 'Action Gaming',
    category: 'Gaming',
    description: 'High-energy gaming template with dynamic text effects',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgwIiBoZWlnaHQ9IjIxNCIgdmlld0JveD0iMCAwIDM4MCAyMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzODAiIGhlaWdodD0iMjE0IiBmaWxsPSIjMUExQTFBIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjM0MCIgaGVpZ2h0PSIxNzQiIGZpbGw9IiMyQjJEMkYiIHJ4PSI4Ii8+Cjx0ZXh0IHg9IjE5MCIgeT0iMTAwIiBmaWxsPSIjRkY2QjZCIiIGZvbnQtZmFtaWx5PSJBbnRvbiIgZm9udC1zaXplPSI0OCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkVQSUM8L3RleHQ+Cjx0ZXh0IHg9IjE5MCIgeT0iMTQwIiBmaWxsPSIjRkZGRkZGIiBmb250LWZhbWlseT0iSW50ZXIiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5HQU1JTkcgQUNUSU9OPC90ZXh0Pgo8L3N2Zz4=',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjExMyIgdmlld0JveD0iMCAwIDIwMCAxMTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTEzIiBmaWxsPSIjMUExQTFQIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNTUiIGZpbGw9IiNGRjZCNkQiIGZvbnQtZmFtaWx5PSJBbnRvbiIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkVQSUM8L3RleHQ+Cjwvc3ZnPg==',
    tags: ['gaming', 'action', 'energy', 'bold'],
    popularity: 95,
    isNew: false,
    isPro: false,
    author: 'LivingRoom Team',
    downloads: 15420,
    rating: 4.8,
    elements: {
      textLayers: 2,
      imageLayers: 1,
      effects: ['stroke', 'shadow', 'glow']
    },
    usage: ['Gaming Channels', 'E-Sports', 'Game Reviews']
  },
  {
    id: 'vlog-lifestyle-1',
    name: 'Lifestyle Vlog',
    category: 'Vlog',
    description: 'Clean and modern design for lifestyle and daily vlogs',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgwIiBoZWlnaHQ9IjIxNCIgdmlld0JveD0iMCAwIDM4MCAyMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzODAiIGhlaWdodD0iMjE0IiBmaWxsPSIjRjdGM0YzIi8+CjxjaXJjbGUgY3g9IjE5MCIgY3k9IjEwNyIgcj0iODAiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+Cjx0ZXh0IHg9IjE5MCIgeT0iMTAwIiBmaWxsPSIjMzMzIiBmb250LWZhbWlseT0iUGxheWZhaXIgRGlzcGxheSIgZm9udC1zaXplPSIzNiIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRFQUxJTElGRTwvdGV4dD4KPHRleHQgeD0iMTkwIiB5PSIxMzAiIGZpbGw9IiM2NjYiIGZvbnQtZmFtaWx5PSJNb250c2VycmF0IiBmb250LXNpemU9IjE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5MaWZlc3R5bGUgQ29udGVudDwvdGV4dD4KPC9zdmc+',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjExMyIgdmlld0JveD0iMCAwIDIwMCAxMTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTEzIiBmaWxsPSIjRjdGM0YyIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI1NiIgcj0iNDAiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNTMiIGZpbGw9IiMzMzMiIGZvbnQtZmFtaWx5PSJQbGF5ZmFpciBEaXNwbGF5IiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+REVBTElMSUZFPS90ZXh0Pgo8L3N2Zz4=',
    tags: ['lifestyle', 'clean', 'modern', 'minimal'],
    popularity: 88,
    isNew: true,
    isPro: false,
    author: 'LivingRoom Team',
    downloads: 8920,
    rating: 4.6,
    elements: {
      textLayers: 2,
      imageLayers: 2,
      effects: ['soft-shadow', 'gradient']
    },
    usage: ['Daily Vlogs', 'Lifestyle', 'Travel']
  },
  {
    id: 'education-tutorial-1',
    name: 'Tutorial Master',
    category: 'Education',
    description: 'Professional tutorial template with clear hierarchy',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgwIiBoZWlnaHQ9IjIxNCIgdmlld0JveD0iMCAwIDM4MCAyMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzODAiIGhlaWdodD0iMjE0IiBmaWxsPSIjMDAyMjU1Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI0ZGRjY2NiIgcng9IjQiLz4KPHRleHQgeD0iOTAiIHk9IjU1IiBmaWxsPSIjMDAyMjU1IiBmb250LWZhbWlseT0iT3N3YWxkIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VFVUT1JJQUw8L3RleHQ+Cjx0ZXh0IHg9IjE5MCIgeT0iMTMwIiBmaWxsPSIjRkZGRkZGIiBmb250LWZhbWlseT0iUm9ib3RvIiBmb250LXNpemU9IjMyIiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RWFzeSBHdWlkZTwvdGV4dD4KPHRleHQgeD0iMTkwIiB5PSIxNjAiIGZpbGw9IiNDQ0NDQ0MiIGZvbnQtZmFtaWx5PSJSb2JvdG8iIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxlYXJuIGluIDEwIHN0ZXBzPC90ZXh0Pgo8L3N2Zz4=',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjExMyIgdmlld0JveD0iMCAwIDIwMCAxMTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTEzIiBmaWxsPSIjMDAyMjU1Ii8+CjxyZWN0IHg9IjEwIiB5PSIxNSIgd2lkdGg9IjcwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjRkZGNjY2IiByeD0iMiIvPgo8dGV4dCB4PSI0NSIgeT0iMzQiIGZpbGw9IiMwMDIyNTUiIGZvbnQtZmFtaWx5PSJPc3dhbGQiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5UVVRPUklBTDwvdGV4dD4KPHRleHQgeD0iMTAwIiB5PSI3MCIgZmlsbD0iI0ZGRkZGRiIgZm9udC1mYW1pbHk9IlJvYm90byIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkVhc3kgR3VpZGU8L3RleHQ+Cjwvc3ZnPg==',
    tags: ['education', 'tutorial', 'professional', 'clear'],
    popularity: 92,
    isNew: false,
    isPro: false,
    author: 'LivingRoom Team',
    downloads: 12100,
    rating: 4.7,
    elements: {
      textLayers: 3,
      imageLayers: 1,
      effects: ['border', 'highlight']
    },
    usage: ['Tutorials', 'How-to Guides', 'Educational Content']
  },
  {
    id: 'music-beats-1',
    name: 'Music Beats',
    category: 'Music',
    description: 'Dynamic music template with audio visual elements',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgwIiBoZWlnaHQ9IjIxNCIgdmlld0JveD0iMCAwIDM4MCAyMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdycmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGNjBCNjtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOUMyQ0ZDO3N0b3Atb3BhY2l0eToxIiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIzODAiIGhlaWdodD0iMjE0IiBmaWxsPSJ1cmwoI2dncmFkKSIvPgo8cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIzNDAiIGhlaWdodD0iMTc0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiIgcng9IjgiLz4KPHRleHQgeD0iMTkwIiB5PSIxMDAiIGZpbGw9IiNGRkZGRkYiIGZvbnQtZmFtaWx5PSJBbnRvbiIgZm9udC1zaXplPSI0OCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJFQVRTPC90ZXh0Pgo8L3N2Zz4=',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjExMyIgdmlld0JveD0iMCAwIDIwMCAxMTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdncmFkMiIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjYwQjY7c3RvcC1vcGFjaXR5OjEiIC8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzlDMkNGQztzdG9wLW9wYWNpdHk6MSIgLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjExMyIgZmlsbD0idXJsKCNncmFkMikiLz4KPHRleHQgeD0iMTAwIiB5PSI1NSIgZmlsbD0iI0ZGRkZGRiIgZm9udC1mYW1pbHk9IkFudG9uIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QkVBVFM8L3RleHQ+Cjwvc3ZnPg==',
    tags: ['music', 'audio', 'gradient', 'dynamic'],
    popularity: 87,
    isNew: false,
    isPro: true,
    author: 'Pro Designer',
    downloads: 6780,
    rating: 4.9,
    elements: {
      textLayers: 1,
      imageLayers: 2,
      effects: ['gradient', 'border', 'glow']
    },
    usage: ['Music Videos', 'Audio Production', 'DJ Mixes']
  },
  {
    id: 'tech-review-1',
    name: 'Tech Review',
    category: 'Technology',
    description: 'Modern tech template with clean typography',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgwIiBoZWlnaHQ9IjIxNCIgdmlld0JveD0iMCAwIDM4MCAyMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzODAiIGhlaWdodD0iMjE0IiBmaWxsPSIjMUExQTFQIi8+Cjxwb2x5Z29uIHBvaW50cz0iMjAsMjAgMzYwLDIwIDM4MCwxMDcgMzYwLDE5NCAyMCwxOTQiIGZpbGw9IiMwMEJFRkYiIG9wYWNpdHk9IjAuMSIvPgo8dGV4dCB4PSIxOTAiIHk9IjgwIiBmaWxsPSIjMDBCRUZGIiBmb250LWZhbWlseT0iUm9ib3RvIiBmb250LXNpemU9IjM2IiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VEVDSCBSRVZJRTc8L3RleHQ+Cjx0ZXh0IHg9IjE5MCIgeT0iMTIwIiBmaWxsPSIjMzMzIiBmb250LWZhbWlseT0iUm9ib3RvIiBmb250LXNpemU9IjE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5MYXRlc3QgR2FkZ2V0cyAmIE1vcmU8L3RleHQ+Cjwvc3ZnPg==',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjExMyIgdmlld0JveD0iMCAwIDIwMCAxMTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTEzIiBmaWxsPSIjMUExQTFQIi8+Cjxwb2x5Z29uIHBvaW50cz0iMTAsMTAgMTkwLDEwIDIwMCw1NiAxOTAsMTA0IDEwLDEwNCIgZmlsbD0iIzAwQkVGRiIgb3BhY2l0eT0iMC4xIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNDMiIGZpbGw9IiMwMEJFRkYiIGZvbnQtZmFtaWx5PSJSb2JvdG8iIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5URUNIIFJFVklFVzwvdGV4dD4KPC9zdmc+',
    tags: ['tech', 'modern', 'minimal', 'professional'],
    popularity: 90,
    isNew: false,
    isPro: false,
    author: 'LivingRoom Team',
    downloads: 11200,
    rating: 4.7,
    elements: {
      textLayers: 2,
      imageLayers: 1,
      effects: ['shadow', 'opacity']
    },
    usage: ['Tech Reviews', 'Product Launches', 'Gadgets']
  },
  {
    id: 'food-cuisine-1',
    name: 'Food Cuisine',
    category: 'Food',
    description: 'Appetizing food template with warm colors',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgwIiBoZWlnaHQ9IjIxNCIgdmlld0JveD0iMCAwIDM4MCAyMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzODAiIGhlaWdodD0iMjE0IiBmaWxsPSIjRkY3RTAwIi8+CjxjaXJjbGUgY3g9IjMwMCIgY3k9IjUwIiByPSI0MCIgZmlsbD0iI0ZGQkIwMCIgb3BhY2l0eT0iMC4zIi8+Cjx0ZXh0IHg9IjE5MCIgeT0iOTAiIGZpbGw9IiNGRkZGRkYiIGZvbnQtZmFtaWx5PSJQbGF5ZmFpciBEaXNwbGF5IiBmb250LXNpemU9IjQ4IiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+REVSSUNPVVM8L3RleHQ+Cjx0ZXh0IHg9IjE5MCIgeT0iMTMwIiBmaWxsPSIjRkZGRkZGIiBmb250LWZhbWlseT0iT250Zm9yZCIgZm9udC1zaXplPSIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RGlzaGVzIFlvdSdsbCBMb3ZlPC90ZXh0Pgo8L3N2Zz4=',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjExMyIgdmlld0JveD0iMCAwIDIwMCAxMTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTEzIiBmaWxsPSIjRkY3RTAwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNDciIGZpbGw9IiNGRkZGRkYiIGZvbnQtZmFtaWx5PSJQbGF5ZmFpciBEaXNwbGF5IiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+REVSSUNPVVM8L3RleHQ+Cjwvc3ZnPg==',
    tags: ['food', 'cuisine', 'warm', 'appetizing'],
    popularity: 85,
    isNew: true,
    isPro: false,
    author: 'LivingRoom Team',
    downloads: 7450,
    rating: 4.5,
    elements: {
      textLayers: 2,
      imageLayers: 2,
      effects: ['shadow', 'gradient-overlay']
    },
    usage: ['Cooking', 'Recipe Videos', 'Food Reviews']
  }
];

const categories = ['All', 'Gaming', 'Vlog', 'Education', 'Music', 'Technology', 'Food'];
const sortOptions = ['Popular', 'Newest', 'Rating', 'Downloads'];

export default function TemplateLibrary({ 
  onTemplateSelect, 
  onApplyTemplate 
}: TemplateLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const filteredTemplates = templates
    .filter(template => {
      const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Popular':
          return b.popularity - a.popularity;
        case 'Newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'Rating':
          return b.rating - a.rating;
        case 'Downloads':
          return b.downloads - a.downloads;
        default:
          return 0;
      }
    });

  const handleTemplateClick = useCallback((template: Template) => {
    setSelectedTemplate(template);
    onTemplateSelect(template);
  }, [onTemplateSelect]);

  const handleApplyTemplate = useCallback(() => {
    if (selectedTemplate) {
      onApplyTemplate(selectedTemplate);
    }
  }, [selectedTemplate, onApplyTemplate]);

  const formatDownloads = (count: number): string => {
    if (count >= 10000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Layout className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Template Library</h3>
            <p className="text-sm text-gray-500">Professional templates for every niche</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
          >
            <Grid className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
          >
            <List className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <p className="text-sm text-gray-500">
            {filteredTemplates.length} templates found
          </p>
        </div>
      </div>

      {/* Templates Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className={`
              border rounded-lg overflow-hidden cursor-pointer transition-all
              ${selectedTemplate?.id === template.id
                ? 'border-green-500 ring-2 ring-green-200'
                : 'border-gray-200 hover:border-gray-300'
              }
              ${viewMode === 'list' ? 'flex' : ''}
            `}
            onClick={() => handleTemplateClick(template)}
          >
            <div className={viewMode === 'list' ? 'w-32 h-20 flex-shrink-0' : 'h-40'}>
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover"
              />
              {template.isNew && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">
                  NEW
                </div>
              )}
              {template.isPro && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded">
                  PRO
                </div>
              )}
            </div>
            
            <div className={viewMode === 'list' ? 'flex-1 p-3' : 'p-4'}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{template.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTemplate(template);
                    setShowPreview(true);
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <Eye className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-gray-600 ml-1">{template.rating}</span>
                </div>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-600">{formatDownloads(template.downloads)} downloads</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {template.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Template Details */}
      {selectedTemplate && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-medium text-gray-900 text-lg">{selectedTemplate.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{selectedTemplate.description}</p>
              <p className="text-xs text-gray-500 mt-1">by {selectedTemplate.author}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm text-gray-600 ml-1">{selectedTemplate.rating}</span>
              </div>
              <span className="text-sm text-gray-500">{formatDownloads(selectedTemplate.downloads)} downloads</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Type className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{selectedTemplate.elements.textLayers} text layers</span>
            </div>
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{selectedTemplate.elements.imageLayers} image layers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Palette className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{selectedTemplate.elements.effects.length} effects</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{selectedTemplate.popularity}% popular</span>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Best for:</p>
            <div className="flex flex-wrap gap-2">
              {selectedTemplate.usage.map((usage) => (
                <span
                  key={usage}
                  className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                >
                  {usage}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleApplyTemplate}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Apply Template</span>
            </button>
            <button
              onClick={() => setShowPreview(true)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedTemplate.name} Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                <img
                  src={selectedTemplate.preview}
                  alt={selectedTemplate.name}
                  className="max-w-full max-h-[400px] object-contain rounded shadow-lg"
                />
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => {
                    handleApplyTemplate();
                    setShowPreview(false);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Apply Template</span>
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Footer */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">{templates.length}</p>
            <p className="text-xs text-gray-600">Total Templates</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">6</p>
            <p className="text-xs text-gray-600">Categories</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">50k+</p>
            <p className="text-xs text-gray-600">Total Downloads</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">4.7</p>
            <p className="text-xs text-gray-600">Avg. Rating</p>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-3 text-center">
          Professionally designed templates optimized for 4K thumbnails and TV viewing
        </p>
      </div>
    </div>
  );
}