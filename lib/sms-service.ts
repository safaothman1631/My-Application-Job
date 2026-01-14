// SMS Service Helper (Twilio simulation for now)

export interface SMSOptions {
  to: string;
  message: string;
}

export const sendSMS = async (options: SMSOptions): Promise<boolean> => {
  try {
    // For production, integrate with Twilio, Vonage, or local SMS gateway
    if (process.env.NODE_ENV === 'production' && process.env.TWILIO_ACCOUNT_SID) {
      // TODO: Integrate real Twilio
      // const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      // await client.messages.create({
      //   body: options.message,
      //   from: process.env.TWILIO_PHONE_NUMBER,
      //   to: options.to
      // });
      console.log(`📱 SMS would be sent to ${options.to}: ${options.message}`);
      return true;
    } else {
      // Development: Just log
      console.log(`📱 [DEV] SMS to ${options.to}: ${options.message}`);
      return true;
    }
  } catch (error) {
    console.error('❌ SMS sending failed:', error);
    return false;
  }
};

// SMS Templates
export const smsTemplates = {
  bookingConfirmation: (serviceTitle: string, date: string) => 
    `✅ داواکاریەکەت پشتڕاست کرایەوە بۆ ${serviceTitle} لە ${date}. سوپاس - بەزاری`,

  providerNewBooking: (serviceTitle: string) =>
    `🔔 داواکاریەکی نوێت هەیە بۆ ${serviceTitle}. تکایە بچۆ ناو ئەپەکە.`,

  otpCode: (code: string) =>
    `کۆدی پشتڕاستکردنەوەکەت: ${code}\nتکایە ئەم کۆدە لە کەس نەشارەوە. - بەزاری`,

  bookingReminder: (serviceTitle: string, time: string) =>
    `⏰ بیرهێنانەوە: داواکاریەکەت بۆ ${serviceTitle} لە ${time} دەستپێدەکات.`,

  bookingCancelled: (serviceTitle: string) =>
    `❌ داواکاریەکەت بۆ ${serviceTitle} هەڵوەشایەوە. پارەکەت دەگەڕێتەوە بۆ ئەژمێرەکەت.`,
};
