'use client'

import { useState } from 'react'
import { Upload, User } from 'lucide-react'

interface CandidateUploadSectionProps {
  onUpload: (candidates: any[]) => void
}

export default function CandidateUploadSection({ onUpload }: CandidateUploadSectionProps) {
  const [dragActive, setDragActive] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    skills: '',
    role: '',
    expectedSalary: '',
    noticePeriod: '',
  })

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    const resumes = files
      .filter((file) => file.type === 'application/pdf' || file.type === 'text/plain')
      .map((file) => ({
        id: `cand_${Date.now()}_${Math.random()}`,
        name: file.name.replace(/\.[^/.]+$/, ''),
        email: 'candidate@example.com',
        phone: '9999999999',
        location: 'Unknown',
        experience: 0,
        skills: [],
        role: 'Not Specified',
        resumeFile: file.name,
        status: 'processing',
        uploadedAt: new Date().toISOString(),
      }))

    if (resumes.length > 0) {
      onUpload(resumes)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const resumes = files
      .filter((file) => file.type === 'application/pdf' || file.type === 'text/plain')
      .map((file) => ({
        id: `cand_${Date.now()}_${Math.random()}`,
        name: file.name.replace(/\.[^/.]+$/, ''),
        email: 'candidate@example.com',
        phone: '9999999999',
        location: 'Unknown',
        experience: 0,
        skills: [],
        role: 'Not Specified',
        resumeFile: file.name,
        status: 'processing',
        uploadedAt: new Date().toISOString(),
      }))

    if (resumes.length > 0) {
      onUpload(resumes)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const candidate = {
      id: `cand_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      experience: parseInt(formData.experience) || 0,
      skills: formData.skills.split(',').map((s) => s.trim()),
      role: formData.role,
      expectedSalary: formData.expectedSalary,
      noticePeriod: formData.noticePeriod,
      resumeFile: 'manual_entry.txt',
      status: 'done',
      uploadedAt: new Date().toISOString(),
    }
    onUpload([candidate])
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      experience: '',
      skills: '',
      role: '',
      expectedSalary: '',
      noticePeriod: '',
    })
    setShowForm(false)
  }

  return (
    <div className="h-full flex flex-col">
      {!showForm ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors flex-1 flex flex-col items-center justify-center ${
            dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
          }`}
        >
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Upload Resumes</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop resume files or manually enter candidate details
          </p>
          <div className="flex gap-3 flex-col sm:flex-row">
            <label className="relative">
              <input
                type="file"
                multiple
                accept=".pdf,.txt"
                onChange={handleFileInput}
                className="hidden"
              />
              <span className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm cursor-pointer hover:bg-primary/90 transition-colors inline-block">
                Choose Files
              </span>
            </label>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium text-sm hover:bg-secondary/90 transition-colors"
            >
              Add Manually
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-4 overflow-y-auto flex-1 pb-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="City, Country"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Current Role
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Job title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Python, FastAPI, Redis"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Expected Salary
            </label>
            <input
              type="text"
              value={formData.expectedSalary}
              onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
              className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., 80k-100k USD"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Notice Period
            </label>
            <select
              value={formData.noticePeriod}
              onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
              className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select notice period</option>
              <option value="immediate">Immediate</option>
              <option value="15days">15 days</option>
              <option value="30days">30 days</option>
              <option value="60days">60 days</option>
              <option value="90days">90 days</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Add Candidate
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-muted text-foreground rounded-lg font-medium text-sm hover:bg-muted/80 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
