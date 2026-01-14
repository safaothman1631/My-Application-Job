# دامەزراندنی Google OAuth بۆ چوونەژوورەوە

## 1. دروستکردنی پرۆژەی Google Cloud

1. بچۆ بۆ [Google Cloud Console](https://console.cloud.google.com/)
2. پرۆژەیەکی نوێ دروستبکە یان هی ئێستات هەڵبژێرە
3. لە لیستی لای چەپەوە، بچۆ بۆ **APIs & Services** > **Credentials**

## 2. دروستکردنی OAuth 2.0 Client ID

1. کلیک لەسەر **Create Credentials** > **OAuth client ID**
2. جۆری بەرنامە هەڵبژێرە: **Web application**
3. ناو بدە: `Bazari User Portal`
4. لە **Authorized JavaScript origins** بنووسە:
   - `http://localhost:3000`
   - `https://your-production-domain.com` (بۆ پرۆداکشن)
5. لە **Authorized redirect URIs** بنووسە:
   - `http://localhost:3000/api/auth/google/callback`
   - `https://your-production-domain.com/api/auth/google/callback`
6. کلیک لەسەر **Create**

## 3. کۆپیکردنی Client ID و Secret

دوای دروستکردن، دوو شت دەبینیت:
- **Client ID**: نمونە `123456789-abc123.apps.googleusercontent.com`
- **Client Secret**: نمونە `GOCSPX-abc123xyz789`

## 4. زیادکردنیان بۆ `.env.local`

فایلی `.env.local` لە بنکەی پرۆژەکەت بکەرەوە و ئەمانە بنووسە:

```env
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=123456789-abc123.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123xyz789
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **تێبینی**: `NEXT_PUBLIC_GOOGLE_CLIENT_ID` پێویستە بە `NEXT_PUBLIC_` دەست پێبکات بۆ ئەوەی لە لای کلاینت بەکاربهێنرێت.

## 5. دەستپێکردنەوەی سێرڤەر

دوای زیادکردنی کلیلەکان، سێرڤەر دەستپێبکەوە:

```bash
npm run dev
```

## 6. تاقیکردنەوە

1. پەیجی چوونەژوورەوە بکەرەوە
2. کلیک لەسەر دوگمەی **بەردەوام بە لەگەڵ گووگڵ**
3. ئەکاونتی گووگڵت هەڵبژێرە
4. دەبێت یەکسەر بچیتە ژوورەوە!

## چارەسەری کێشەکان

### کێشە: "redirect_uri_mismatch"
- دڵنیابەرەوە کە URL لە Google Console وەک `.env.local` وایە
- دەبێت وردبێت: `http://localhost:3000/api/auth/google/callback`

### کێشە: "invalid_client"
- Client ID یان Secret هەڵەیە
- دڵنیابەرەوە کە لە `.env.local` بە ڕێکی کۆپییان کردووە
- سێرڤەر دەستپێبکەرەوە (Ctrl+C و پاشان `npm run dev`)

### کێشە: دوگمەکە کلیک ناکات
- بڕوانە بۆ Console لە Developer Tools (F12)
- دڵنیابەرەوە کە `NEXT_PUBLIC_GOOGLE_CLIENT_ID` دیاریکراوە
- JavaScript errors هەیە یان نا بزانە

## بۆ Production

کاتێک بۆ سێرڤەری ڕاستەقینە دەینێریت:

1. دۆمەینەکەت زیادبکە لە Google Cloud Console:
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URIs: `https://yourdomain.com/api/auth/google/callback`

2. لە `.env.local` لە سێرڤەرەکەت:
   ```env
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

3. ئەگەر Vercel یان Netlify بەکاردەهێنیت، Environment Variables لە Dashboard زیادبکە.

---

**تێبینی گرنگ**: `.env.local` لە `.gitignore` دایە، واتە نانێردرێت بۆ GitHub. ئەمە بۆ پاراستنی کلیلە نهێنیەکانتە.
