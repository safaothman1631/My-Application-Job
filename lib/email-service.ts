// Email Service Helper using Nodemailer
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('SMTP credentials not configured. Email not sent.');
      return false;
    }

    await transporter.sendMail({
      from: `"بەزاری" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.subject,
    });

    console.log(`✅ Email sent to ${options.to}`);
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return false;
  }
};

// Email Templates
export const emailTemplates = {
  bookingConfirmation: (userName: string, serviceTitle: string, date: string) => ({
    subject: 'پشتڕاستکردنەوەی داواکاری - Booking Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563EB;">✅ داواکاریەکەت پشتڕاست کرایەوە!</h2>
        <p>سڵاو ${userName},</p>
        <p>داواکاریەکەت بۆ <strong>${serviceTitle}</strong> بەسەرکەوتوویی تۆمار کرا.</p>
        <p><strong>بەروار:</strong> ${date}</p>
        <p>سوپاس بۆ بەکارهێنانی بەزاری!</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">بەزاری - سەکۆی خزمەتگوزاریە نزیکەکان</p>
      </div>
    `,
  }),

  providerNewBooking: (providerName: string, customerName: string, serviceTitle: string) => ({
    subject: 'داواکاریەکی نوێ - New Booking Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #22C55E;">🔔 داواکاریەکی نوێت هەیە!</h2>
        <p>سڵاو ${providerName},</p>
        <p>داواکاریەکی نوێت هەیە لە <strong>${customerName}</strong> بۆ <strong>${serviceTitle}</strong>.</p>
        <p>تکایە بچۆ ناو ئەپەکە و وەڵامی داواکاریەکە بدەرەوە.</p>
        <a href="http://localhost:3002" style="display: inline-block; background: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 16px;">
          بینینی داواکاریەکە
        </a>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">بەزاری - سەکۆی خزمەتگوزاریە نزیکەکان</p>
      </div>
    `,
  }),

  reviewReminder: (userName: string, serviceTitle: string) => ({
    subject: 'هەڵسەنگاندنی خزمەتگوزاری - Review Reminder',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #F59E0B;">⭐ ڕای خۆت بنووسە!</h2>
        <p>سڵاو ${userName},</p>
        <p>ئومێدەوارین خزمەتگوزاری <strong>${serviceTitle}</strong> بەدڵت بووبێت!</p>
        <p>تکایە دەقیقەیەک کات تەرخان بکە و ڕا و هەڵسەنگاندنەکەت بنووسە.</p>
        <p>ئەم کارە یارمەتی خەڵکانی تر دەدات کە باشترین پیشەسازەکان بدۆزنەوە.</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">بەزاری - سەکۆی خزمەتگوزاریە نزیکەکان</p>
      </div>
    `,
  }),
};
