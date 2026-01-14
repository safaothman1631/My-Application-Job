/**
 * Generate VAPID Keys for Push Notifications
 * Run this script once to generate your VAPID keys
 * 
 * Usage:
 * node scripts/generate-vapid-keys.js
 */

const webpush = require('web-push');

console.log('\n🔑 Generating VAPID Keys for Push Notifications...\n');

const vapidKeys = webpush.generateVAPIDKeys();

console.log('✅ VAPID Keys Generated Successfully!\n');
console.log('Add these to your .env.local file:\n');
console.log('─'.repeat(60));
console.log(`NEXT_PUBLIC_VAPID_PUBLIC_KEY=${vapidKeys.publicKey}`);
console.log(`VAPID_PRIVATE_KEY=${vapidKeys.privateKey}`);
console.log('─'.repeat(60));
console.log('\n⚠️  Keep these keys secret and never commit them to git!\n');
