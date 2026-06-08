# Feature Guide - Candidate Search AI System

## Quick Start Guide

### Navigation
- **Chat & Search** - AI-powered search and Q&A interface with chat history
- **Documents** - Upload and manage documents for RAG
- **Candidates** - Manage candidate profiles and resumes

## Chat & Search Tab

### What's New
- **Chat History Sidebar** - Left sidebar showing all previous conversations
  - Pin important chats to the "Pinned" section
  - Search through chat history
  - Click any chat to switch to it
  - Delete chats with the trash icon
  - Shows relative time (e.g., "2h ago")

### How to Use
1. Click "New Chat" button to start fresh conversation
2. Search for previous chats using the search box
3. Select a chat from history to continue
4. Pin/unpin chats by hovering and clicking the pin icon
5. Delete old chats with the delete button

## Documents Tab

### Supported File Types
- **PDF** 📄 - Document files
- **Excel** 📊 - .xlsx, .xls spreadsheet files
- **CSV** 📋 - Comma-separated values
- **Word** 📝 - .doc, .docx documents
- **JSON** 📨 - JSON data files
- **Text** 📃 - Plain text files

### Upload Features
1. **Drag & Drop Zone**
   - Drag multiple files at once
   - Visual feedback when dragging
   - Large blue upload zone

2. **Choose Files Button**
   - Click to select files from computer
   - Select multiple files at once
   - Only supported file types allowed

3. **Upload Progress**
   - Real-time progress bar per file
   - Upload speed display
   - Time remaining estimate
   - Status indicators (pending, uploading, success, error)
   - Cancel individual or all uploads

### Document List Actions
- **View** 👁️ - See document details and extracted text preview
- **Edit** ✏️ - Rename, categorize, or add tags
- **Download** ⬇️ - Download processed document
- **Delete** 🗑️ - Remove document

### Document Details Modal
Shows:
- File name and type
- File size
- Upload date and time
- Number of pages (PDF)
- Number of rows (Excel/CSV)
- Processing status (processing, done, or failed)
- Preview of extracted text

## Candidates Tab

### Upload Resumes
1. **Drag & Drop**
   - Drop resume files (PDF recommended)
   - Supports multiple resumes at once

2. **Add Manually**
   - Click "Add Manually" button
   - Fill in candidate details directly
   - Form fields:
     - Full Name
     - Email
     - Phone
     - Position Applied
     - Years of Experience
     - Skills (comma-separated)

### Candidate List Actions
- **View** 👁️ - See full candidate profile
- **Edit** ✏️ - Update candidate information
- **Download** ⬇️ - Download resume
- **Delete** 🗑️ - Remove candidate

### Candidate Information Display
- Candidate name and email
- Position applied for
- Years of experience
- Top 2 skills (expandable)
- Current status (applied, shortlisted, interviewed, rejected)

### Edit Candidate Modal
Allows you to update:
- Full name
- Email address
- Phone number
- Position
- Experience years
- Skills list
- Application status

## Scrolling & Large Lists

### Smart Scrolling
- Document list has internal scrolling (max 384px height)
- Candidate list has internal scrolling (max 384px height)
- Lists don't break the page layout with 30+ items
- Column headers stay sticky while scrolling
- Hover to reveal action buttons

## Professional UI Features

### Dark Theme
- Easy on the eyes dark interface
- High contrast for readability
- Color-coded status badges
  - Blue: Processing/Uploading
  - Green: Success/Done
  - Yellow: Pending
  - Red: Error/Failed
  - Purple: Interviewed
  - Cyan: Highlights

### Responsive Design
- Works on desktop (tested at 1280px+)
- Ready for tablet optimization
- Mobile-responsive layout structure
- Flexible grid system

### Interactive Elements
- Hover effects for better UX
- Smooth transitions and animations
- Clear visual feedback on actions
- Loading states for upload progress
- Empty states with helpful messages

## Tips & Tricks

1. **Organize Documents**
   - Use categories and tags when editing
   - Group related documents together

2. **Manage Candidates**
   - Update status as they progress through pipeline
   - Keep skills list up to date
   - Use consistent position naming

3. **Efficient Upload**
   - Upload multiple files at once
   - Monitor speed and time remaining
   - Cancel and retry failed uploads

4. **Chat History**
   - Pin frequently accessed chats
   - Use search for quick access
   - Delete completed conversations

## Common Tasks

### Upload a PDF Document
1. Go to Documents tab
2. Drag PDF to upload zone or click "Choose Files"
3. Monitor progress bar
4. Document appears in list when complete

### Add a New Candidate
1. Go to Candidates tab
2. Click "Add Manually" button
3. Fill in all candidate details
4. Submit form (button ready for backend)

### View Document Details
1. Go to Documents tab
2. Hover over document in list
3. Click eye icon (View)
4. Modal shows all details and preview

### Edit Candidate Status
1. Go to Candidates tab
2. Hover over candidate in list
3. Click edit icon (pencil)
4. Change status dropdown
5. Click "Save Changes"

### Search Chat History
1. On Chat & Search tab
2. Look for search box in left sidebar
3. Type keywords (partial matches work)
4. Results update in real-time

### Cancel Upload
1. During active upload
2. Click X button on file in progress
3. Or click "Cancel All" for all uploads

## Component Interactions

```
User Action → Component → State Update → UI Re-render

Example: Upload File
1. User drops file
2. MultiFileUpload detects it
3. Creates UploadProgressItem
4. Simulates progress
5. Shows progress bar
6. Updates document list
```

## Data Flow

```
Documents Tab:
Upload → MultiFileUpload → EnhancedDocumentList → Display with Actions

Candidates Tab:
Add → CandidateUploadSection → EnhancedCandidateList → Display with Actions

Chat Tab:
History → ChatHistorySidebar → Click to Load → ChatInterface
```

## Keyboard Support (Backend Ready)
- ESC key to close modals
- Tab to navigate inputs
- Enter to submit forms
- Arrow keys for scrolling lists

## Browser Compatibility
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips
- Lists automatically scroll internally (no page lag with 50+ items)
- Upload progress updates 10x per second
- Modal animations are GPU-accelerated
- Component re-renders optimized with React hooks

## Troubleshooting

**Upload stuck on pending?**
- Check file type is supported
- Try canceling and re-uploading

**List too long?**
- Use scrollbar inside the list container
- Lists have max-height to prevent layout break

**Modal not responding?**
- Click outside modal to close
- Try refreshing if stuck

**Chat history not showing?**
- Need to be on Chat & Search tab
- History sidebar only visible there

## Future Features
- Document thumbnails
- Bulk candidate export
- Interview scheduling
- Candidate rating system
- Advanced filtering
- Real-time notifications
