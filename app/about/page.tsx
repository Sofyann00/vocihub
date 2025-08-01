import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - vocihub',
  description: 'Your trusted game voucher and top-up provider in Indonesia',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            About vocihub
          </h1>
          <p className="text-sm text-gray-500 italic mb-8">
            Your Trusted Game Voucher and Top-Up Provider in Indonesia
          </p>

          <section className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Our Story
              </h2>
              <p className="text-gray-600">
                Founded by passionate gamers, vocihub has emerged as a leading game voucher and top-up provider in Indonesia. Our journey began with a simple mission: to provide gamers with a reliable, fast, and secure way to purchase game credits and vouchers. What started as a small team of gaming enthusiasts has grown into a trusted platform serving thousands of gamers across Indonesia.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Why Choose Us
              </h2>
              <ul className="text-gray-600 list-disc pl-5 space-y-2">
                <li>Instant Delivery of Game Vouchers and Credits</li>
                <li>Wide Range of Popular Games Supported</li>
                <li>Secure Payment Methods</li>
                <li>24/7 Customer Support</li>
                <li>Competitive Prices</li>
                <li>Trusted by Thousands of Gamers</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Our Commitment
              </h2>
              <p className="text-gray-600">
                At vocihub, we are committed to providing the best gaming experience for our customers. We understand the importance of quick and reliable top-up services for gamers. Our team works tirelessly to ensure instant delivery of vouchers and credits, secure transactions, and excellent customer support. We pride ourselves on building trust with our gaming community and ensuring satisfaction through our reliable services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Our Services
              </h2>
              <ul className="text-gray-600 list-disc pl-5 space-y-2">
                <li>Game Voucher Sales</li>
                <li>In-Game Currency Top-Up</li>
                <li>Battle Pass and Season Pass</li>
                <li>Game Item Purchases</li>
                <li>Premium Account Upgrades</li>
                <li>Gift Card Services</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Office Location
              </h2>
              <div className="text-gray-600">
                <p>Visit our office:</p>
                <div className="mt-2">
                  <p>PT GENGGAM TEKNOLOGI ASIA</p>
                  <p>Gedung Is Plaza Lt. 5</p>
                  <p>Jl Pramuka Kav 150, Utan Kayu Utara</p>
                  <p>Matraman, Jakarta Timur</p>
                  <p>DKI Jakarta, Indonesia</p>
                  <p>Kode Pos: 13120</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Support Hours
              </h2>
              <div className="text-gray-600 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Weekdays:</p>
                  <p>Monday - Friday</p>
                  <p>09:00 AM - 5:00 PM</p>
                </div>
                <div>
                  <p className="font-medium">Weekends:</p>
                  <p>10:00 AM - 3:00 PM</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Contact Information
              </h2>
              <div className="text-gray-600">
                <p>Get in touch with our support team:</p>
                <div className="mt-2 space-y-1">
                  <p>Phone: (021) 52067542</p>
                  <p>Email: admin@vocihub.com</p>
                  <p>WhatsApp: +62 812-8845-8953</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 