'use client';

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Review {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  date: string;
  comment: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  priceType: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  image: string;
}

export default function ProviderProfilePage() {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const services: Service[] = [
    {
      id: '1',
      name: 'یەکەی شێڵفی تایبەتی',
      description: 'دیزاین و دامەزراندن لەخۆدەگرێت',
      price: '٢٠٠،٠٠٠+',
      priceType: 'نرخی دەستپێک'
    },
    {
      id: '2',
      name: 'کۆکردنەوەی فرنیچەر',
      description: 'نرخی کاتژمێر، کەمترین ٢ کاتژمێر',
      price: '٨٠،٠٠٠',
      priceType: '/ کاتژمێر'
    },
    {
      id: '3',
      name: 'چاککردنەوە و نۆژەنکردنەوە',
      description: 'نرخی دیاریکراو بۆ شتە بچووکەکان',
      price: '١٥٠،٠٠٠',
      priceType: 'دیاریکراو'
    },
  ];

  const portfolio: PortfolioItem[] = [
    {
      id: '1',
      title: 'مێزی ناوەڕۆکی گێز',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr48bVceYGnzjpgKqSGVrZg0mXOxzKM7_9FZnr3CGb0HHkttvRq8jUjQZgfdAdM7kC6KR6DrAHft5_HrL-Y9ZP6vlLtZUYz8dUUKNzvybS71NOt6_L385xcWSSV4fvEL7rSO5HNhOW5d36GJRFRL4dNNYeY2H6hK6Fy1RXQ8kvotBt32cai0_kPAqDga-wK2OXAGGSWCT0jPUfTuhtIlV791jm-S-2L4nN4xaoqBzvwKjbTzVs2zbVLDRqatfbX7GhVt1VamFqFUVj'
    },
    {
      id: '2',
      title: 'شێڵفی دروستکراو',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV1vpANUQNh5sPLQ4lapu70-v26ASZzKfyWpJkDnJYC0dy9zyUFGCGL_QMHksv0Rt2VGFKdTjS87AedxLD_6hzmWY46VX-lVQjk8d0RalA70FA4nNb4i8cc9BWWtDhY4VjbhzmDbkqCfsmWzkAv-36bbY5ANCqHLrhybrtdrQmHPsPZo_2FCHgYD-cMlNvaPKS7OD6vVHnibcVduM4K_fkjxJ5fzLW6fD0pNewS6B7vgfRYiECPnsqZWQYgbzc6_kIh9AdqMAIMlxB'
    },
    {
      id: '3',
      title: 'کورسی سەدەی ناوەڕاست',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgwG-6bgqQfbrp2YBpUnm_-wQjHM8-ra4P6zUnVyWXd2f1J7ytuG8xAClWMqqcwhkJN63i-brkgjz6D5wnbO929ijUocm3VBROnD9InSw6EoO2GpvTqzGJfLSRt9qS4eMcS3GDl0qcWSToLp58CPW6EHPX8HIR1OH1UQwYJfHcnBgEXm0Y5D2pc4WwQtUVV_yTiaaNBV6nSCMTjotPLXCOT-M62YkGVDfMwSvddSOQxj6qhSLlafbeLpzHC63Rcwz_tACqQ0RfSSQG'
    },
  ];

  const reviews: Review[] = [
    {
      id: '1',
      userName: 'سارا جێنکینز',
      userImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXUDASIoTkR6XusLThxT7YdMPvmJWWMe2G86E8x5J0He9XUaEvYqEm5IKhVF-Mkrz-Pxpl0sY_sqfctF-FTRUNSq6zw8Q5NFna2stwWilPBGau98YRImUMftNffiMlP9H3bwYvl7LpD0kjiaZx3drNjhyBe5ZnWdyakkOBkK0wvgwPO32Dxgj8_RWJ2GWB-w_B4Vm2Dc7E5ayURM-NOlLz57xSF-fgiYPoGsJnf2Pfg7mrPbX0hxqiesKSQqq0v8O3dEJ1Pm78bTGG',
      rating: 5,
      date: '٢ ڕۆژ لەمەوپێش',
      comment: 'ئەحمەد کارێکی زۆر باشی کرد لەسەر شێڵفی تایبەتیەکەمان. کاتی خۆی لێ نەبڕی، پاک بوو، و پیشەیی بوو. زۆر پێشنیار دەکەم!'
    },
    {
      id: '2',
      userName: 'مایکڵ ترووەنگ',
      userImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8QEkSN5sm-TQnMN5u0KhlVT0tDIWw0guAZjNFZ2GivQ2eYKZ5-ISx2mvyTIPsq2q-F0Tqsp2JvpB8BWJQEaEUAIBhiEcyyvH9GuTjtj6WpdXkV-3MhjpJCRfJYjl3YkoNGnbbYNUU6RA10Up8RBBs-cYy7Jo7hT2-IolojZ65OiEcsm4YNJlLv8XbA_LnVtrYIvkJsMup8PYM3BiQ2Z1_GTnNGOekst0uD0C0qAgk8FQNqbiZ_96X6Y6oLeUT5WFEYqA6kVDG8w4c',
      rating: 4.5,
      date: '١ هەفتە لەمەوپێش',
      comment: 'کاری گەورە لەسەر چاککردنەوەی کورسیەکە. وەک نوێ دەردەکەوێت. تەنها ستێرەیەکم لێ کەمکردەوە چونکە کاتی دیاریکردنی کاتژمێر کەمێک زیاتر کێشای.'
    }
  ];

  const handleChat = () => {
    router.push('/dashboard/messages/chat');
  };

  const handleBookNow = () => {
    alert('نۆرکردن - ئەم تایبەتمەندییە بەزوانە زیاد دەکرێت');
  };

  const handleShare = () => {
    alert('هاوبەشکردن - ئەم تایبەتمەندییە بەزوانە زیاد دەکرێت');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#15181C] text-white pb-24">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.4s ease-out forwards;
        }

        .glass-nav {
          background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%);
        }

        .glass-bottom {
          background: rgba(21, 24, 28, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* Header / Hero Section */}
      <header className="relative w-full h-[420px]">
        {/* Top Navigation Overlay */}
        <div className="absolute top-0 right-0 left-0 w-full z-20 flex justify-between items-center p-4 pt-12 glass-nav">
          <div className="flex gap-3">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-colors"
            >
              <Icon icon={isFavorite ? "solar:heart-bold" : "solar:heart-linear"} className={`w-6 h-6 ${isFavorite ? 'text-red-500' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-colors"
            >
              <Icon icon="solar:share-bold" className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-colors"
          >
            <Icon icon="solar:arrow-right-linear" className="w-6 h-6" />
          </button>
        </div>

        {/* Hero Image */}
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBYIhTmJN3FAPgSBitJLQ9eo9lisPOI7L6xJngvFAvQ1cQasVbvlsEzlHM3MKWIWwXo9-o68yJDWZpL--8lHSBLhhq9Mf2b8_R0YGN5OPGA4bmLAKtnZz6zw5pCq7sQFscxL6EZz4-F-SLuSa26MJokM9doj9Y3GbpyoJUyBGT5Dzyeuad2SEfOJvnG0upve10awEJWTxJpzUjd7uitUGRc1l1v6pSKJQamlQptz2lZvpLMPbam2RbocV9BREFP0yTQ6-NiqTW2FV73')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#15181C] via-transparent to-transparent opacity-90"></div>
        </div>
      </header>

      {/* Floating Profile Card */}
      <div className="relative px-4 -mt-24 z-10 w-full max-w-lg mx-auto animate-slide-up">
        <div className="bg-[#202328] rounded-2xl p-6 shadow-2xl border border-white/5 flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4">
            <div
              className="w-28 h-28 rounded-full border-4 border-[#15181C] bg-gray-700 bg-cover bg-center shadow-lg"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAEm_Y4CuNqlvkJWYK6uCOpFchmuv8aoHZi1hpCe92G-70o2rFaiTlY27CJq3F2vQYoEdPehg5nF6tPx7S8lV6wa07eFSqqf6XJ-_jBNGl43omHVDu4_PzJQAPjruLyD1VIM6MXhfGqzH5BYOzn15LZir1VPJ6YKSgxFERjCWjuu8kl_UkWRPzuYcYa7XFSO8MQ3IGAsKrVRFELwplV2-yHmbSW_VlDKTxHcW5cPkdi8YKtZ9CSKTBChzmNpEFKEwMzkCBwjYYPSVDa')"
              }}
            ></div>
            <div className="absolute bottom-1 left-1 bg-green-600 text-white rounded-full p-1 border-4 border-[#15181C] flex items-center justify-center">
              <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-1">ئەحمەد کەریم</h1>
          <p className="text-sm text-gray-400 mb-4">پیشەوەری دارتاشی و دیزاینەری فرنیچەر</p>

          {/* Stats Row */}
          <div className="flex items-center gap-6 w-full justify-center border-t border-white/10 pt-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-yellow-500">
                <Icon icon="solar:star-bold" className="w-5 h-5" />
                <span className="font-bold text-lg text-white">٤.٩</span>
              </div>
              <span className="text-xs text-gray-400">١٢٠ هەڵسەنگاندن</span>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-green-600">
                <Icon icon="solar:shield-check-bold" className="w-5 h-5" />
                <span className="font-bold text-lg text-white">١٠٠٪</span>
              </div>
              <span className="text-xs text-gray-400">سەرکەوتنی کار</span>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-blue-400">
                <Icon icon="solar:clock-circle-bold" className="w-5 h-5" />
                <span className="font-bold text-lg text-white">٥+</span>
              </div>
              <span className="text-xs text-gray-400">ساڵ ئەزموون</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 mt-6 max-w-lg mx-auto flex flex-col gap-6 hide-scrollbar overflow-y-auto">
        {/* About Section */}
        <section className="bg-[#202328] rounded-xl p-6 border border-white/5 animate-fade-in">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Icon icon="solar:user-bold" className="w-5 h-5 text-green-600" />
            دەربارە
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            پسپۆڕم لە دارتاشیی بەرزە بەها و فرنیچەری تایبەتی بە زیاتر لە ١٠ ساڵ ئەزموون. هونەرمەندی و بەختەوەری دەهێنمە هەر پڕۆژەیەک، جا مێزی ناوەڕۆکی تایبەتی بێت یان نۆژەنکردنەوەی کابینێتی کۆن.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10">فرنیچەری تایبەتی</span>
            <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10">نۆژەنکردنەوە</span>
            <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10">کۆکردنەوە</span>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-[#202328] rounded-xl p-6 border border-white/5 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Icon icon="solar:widget-4-bold" className="w-5 h-5 text-green-600" />
              خزمەتگوزارییەکان
            </h2>
            <button className="text-xs text-green-600 font-medium hover:underline">هەموویان ببینە</button>
          </div>
          <div className="flex flex-col gap-4">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`flex justify-between items-start pb-4 ${
                  index < services.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="flex-1 text-right">
                  <h3 className="font-medium text-white text-sm">{service.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{service.description}</p>
                </div>
                <div className="text-left mr-4">
                  <span className="block font-bold text-white text-sm">{service.price}</span>
                  <span className="text-[10px] text-gray-400">{service.priceType}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Icon icon="solar:gallery-bold" className="w-5 h-5 text-green-600" />
              نمونەکاری
            </h2>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10">
                <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10">
                <Icon icon="solar:arrow-left-linear" className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {portfolio.map((item) => (
              <div key={item.id} className="aspect-[4/5] rounded-lg bg-gray-800 overflow-hidden relative group">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${item.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <p className="text-white text-xs font-bold">{item.title}</p>
                </div>
              </div>
            ))}
            <div className="aspect-[4/5] rounded-lg bg-white/5 overflow-hidden relative group flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors border border-white/5">
              <div className="text-center">
                <Icon icon="solar:add-circle-bold" className="w-8 h-8 text-green-600 mb-1 mx-auto" />
                <p className="text-xs text-gray-400">بینینی زیاتر</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="pb-8 animate-fade-in">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Icon icon="solar:star-bold" className="w-5 h-5 text-green-600" />
            هەڵسەنگاندنە نوێیەکان
          </h2>
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-[#202328] rounded-xl p-4 border border-white/5">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="w-10 h-10 rounded-full bg-gray-600 bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url('${review.userImage}')` }}
                    ></div>
                    <div className="flex-1 text-right">
                      <p className="text-sm font-bold text-white">{review.userName}</p>
                      <p className="text-[10px] text-gray-400">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-500 mr-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        icon={i < Math.floor(review.rating) ? "solar:star-bold" : i < review.rating ? "solar:star-bold" : "solar:star-linear"}
                        className="w-4 h-4"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-2 text-right">{review.comment}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 text-sm text-gray-400 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
            خوێندنەوەی هەموو ١٢٠ هەڵسەنگاندنەکان
          </button>
        </section>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 right-0 left-0 w-full glass-bottom border-t border-white/10 p-4 pb-8 z-50">
        <div className="max-w-lg mx-auto flex gap-4">
          <button
            onClick={handleChat}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border border-white/20 bg-white/5 text-white font-bold hover:bg-white/10 transition-colors"
          >
            <Icon icon="solar:chat-round-dots-bold" className="w-5 h-5" />
            چات
          </button>
          <button
            onClick={handleBookNow}
            className="flex-[2] flex items-center justify-center gap-2 py-4 rounded-xl bg-green-600 text-white font-bold shadow-lg hover:bg-green-700 transition-colors"
          >
            <Icon icon="solar:calendar-mark-bold" className="w-5 h-5" />
            نۆرکردن ئێستا
          </button>
        </div>
      </div>
    </div>
  );
}
