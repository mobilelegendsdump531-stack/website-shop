# 🛍️ Modern E-Commerce Shop Website

A cutting-edge e-commerce platform built with Next.js 14, React 18, TypeScript, Tailwind CSS, and Prisma ORM. Features include digital product delivery, music player, admin dashboard, and secure payment integration.

## ✨ Features

### Customer Features
- 🏪 **Product Catalog** - Browse and search digital & physical products
- 🎵 **Built-in Music Player** - Play audio directly on the platform
- 🛒 **Shopping Cart** - Add/remove products, manage quantities
- ❤️ **Wishlist** - Save favorite products for later
- 🔐 **User Authentication** - Secure login & registration with NextAuth
- 💳 **Multiple Payment Methods** - GCash, Maya, Bank Transfer support
- 📥 **Instant Digital Delivery** - Automatic download links after purchase
- ⭐ **Product Reviews** - Rate and review purchased products
- 🎁 **Promo Codes** - Apply discount codes at checkout
- 📱 **Responsive Design** - Works perfectly on all devices
- 🌙 **Dark/Light Mode** - Theme switcher with persistence

### Admin Features
- 📊 **Dashboard** - Real-time analytics and statistics
- 📦 **Product Management** - Create, edit, delete products
- 📋 **Order Management** - Track and manage customer orders
- 👥 **User Management** - Manage customer accounts
- 💰 **Revenue Reports** - Track sales and revenue
- ⚙️ **Settings** - Configure store settings

### Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom neon theme
- **State Management**: Zustand
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v4
- **UI Components**: Custom components + shadcn/ui inspired
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image
- **Form Validation**: React Hook Form + Zod

## 📂 Project Structure

```
project-root/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── users/
│   │   │   └── settings/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── categories/
│   │   │   └── announcements/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── shop/
│   │   ├── products/
│   │   └── page.tsx (Home)
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── Toast.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductFilters.tsx
│   │   ├── Pagination.tsx
│   │   └── MusicPlayer.tsx
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useClickOutside.ts
│   │   ├── useMounted.ts
│   │   └── useAsync.ts
│   ├── lib/
│   │   ├── auth.ts (NextAuth config)
│   │   └── prisma.ts (Prisma client)
│   ├── store/
│   │   ├── cartStore.ts (Zustand)
│   │   ├── wishlistStore.ts (Zustand)
│   │   ├── notificationStore.ts (Zustand)
│   │   └── themeStore.ts (Zustand)
│   ├── types/
│   │   └── index.ts (TypeScript types)
│   ├── utils/
│   │   ├── helpers.ts
│   │   ├── api.ts
│   │   ├── password.ts
│   │   └── token.ts
│   └── app/
│       ├── globals.css
│       ├── layout.tsx
│       └── providers.tsx
├── prisma/
│   └── schema.prisma
├── public/
├── .env.example
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/mobilelegendsdump531-stack/website-shop.git
cd website-shop
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/shop_website"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Payment Gateway Keys (optional for now)
GCASH_API_KEY="your-gcash-key"
MAYA_API_KEY="your-maya-key"
```

4. **Set up the database**
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (optional)
npm run prisma:seed
```

5. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type check

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Create and run migrations
npm run prisma:studio    # Open Prisma Studio
npm run prisma:seed      # Seed database
```

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.ts` to customize neon colors:
```typescript
colors: {
  neon: {
    cyan: '#00f0ff',
    magenta: '#ff006e',
    lime: '#39ff14',
    purple: '#b300ff',
    pink: '#ff10f0',
  },
}
```

### Database Schema
Modify `prisma/schema.prisma` to customize the data model. After changes:
```bash
npm run prisma:migrate
```

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT-based session management
- ✅ CORS protection
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection
- ✅ CSRF tokens
- ✅ Rate limiting (ready to implement)
- ✅ Input validation & sanitization

## 📊 Database Models

### Core Models
- **User** - Customer accounts with authentication
- **Product** - Digital and physical products
- **ProductCategory** - Product categorization
- **ProductImage** - Product images with ordering
- **ProductVariant** - Product variants (size, color, etc.)

### E-Commerce Models
- **Cart** - User shopping carts
- **CartItem** - Items in cart
- **Order** - Customer orders
- **OrderItem** - Items in orders
- **Payment** - Payment records
- **PaymentMethod** - User payment methods

### Digital Products
- **DigitalFile** - Files for digital products
- **Download** - Download history and tracking

### User Features
- **Wishlist** - Saved products
- **Review** - Product reviews and ratings
- **Notification** - User notifications

### Admin
- **PromoCode** - Discount codes
- **Announcement** - Site announcements
- **SupportTicket** - Customer support
- **ActivityLog** - Admin activity logging

### Music Player
- **Song** - Audio tracks
- **Playlist** - Collections of songs
- **PlaylistSong** - Song ordering in playlists

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/session` - Get current session

### Products
- `GET /api/products` - List products with pagination
- `GET /api/products/[slug]` - Get product details
- `POST /api/products` - Create product (admin)
- `PATCH /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get order details
- `PATCH /api/orders/[id]` - Update order status (admin)

### Categories
- `GET /api/categories` - List all categories

### Announcements
- `GET /api/announcements` - Get active announcements

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@shopwebsite.com or open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Advanced payment integration (Stripe, GCash, Maya)
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Inventory management
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Progressive Web App (PWA)
- [ ] Mobile app (React Native)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Performance optimizations
- [ ] SEO optimizations
- [ ] Accessibility improvements (WCAG 2.1)

## 👨‍💻 Developer

Built with ❤️ by the Shop Team

---

**Happy Coding! 🚀**
