# Project Structure & Architecture

## Directory Overview

```
website-shop/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes (layout group)
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── admin/             # Admin dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── users/
│   │   │   └── settings/
│   │   ├── api/               # API Routes
│   │   │   ├── auth/
│   │   │   │   └── register/
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── categories/
│   │   │   └── announcements/
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout page
│   │   ├── shop/              # Product catalog
│   │   ├── products/          # Individual product pages
│   │   │   └── [slug]/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── providers.tsx      # Client providers
│   │   └── globals.css        # Global styles
│   │
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── Toast.tsx
│   │   ├── Navbar.tsx        # Navigation bar
│   │   ├── Footer.tsx        # Footer
│   │   ├── ProductCard.tsx   # Product card component
│   │   ├── ProductFilters.tsx# Filter sidebar
│   │   ├── Pagination.tsx    # Pagination controls
│   │   └── MusicPlayer.tsx   # Built-in music player
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useClickOutside.ts
│   │   ├── useMounted.ts
│   │   └── useAsync.ts
│   │
│   ├── lib/                   # Utilities & library setup
│   │   ├── auth.ts           # NextAuth configuration
│   │   └── prisma.ts         # Prisma client singleton
│   │
│   ├── store/                 # Zustand stores (state management)
│   │   ├── cartStore.ts      # Shopping cart state
│   │   ├── wishlistStore.ts  # Wishlist state
│   │   ├── notificationStore.ts # Notifications
│   │   └── themeStore.ts     # Theme (dark/light mode)
│   │
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   │
│   └── utils/                 # Utility functions
│       ├── helpers.ts        # General helpers
│       ├── api.ts            # API fetching
│       ├── password.ts       # Password hashing
│       └── token.ts          # Token generation
│
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Database migrations
│
├── public/                    # Static assets
│
├── docs/                      # Documentation
│   ├── INSTALLATION.md
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DATABASE.md
│   └── DEPLOYMENT.md
│
├── .env.example              # Environment variables template
├── .gitignore
├── .eslintrc.json            # ESLint configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies
└── README.md                 # Project overview
```

## Architecture Decisions

### 1. Next.js App Router
- **Why**: Modern file-based routing with server/client components
- **Benefits**: Better code splitting, reduced bundle size, built-in optimizations

### 2. Prisma ORM
- **Why**: Type-safe database access with auto-generated schema
- **Benefits**: No SQL queries, automatic migrations, type safety

### 3. Zustand for State Management
- **Why**: Lightweight, simple API, no provider boilerplate
- **Benefits**: Minimal overhead, easy to use, good performance

### 4. Tailwind CSS
- **Why**: Utility-first CSS framework with customization
- **Benefits**: Consistent design, easy theming, great documentation

### 5. NextAuth.js
- **Why**: Complete authentication solution for Next.js
- **Benefits**: Secure, easy integration, supports multiple providers

## Data Flow

### User Authentication Flow
```
1. User enters credentials on login page
2. Form validation (client-side)
3. POST /api/auth/register or signIn()
4. NextAuth processes credentials
5. User session created
6. Redirect to dashboard/home
```

### Shopping Flow
```
1. User browses products on /shop
2. Clicks "Add to Cart"
3. Item added to cartStore (Zustand)
4. User navigates to /cart
5. Reviews items and proceeds to /checkout
6. Fills shipping and payment info
7. Creates order via POST /api/orders
8. Redirected to order confirmation
```

### Admin Flow
```
1. Admin logs in
2. Redirected to /admin/dashboard
3. Middleware checks user role
4. Admin dashboard loads with stats
5. Can navigate to products, orders, users
6. CRUD operations via API routes
```

## Component Hierarchy

```
RootLayout
├── Providers (SessionProvider, ThemeProvider)
├── Navbar
├── Main Content
│   ├── Page-specific components
│   └── UI Components (Button, Card, Input, etc.)
├── Footer
└── Toast notifications (if any)
```

## API Structure

All API routes follow RESTful conventions:

```
/api/
├── auth/
│   └── register/
│       └── route.ts (POST)
├── products/
│   ├── route.ts (GET - list)
│   └── [slug]/
│       └── route.ts (GET - details)
├── orders/
│   ├── route.ts (GET, POST)
│   └── [id]/
│       └── route.ts (GET - details)
├── categories/
│   └── route.ts (GET)
└── announcements/
    └── route.ts (GET)
```

## State Management Strategy

### Zustand Stores
- **cartStore**: Shopping cart items and operations
- **wishlistStore**: Saved products
- **notificationStore**: Toast/notification messages
- **themeStore**: Dark/light mode preference

### Server State
- Fetched via API routes using `fetchAPI()` helper
- Cached with React Query (future enhancement)
- Invalidated on mutations

## Performance Optimizations

1. **Image Optimization**: Next.js Image component
2. **Code Splitting**: Dynamic imports for heavy components
3. **Lazy Loading**: Components load on demand
4. **Caching**: Browser cache headers on API routes
5. **Database Indexes**: On frequently queried fields
6. **CSS**: Tailwind purges unused styles in production

## Security Measures

1. **Authentication**: NextAuth with JWT tokens
2. **Password Hashing**: bcryptjs with salt rounds
3. **CORS**: Protected API endpoints
4. **Input Validation**: Zod schemas on forms
5. **SQL Injection Prevention**: Prisma parameterized queries
6. **XSS Protection**: React escapes content by default
7. **CSRF Protection**: NextAuth handles tokens

## Error Handling

```typescript
// API Routes
try {
  // Logic here
  return NextResponse.json(data, { status: 201 });
} catch (error) {
  console.error('Error:', error);
  return NextResponse.json(
    { error: 'User-friendly message' },
    { status: 500 }
  );
}

// Client Components
const { data, error, isLoading } = await fetchAPI('/endpoint');
if (error) {
  showToast('error', 'Something went wrong');
}
```

## Testing Strategy (Future)

- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Playwright for E2E testing
- **API Tests**: Jest for API route testing
- **Performance**: Lighthouse CI

## Deployment Architecture

```
Local Dev
    ↓
Git Push (GitHub)
    ↓
Vercel Deployment
    ↓
Production URL
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for details.
