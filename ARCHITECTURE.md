# Architecture Overview

## Frontend Architecture (UI Only - Delivered)

This project is a **frontend-only implementation** of the Candidate Search AI System. The UI is fully functional and ready for backend integration.

### Component Hierarchy

```
RootLayout
└── Home (page.tsx)
    ├── Sidebar
    │   └── Navigation (Chat & Search, Documents, Candidates)
    ├── ChatInterface (conditional)
    │   ├── Header
    │   ├── ProviderSelector (collapsible)
    │   ├── SearchModeSelector
    │   ├── MessageList
    │   │   └── ChatMessage[]
    │   │       └── CandidateCard[] (in results)
    │   └── MessageInput
    ├── DocumentUploadSection (conditional)
    │   └── DragDropZone
    ├── DocumentList (conditional)
    ├── CandidateUploadSection (conditional)
    │   ├── DragDropZone
    │   └── ManualForm
    └── CandidateList (conditional)
```

### State Management

Uses React hooks for local state:

```javascript
// Home Component State
- activeTab: 'chat' | 'documents' | 'candidates'
- documents: Document[]
- candidates: Candidate[]

// ChatInterface State
- messages: Message[]
- inputValue: string
- isLoading: boolean
- showProviderSettings: boolean
- provider: string ('openai' | 'anthropic' | 'gemini')
- model: string (dynamic based on provider)
- temperature: number (0-1)
- searchMode: string ('document' | 'candidate' | 'hybrid' | 'jobmatch')
```

### Data Flow

1. **Upload Flow**
   - User drags files or clicks upload
   - Files are parsed into metadata objects
   - onUpload callback adds to state
   - Lists re-render with new items

2. **Chat Flow**
   - User types message → inputValue state
   - Form submit → message added to list
   - Simulate async response (placeholder)
   - Message appears in chat

3. **Settings Flow**
   - User clicks Settings button
   - ProviderSelector panel appears
   - Selection updates parent state
   - Changes persist in component

## Backend Integration Points

### Required Backend Endpoints

#### 1. Document Management

**Upload Documents**
```
POST /api/documents/upload
Content-Type: multipart/form-data

Files: PDF, TXT
Response: { documents: Document[] }
```

**List Documents**
```
GET /api/documents
Query: ?status=processing&limit=20&offset=0
Response: { documents: Document[], total: number }
```

**Get Document**
```
GET /api/documents/:id
Response: Document
```

#### 2. Candidate Management

**Add Candidate**
```
POST /api/candidates
Content-Type: application/json

Body: {
  name: string,
  email?: string,
  phone?: string,
  location?: string,
  experience?: number,
  skills?: string[],
  role?: string,
  expectedSalary?: string,
  noticePeriod?: string,
  resumeFile?: File
}
Response: Candidate
```

**List Candidates**
```
GET /api/candidates
Query: ?skill=Python&limit=20&offset=0
Response: { candidates: Candidate[], total: number }
```

**Search Candidates**
```
GET /api/candidates/search
Query: ?q=python%20developer&mode=hybrid
Response: Candidate[]
```

#### 3. Chat/Search

**Send Message (Streaming)**
```
POST /api/chat/stream
Content-Type: application/json
Headers: Accept: text/event-stream

Body: {
  message: string,
  mode: 'document' | 'candidate' | 'hybrid' | 'jobmatch',
  provider: string,
  model: string,
  temperature: number,
  filters?: {
    skills?: string[],
    location?: string,
    experience?: { min: number, max: number }
  }
}

Response: EventStream (Server-Sent Events)
  Events:
    - event: "chunk" { content: string }
    - event: "complete" { }
    - event: "error" { error: string }
```

#### 4. Models Configuration

**Get Available Models**
```
GET /api/models
Response: {
  providers: {
    openai: { label: string, models: string[] },
    anthropic: { label: string, models: string[] },
    gemini: { label: string, models: string[] }
  }
}
```

## Implementation Roadmap

### Phase 1: Backend Setup (Weeks 1-2)
- [ ] FastAPI/Flask project setup
- [ ] PostgreSQL/MongoDB database schema
- [ ] ChromaDB integration
- [ ] File upload handling
- [ ] Document parsing (PDF/TXT)

### Phase 2: RAG Implementation (Weeks 2-3)
- [ ] Text chunking algorithms
- [ ] Embedding generation (using LLM)
- [ ] ChromaDB storage
- [ ] Retrieval logic
- [ ] Context building

### Phase 3: Chat & LLM Integration (Weeks 3-4)
- [ ] LLM provider integrations (OpenAI, Anthropic, Google)
- [ ] Streaming response handler
- [ ] SSE implementation
- [ ] Prompt engineering
- [ ] Response parsing (JSON blocks)

### Phase 4: Candidate Search (Weeks 4-5)
- [ ] Resume parsing
- [ ] Skill extraction
- [ ] Candidate similarity search
- [ ] Filtering logic
- [ ] Job description matching

### Phase 5: Background Processing (Weeks 5-6)
- [ ] Celery task queue setup
- [ ] Redis configuration
- [ ] Async document processing
- [ ] Status tracking
- [ ] Error handling & retries

### Phase 6: Testing & Deployment (Weeks 6-7)
- [ ] Unit tests
- [ ] Integration tests
- [ ] Load testing
- [ ] API documentation
- [ ] Docker setup
- [ ] Production deployment

## Frontend Integration Checklist

When backend is ready, integrate:

```javascript
// 1. Update API calls
// Replace simulated responses with real API calls

// 2. Handle streaming responses
// Use EventSource API for SSE
const eventSource = new EventSource('/api/chat/stream');
eventSource.addEventListener('chunk', (e) => {
  // Update message with streamed content
});

// 3. Update file upload
// Post files to backend instead of local state

// 4. Update lists
// Fetch from API instead of state

// 5. Add error handling
// Show error messages from backend

// 6. Add loading states
// Proper spinner/skeleton screens
```

## Environment Variables Setup

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=Candidate Search AI System
```

### Backend (.env)
```
# Database
DATABASE_URL=postgresql://user:password@localhost/db_name
CHROMA_DB_PATH=/path/to/chromadb

# LLM Providers
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...

# Services
REDIS_URL=redis://localhost:6379
CELERY_BROKER_URL=redis://localhost:6379

# File Upload
MAX_FILE_SIZE=52428800
TEMP_UPLOAD_DIR=/tmp/uploads
```

## Technology Recommendations

### Backend Stack
- **Framework**: FastAPI (recommended) or Flask
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Vector DB**: ChromaDB (as specified)
- **Task Queue**: Celery + Redis
- **LLM Integration**: LangChain
- **File Processing**: PyPDF2, python-docx

### Infrastructure
- **Server**: Gunicorn + FastAPI/uWSGI + Flask
- **Cache**: Redis for sessions & caching
- **Storage**: S3 or local file storage
- **Background Jobs**: Celery workers
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack or CloudWatch

## Security Considerations

1. **File Upload Validation**
   - Whitelist only PDF and TXT
   - Scan uploaded files for malware
   - Limit file size (50MB)
   - Validate MIME types

2. **API Security**
   - CORS configuration
   - Rate limiting
   - Input validation/sanitization
   - SQL injection prevention
   - XSS protection

3. **Authentication** (Future)
   - JWT tokens or session-based
   - Role-based access control
   - API key management

4. **Data Privacy**
   - Encrypt sensitive data
   - Secure file storage
   - Access logging
   - GDPR compliance

## Performance Optimization

1. **Frontend**
   - Code splitting per route
   - Image optimization (none in this version)
   - CSS-in-JS optimization
   - Message virtualization (if needed)

2. **Backend**
   - Database query optimization
   - Caching with Redis
   - Async processing
   - Connection pooling
   - CDN for static files

3. **LLM Integration**
   - Prompt caching
   - Token optimization
   - Model selection based on query complexity
   - Fallback mechanisms

## Monitoring & Logging

- Request/response logging
- Error tracking (Sentry)
- Performance metrics (APM)
- ChromaDB performance
- LLM API usage & costs
- Task queue monitoring

## Scaling Strategy

1. **Horizontal Scaling**
   - Multiple FastAPI instances behind load balancer
   - Celery workers cluster
   - Redis clustering

2. **Database**
   - Read replicas for queries
   - Connection pooling
   - Partitioning for large tables

3. **Vector DB**
   - ChromaDB clustering
   - Sharding by document type
   - Periodic cleanup

## Known Limitations (UI)

- Messages are simulated (no real SSE)
- No real file upload processing
- No backend API integration
- No persistence (state resets on reload)
- Provider settings mock (no real API calls)
- Candidate search is not functional

All of these will be resolved with backend integration.
