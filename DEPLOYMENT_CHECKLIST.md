# 🎯 Bazari - Deployment Checklist

## Pre-Deployment Checklist

### ✅ Code Complete
- [x] All core features implemented
- [x] Notification system (Email, SMS, Push)
- [x] Offline support (Service Worker)
- [x] Multi-language (Kurdish, Arabic, English)
- [x] Deployment configuration (Docker, CI/CD)

### ⚠️ Environment Configuration

#### 1. Generate VAPID Keys
```bash
npm run generate-vapid
```
Copy the output to `.env.local`

#### 2. Configure Email (Gmail)
- [ ] Enable 2FA on Google account
- [ ] Generate App Password
- [ ] Update `.env.local`:
  ```env
  SMTP_USER=your-email@gmail.com
  SMTP_PASS=your-app-password
  ```

#### 3. Configure SMS (Optional - Twilio)
- [ ] Create Twilio account
- [ ] Get Account SID and Auth Token
- [ ] Purchase phone number
- [ ] Update `.env.local`:
  ```env
  TWILIO_ACCOUNT_SID=ACxxxxxxxxx
  TWILIO_AUTH_TOKEN=your-token
  TWILIO_PHONE_NUMBER=+1234567890
  ```

#### 4. Configure Firebase
- [ ] Create Firebase project
- [ ] Enable Firestore
- [ ] Download service account key
- [ ] Update `.env.local` with Firebase credentials

#### 5. Security
- [ ] Generate new JWT_SECRET (use: `openssl rand -base64 32`)
- [ ] Update JWT_SECRET in `.env.local`
- [ ] Review CORS settings
- [ ] Enable Firebase security rules

### 📝 Testing Checklist

#### Notification Testing
- [ ] Test email notification on booking creation
- [ ] Test SMS notification (if enabled)
- [ ] Test push notification permission
- [ ] Verify email templates render correctly

#### Offline Testing
- [ ] Open DevTools > Application > Service Workers
- [ ] Verify service worker is registered
- [ ] Go offline (DevTools > Network > Offline)
- [ ] Verify cached pages load
- [ ] Verify connection status banner appears

#### Multi-language Testing
- [ ] Switch to Kurdish - verify RTL layout
- [ ] Switch to Arabic - verify RTL layout
- [ ] Switch to English - verify LTR layout
- [ ] Verify translations are correct

#### UX Testing
- [ ] Create booking with empty services - verify EmptyState
- [ ] Create booking - verify success toast
- [ ] Try with invalid data - verify error toast
- [ ] Check all empty states across app

### 🚀 Deployment

#### Local Testing
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Test production build
npm start
```

#### Docker Testing
```bash
# Build Docker image
docker build -t bazari-user-portal .

# Run with docker-compose
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop
docker-compose down
```

#### GitHub Actions
- [ ] Push to `develop` branch (triggers staging deployment)
- [ ] Review staging deployment
- [ ] Push to `main` branch (triggers production deployment)
- [ ] Monitor CI/CD pipeline

### 🔍 Post-Deployment Verification

#### Functionality
- [ ] User can register and login
- [ ] User can browse services
- [ ] User can create booking
- [ ] Email notification received
- [ ] SMS notification received (if enabled)
- [ ] Chat works between customer and provider
- [ ] Reviews can be submitted
- [ ] Language switcher works

#### Performance
- [ ] Page load time < 3 seconds
- [ ] Service worker caching works
- [ ] Images load optimally
- [ ] No console errors

#### Security
- [ ] HTTPS enabled
- [ ] JWT tokens working
- [ ] Role-based access working
- [ ] Firebase rules enforced

### 📊 Monitoring Setup

#### Error Tracking (Optional)
- [ ] Set up Sentry account
- [ ] Add Sentry DSN to `.env.local`
- [ ] Install Sentry SDK:
  ```bash
  npm install @sentry/nextjs
  npx @sentry/wizard@latest -i nextjs
  ```

#### Analytics (Optional)
- [ ] Set up Google Analytics
- [ ] Add tracking code
- [ ] Verify events are tracked

---

## 🎉 Launch Checklist

### Pre-Launch (24 hours before)
- [ ] Final testing on staging
- [ ] Database backup
- [ ] Review all environment variables
- [ ] Test email/SMS delivery
- [ ] Load testing
- [ ] Security audit

### Launch Day
- [ ] Deploy to production
- [ ] Monitor error logs
- [ ] Test critical user flows
- [ ] Verify notifications working
- [ ] Check analytics

### Post-Launch (First Week)
- [ ] Monitor user feedback
- [ ] Fix critical bugs
- [ ] Review performance metrics
- [ ] Optimize based on real usage

---

## 🆘 Troubleshooting

### Service Worker Issues
```bash
# Clear service worker cache
# In browser: DevTools > Application > Clear Storage > Clear site data
```

### Email Not Sending
```bash
# Check SMTP credentials
# Verify Gmail App Password is correct
# Check logs: docker-compose logs app
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### Docker Issues
```bash
# Remove all containers and images
docker-compose down -v
docker system prune -a

# Rebuild
docker-compose up --build
```

---

## 📞 Support Contacts

- **Developer:** Your Name
- **Email:** support@bazari.com
- **GitHub Issues:** https://github.com/your-username/bazari/issues

---

**Good luck with your deployment! 🚀**
