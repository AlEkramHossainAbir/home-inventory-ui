# Home Inventory UI

A modern, responsive web application for managing and organizing your home inventory. Track your belongings, warranties, locations, and important documents all in one secure place.

## 🚀 Technology Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19.2.3
- **TypeScript**: 5.x (Strict mode, no `any` types)
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack Query (React Query) v5
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

## 🛠️ How to Run

### 1. Clone the repository

```bash
git clone <repository-url>
cd home-inventory-ui
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com

# Optional: Enable API proxy to avoid CORS (default: enabled)
# Set to false if your backend API has proper CORS headers
USE_API_PROXY=true
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm run start
```

## 🔐 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | Yes* | - | Base URL for the backend API (e.g., `https://api.example.com`) |
| `USE_API_PROXY` | No | `true` | Whether to use Next.js API routes as a proxy to avoid CORS issues |

\* Required only if `USE_API_PROXY` is set to `false`. When using the proxy, the app routes through Next.js API routes at `/api/*`.

### API Endpoints

The application expects the following API endpoints:

- **Auth**: `POST /users/login`
- **Items**: `GET/POST /items`, `GET/PUT/DELETE /items/:id`
- **Locations**: `GET /locations`

## 🔒 Authentication Approach

### Implementation Details

1. **Login Flow**:
   - User submits credentials via the login form (`/page.tsx`)
   - Form validation using Zod schema (`lib/validations/auth.ts`)
   - React Hook Form manages form state and submission
   - TanStack Query mutation handles the API call

2. **Token Management**:
   - Upon successful login, three tokens are stored in `localStorage`:
     - `authToken`: Main authentication token
     - `attachmentToken`: Token for accessing attachments/media
     - `tokenExpiry`: Expiration timestamp
   - User information is also stored in `localStorage` as JSON

3. **API Proxy Pattern**:
   - Next.js API routes (`app/api/*`) act as a proxy to the backend
   - Avoids CORS issues during development
   - Adds flexibility for middleware (logging, rate limiting, etc.)
   - Proxy can be disabled via environment variable

4. **Current Implementation**:
   ```typescript
   // Client-side authentication check
   const authToken = localStorage.getItem('authToken');
   
   // Tokens are sent with API requests
   headers: {
     'Authorization': `Bearer ${authToken}`
   }
   ```

### Authentication Tradeoffs

**Current Approach** (localStorage):
- ✅ Simple to implement
- ✅ Persists across page refreshes
- ✅ Easy to access from client components
- ❌ Vulnerable to XSS attacks
- ❌ Not automatically sent with requests
- ❌ Requires manual token management

**Recommended Next Steps** (see below):
- Implement HTTP-only cookies for better security
- Add server-side authentication middleware
- Implement token refresh mechanism

## 🏗️ Project Structure

```
app/
├── (routes)/              # Route groups
│   ├── dashboard/         # Dashboard page
│   ├── inventory/         # Inventory list and detail pages
│   ├── locations/         # Locations management
│   ├── labels/            # Labels page
│   ├── profile/           # User profile
│   └── settings/          # App settings
├── api/                   # Next.js API routes (proxy)
│   ├── auth/
│   ├── items/
│   └── locations/
├── layout.tsx             # Root layout with Providers
├── page.tsx               # Login page
└── globals.css            # Global styles

components/
├── layout/                # Layout components (Sidebar, Header)
└── ui/                    # Reusable UI components (planned)

hooks/
├── useItems.ts            # TanStack Query hook for items
├── useItemDetail.ts       # Single item query
├── useLocations.ts        # Locations query
└── useLogin.ts            # Login mutation

lib/
├── api/                   # API client functions
│   ├── auth.ts
│   ├── items.ts
│   └── locations.ts
├── data/                  # Mock/dummy data for development
├── validations/           # Zod schemas for form validation
└── utils/                 # Utility functions (planned)

types/
├── auth.ts                # Auth-related TypeScript interfaces
├── inventory.ts           # Inventory item types
└── location.ts            # Location types
```

## 📱 Responsive Design

The application is fully responsive with mobile-first design:

- **Breakpoints**: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- **Mobile**: Stacked layouts, collapsible sidebars, icon-only buttons
- **Tablet**: Grid layouts, visible labels
- **Desktop**: Full multi-column layouts, all features visible

## ✅ Code Quality Standards

### TypeScript
- **Strict mode enabled** - No `any` types allowed
- All data structures have proper interfaces/types
- Explicit return types for functions
- Type-safe API responses

### React 19 Features
- Server Components by default
- `"use client"` directive only when necessary
- Modern hooks: `use()`, `useActionState`, `useOptimistic`
- Ref as prop (no forwardRef needed)

### UX States
Every data-fetching component handles:
- ✅ Loading states (skeletons/spinners)
- ✅ Error states (user-friendly messages)
- ✅ Empty states (helpful CTAs)
- ✅ Success states (proper data display)

### Accessibility
- Semantic HTML elements
- Proper ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance (WCAG AA)

## 🔄 State Management

### TanStack Query (React Query)

All server state is managed through TanStack Query:

```typescript
// Query for listing data
const { data, isLoading, error } = useItems();

// Mutation for creating/updating
const createMutation = useCreateItem();
await createMutation.mutateAsync(data);
```

**Benefits**:
- Automatic caching and revalidation
- Optimistic updates
- Background refetching
- Automatic error handling
- Request deduplication

**Query Key Convention**:
```typescript
['items']                      // List all items
['items', itemId]             // Single item
['items', { status: 'active' }] // Filtered items
['locations']                  // List locations
```

## ⚠️ Known Tradeoffs & Limitations

### Current Implementation

1. **Dummy Data**:
   - Currently using mock data (`lib/data/dummy*.ts`) for development
   - Real API integration partially implemented
   - **Next Step**: Complete API integration for all endpoints

2. **Authentication Security**:
   - Tokens stored in localStorage (XSS vulnerable)
   - No token refresh mechanism
   - No session timeout handling
   - **Next Step**: Implement HTTP-only cookies + server-side session management

3. **No Protected Routes**:
   - Client-side route protection only
   - Anyone can access routes if they know the URL
   - **Next Step**: Implement Next.js middleware for server-side route protection

4. **Image Upload**:
   - Image gallery UI present but not functional
   - No file upload implementation
   - **Next Step**: Implement S3/Cloudinary integration for image uploads

5. **Error Boundaries**:
   - Basic error handling implemented
   - No centralized error logging service
   - **Next Step**: Integrate error tracking (Sentry, LogRocket)

6. **Offline Support**:
   - No offline functionality
   - **Next Step**: Implement PWA with service workers

7. **Internationalization**:
   - Currently English only
   - **Next Step**: Add i18n support (next-intl)

## 🚧 Next Steps & Roadmap

### High Priority

- [ ] **Complete API Integration**: Replace all dummy data with real API calls
- [ ] **Secure Authentication**: 
  - Implement HTTP-only cookies
  - Add refresh token mechanism
  - Server-side session validation
- [ ] **Protected Routes**: Add Next.js middleware for auth checks
- [ ] **Image Upload**: Implement full image management
- [ ] **Form Validation**: Complete Zod schemas for all forms
- [ ] **Error Handling**: Add centralized error logging

### Medium Priority

- [ ] **Search & Filters**: Implement working search and filter functionality
- [ ] **Pagination**: Add server-side pagination for large datasets
- [ ] **Sorting**: Enable column sorting in tables
- [ ] **Export**: Implement CSV/PDF export functionality
- [ ] **Notifications**: Add toast notifications system
- [ ] **Dark Mode**: Implement theme switching

### Low Priority

- [ ] **Unit Tests**: Add Jest + React Testing Library tests
- [ ] **E2E Tests**: Add Playwright/Cypress tests
- [ ] **Performance**: Implement virtual scrolling for large lists
- [ ] **PWA**: Add offline support and install capability
- [ ] **i18n**: Multi-language support
- [ ] **Analytics**: Add usage tracking

## 🧪 Development

### Run Linter

```bash
npm run lint
```

### Type Checking

```bash
npx tsc --noEmit
```

### Code Style Guidelines

- Follow the project's Copilot instructions (`.github/copilot-instructions.md`)
- Max function length: 50 lines
- Max file length: 300 lines
- Use early returns to reduce nesting
- Write self-documenting code

## 📚 Key Dependencies

- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Performant form handling
- **zod**: Runtime type validation and schema definition
- **lucide-react**: Modern, customizable icon library

## 🤝 Contributing

1. Follow the TypeScript strict guidelines (no `any` types)
2. Ensure all UX states are handled (loading/error/empty)
3. Write responsive, mobile-first CSS
4. Add proper TypeScript types for all new features
5. Follow the existing project structure

## 📄 License

[Your License Here]

## 👥 Authors

[Your Name/Team]

---

Built with ❤️ using Next.js 15, React 19, and TypeScript
