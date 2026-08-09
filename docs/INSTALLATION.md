# Installation & Setup Guide

## System Requirements

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or yarn/pnpm)
- **PostgreSQL**: v12 or higher
- **Git**: v2.0.0 or higher

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/mobilelegendsdump531-stack/website-shop.git
cd website-shop
```

### 2. Install Dependencies

```bash
npm install
```

Or with yarn:
```bash
yarn install
```

### 3. Create Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# Database Connection
DATABASE_URL="postgresql://username:password@localhost:5432/shop_website"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-key"

# Cloudinary (Image Storage)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Application URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Payment Methods (Optional)
GCASH_API_KEY="your-gcash-key"
MAYA_API_KEY="your-maya-key"
STRIPE_SECRET_KEY="your-stripe-key"
```

### 4. Setup PostgreSQL Database

#### On Windows:
1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run the installer
3. Remember the password you set for the `postgres` user
4. Open pgAdmin (comes with PostgreSQL)
5. Create a new database named `shop_website`

#### On macOS:
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql

# Create database
psql postgres
CREATE DATABASE shop_website;
\q
```

#### On Linux:
```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Create database
sudo -u postgres psql
CREATE DATABASE shop_website;
\q
```

### 5. Generate NextAuth Secret

```bash
openssl rand -base64 32
# Copy the output and paste it in NEXTAUTH_SECRET
```

Or use this online tool: https://generate-secret.vercel.app/32

### 6. Setup Prisma

#### Generate Prisma Client
```bash
npm run prisma:generate
```

#### Create Database Schema
```bash
npm run prisma:migrate
```

When prompted, name the migration (e.g., "init").

#### View Database (Optional)
```bash
npm run prisma:studio
```

This opens Prisma Studio at http://localhost:5555

### 7. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Verification Checklist

- [ ] Application loads at http://localhost:3000
- [ ] Homepage displays correctly
- [ ] Shop page loads products
- [ ] Can navigate to login/register pages
- [ ] Database connection is working
- [ ] Tailwind CSS is applied (neon colors visible)

## Cloudinary Setup (Optional for Image Uploads)

1. Create account at [cloudinary.com](https://cloudinary.com/)
2. Go to Dashboard
3. Copy your Cloud Name
4. Generate API Key and Secret
5. Add to `.env.local`

## Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Database Connection Error
1. Check PostgreSQL is running
2. Verify DATABASE_URL is correct
3. Check database exists
4. Try: `npm run prisma:generate` again

### Prisma Migration Failed
```bash
npm run prisma:migrate -- --reset
```

### Packages Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Read the [API Documentation](./docs/API.md)
2. Check out [Components Guide](./docs/COMPONENTS.md)
3. Review [Database Schema](./docs/DATABASE.md)
4. Deploy to [Vercel](./docs/DEPLOYMENT.md)

## Support

If you encounter issues:
1. Check the [troubleshooting section](#troubleshooting)
2. Review GitHub issues
3. Contact support@shopwebsite.com
