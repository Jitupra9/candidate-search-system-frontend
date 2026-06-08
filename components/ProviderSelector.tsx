'use client'

import { X } from 'lucide-react'

interface ProviderSelectorProps {
  provider: string
  model: string
  temperature: number
  onProviderChange: (provider: string) => void
  onModelChange: (model: string) => void
  onTemperatureChange: (temp: number) => void
  onClose: () => void
}

const providers: Record<string, { label: string; models: string[] }> = {
  openai: {
    label: 'OpenAI',
    models: ['gpt-4-turbo', 'gpt-4o', 'gpt-4o-mini'],
  },
  anthropic: {
    label: 'Anthropic Claude',
    models: ['claude-opus-4.1', 'claude-sonnet-4', 'claude-haiku-3'],
  },
  gemini: {
    label: 'Google Gemini',
    models: ['gemini-pro', 'gemini-pro-vision'],
  },
}

export default function ProviderSelector({
  provider,
  model,
  temperature,
  onProviderChange,
  onModelChange,
  onTemperatureChange,
  onClose,
}: ProviderSelectorProps) {
  const currentModels = providers[provider]?.models || []

  return (
    <div className="border-b border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-foreground">Model Settings</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-muted rounded transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Provider Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Provider
          </label>
          <select
            value={provider}
            onChange={(e) => onProviderChange(e.target.value)}
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {Object.entries(providers).map(([key, { label }]) => (
              <option key={key} value={key} className="bg-card">
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Model Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Model
          </label>
          <select
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {currentModels.map((m) => (
              <option key={m} value={m} className="bg-card">
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Temperature Control */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Temperature: {temperature.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <p className="text-xs text-muted-foreground mt-2">
            {temperature < 0.3 && 'Focused'}
            {temperature >= 0.3 && temperature < 0.7 && 'Balanced'}
            {temperature >= 0.7 && 'Creative'}
          </p>
        </div>
      </div>
    </div>
  )
}
