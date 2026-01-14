# Bazari - بەزاری پیشەسازی

پلاتفۆرمی خزمەتگوزاری بۆ پەیوەندیکردنی کاستەمەر و پرۆڤایدەر

## Features - تایبەتمەندیەکان

### ✅ Core Features
- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access
- 👥 **User Management** - Customer and Provider profiles
- 📋 **Service Marketplace** - Browse and book services
- 📅 **Booking System** - Schedule and manage appointments
- 💬 **Real-time Chat** - Communication between customers and providers
- ⭐ **Reviews & Ratings** - Feedback system
- 📊 **Analytics Dashboard** - Business insights
- 🚨 **Anti-Fraud System** - Security and verification

### 🆕 New Features (2024)
- 🔔 **Multi-channel Notifications** - Email, SMS, and Push notifications
- 📴 **Offline Support** - Service Worker with intelligent caching
- 🌐 **Multi-language** - Kurdish, Arabic, and English with RTL/LTR support
- 🎨 **Enhanced UX** - Empty states, toasts, and micro-copy improvements
- 🐳 **Containerized Deployment** - Docker and CI/CD pipelines

## Tech Stack - تەکنەلۆژیا

- **Frontend:** Next.js 16, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Firebase Admin SDK
- **Database:** Firebase Firestore
- **Authentication:** JWT (jsonwebtoken)
- **Email:** Nodemailer
- **SMS:** Twilio
- **Push Notifications:** Web Push API
- **Deployment:** Docker, GitHub Actions

## Getting Started - دەستپێکردن

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account
- Gmail account (for email notifications)
- Twilio account (for SMS - optional)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/bazari.git
cd bazari/user-portal
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
- Firebase configuration
- Gmail SMTP credentials
- Twilio credentials (optional)
- JWT secret

4. Run development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables - گۆڕاوەکانی ژینگە

See [.env.example](.env.example) for all required environment variables.

### Required:
- `JWT_SECRET` - Secret key for JWT tokens
- `NEXT_PUBLIC_FIREBASE_*` - Firebase configuration
- `FIREBASE_*` - Firebase Admin SDK credentials

### Optional but Recommended:
- `SMTP_*` - Email service configuration
- `TWILIO_*` - SMS service configuration
- `VAPID_*` - Push notification keys
- `SENTRY_DSN` - Error monitoring

## Email Setup - ڕێکخستنی ئیمەیڵ

### Using Gmail:
1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to https://myaccount.google.com/security
   - Select "App passwords"
   - Create a new app password
3. Use the app password in `SMTP_PASS`

### Email Templates:
- Booking confirmation
- Provider new booking notification
- Booking completed
- Review reminder

## SMS Setup - ڕێکخستنی SMS

### Using Twilio:
1. Create account at https://www.twilio.com
2. Get your Account SID and Auth Token
3. Purchase a phone number
4. Add credentials to `.env.local`

## Push Notifications - ئاگادارکردنەوەی پوش

Generate VAPID keys:
```bash
npx web-push generate-vapid-keys
```

Add the keys to `.env.local`

## Deployment - دابەشکردن

### Using Docker:

```bash
# Build image
docker build -t bazari-user-portal .

# Run container
docker-compose up -d
```

### Using GitHub Actions:

Push to `main` branch to trigger automatic deployment.

See [.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml) for pipeline configuration.

## Multi-language Support - فرەزمانی

Supported languages:
- 🇮🇶 Kurdish (کوردی) - Default
- 🇸🇦 Arabic (العربية)
- 🇬🇧 English

Translation files in `/locales`:
- `ku.json` - Kurdish
- `ar.json` - Arabic
- `en.json` - English

Users can switch languages using the language switcher in the navbar.

## Offline Support - پشتگیری ئۆفلاین

Service Worker caches:
- Static assets (JS, CSS, images)
- API responses (with TTL)
- Offline fallback page

Cache strategies:
- **API calls:** Network-first (with cache fallback)
- **Static assets:** Cache-first
- **Stale-while-revalidate** for better UX

## Project Structure

```
user-portal/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (auth)/            # Auth pages
│   └── dashboard/         # Dashboard pages
├── components/            # React components
├── contexts/              # React contexts
├── lib/                   # Utility functions
├── locales/               # Translation files
├── public/                # Static files
├── .github/workflows/     # CI/CD pipelines
└── Dockerfile             # Docker configuration
```

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: [github.com/your-username/bazari/issues](https://github.com/your-username/bazari/issues)
- Email: support@bazari.com

---

Made with ❤️ in Kurdistan
