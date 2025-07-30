import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqData: FAQItem[] = [
    {
      question: "Bagaimana cara melacak paket saya?",
      answer: "      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, quo. Perspiciatis aperiam cum laboriosam? Sit, inventore porro provident doloremque incidunt dicta adipisci praesentium distinctio sed.",
      category: "tracking"
    },
    {
      question: "Bagaimana sistem kredit bekerja?",
      answer: "Sistem kredit memungkinkan Anda melakukan top-up saldo terlebih dahulu. Saat membuat order pengiriman, biaya akan otomatis terpotong dari saldo kredit Anda. Anda dapat top-up melalui transfer bank, e-wallet, atau kartu kredit.",
      category: "credit"
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, incidunt.",
      answer: "Waktu pengiriman bervariasi tergantung layanan: Regular (3-4 hari), Express (1-2 hari), Same Day (6-8 jam). Waktu dapat berbeda tergantung jarak dan kondisi cuaca.",
      category: "shipping"
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, incidunt.",
      answer: "Ya, semua paket dilindungi asuransi dasar gratis. Untuk nilai barang tinggi, Anda dapat menambah asuransi tambahan dengan biaya Rp 5.000 per pengiriman.",
      category: "shipping"
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, incidunt.",
      answer: "Anda dapat top-up saldo melalui dashboard member area dengan memilih menu 'Top-up Kredit'. Tersedia berbagai metode pembayaran seperti transfer bank, e-wallet (GoPay, OVO, DANA), dan kartu kredit.",
      category: "credit"
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, incidunt.", answer: "Segera hubungi customer service kami di 1500-123 atau email support@swiftexpress.com. Tim kami akan melakukan investigasi dan memberikan kompensasi sesuai dengan ketentuan asuransi.",
      category: "shipping"
    },
    {
      question: "Bisakah mengubah alamat tujuan setelah paket dikirim?",
      answer: "Perubahan alamat hanya dapat dilakukan jika paket belum keluar dari gudang asal. Hubungi customer service segera dengan menyertakan nomor resi untuk bantuan lebih lanjut.",
      category: "shipping"
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, incidunt.",
      answer: "Daftar gratis melalui halaman 'Daftar' dengan mengisi nama, email, dan nomor telepon. Setelah registrasi, Anda akan mendapat bonus kredit Rp 10.000 sebagai welcome bonus.",
      category: "account"
    },
    {
      question: "Apakah ada minimum top-up kredit?",
      answer: "Minimum top-up adalah Rp 10.000. Tidak ada maksimum limit untuk top-up, namun untuk keamanan, transaksi di atas Rp 10.000.000 memerlukan verifikasi tambahan.",
      category: "credit"
    },
    {
      question: "Bagaimana cara menghitung ongkir?",
      answer: "Ongkir dihitung berdasarkan berat paket, jarak pengiriman, dan jenis layanan. Gunakan fitur 'Cek Ongkir' untuk mengetahui biaya sebelum membuat order pengiriman.",
      category: "shipping"
    }
  ];

  const categories = [
    { id: 'all', name: 'Semua' },
    { id: 'shipping', name: 'Pengiriman' },
    { id: 'tracking', name: 'Tracking' },
    { id: 'credit', name: 'Sistem Kredit' },
    { id: 'account', name: 'Akun' }
  ];

  const filteredFAQ = selectedCategory === 'all'
    ? faqData
    : faqData.filter(item => item.category === selectedCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-600">Temukan jawaban untuk pertanyaan yang sering diajukan</p>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Kategori</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === category.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQ.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-green-50 rounded-xl p-8 border border-green-200 text-center">
          <h2 className="text-xl font-semibold text-green-900 mb-2">Tidak menemukan jawaban?</h2>
          <p className="text-green-700 mb-4">
            Tim customer service kami siap membantu Anda 24/7
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <a
              href="tel:1500123"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Hubungi 1500-123
            </a>
            <a
              href="mailto:support@swiftexpress.com"
              className="border border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors"
            >
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;