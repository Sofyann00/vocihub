import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - vocihub',
  description: 'Terms of Service and conditions for using vocihub game voucher and top-up services',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 italic mb-8">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <section className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                1. Agreement to Terms
              </h2>
              <p className="text-gray-600">
                By accessing and using the game voucher and top-up services provided by PT GENGGAM TEKNOLOGI ASIA (hereinafter referred to as "vocihub"), you accept and agree to be bound by the terms and provisions of this agreement.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                2. Game Services
              </h2>
              <p className="text-gray-600">
                vocihub provides game voucher and top-up services including in-game currency, battle passes, premium accounts, and various game items. All service listings, including prices, availability, and specifications, are subject to change without prior notice. We guarantee the authenticity and validity of all game vouchers and items provided through our platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                3. Purchases and Delivery
              </h2>
              <p className="text-gray-600">
                All purchases are subject to availability and game platform requirements. Delivery of purchased items is typically instant but may be subject to game server conditions and platform processing times. In case of delivery delays, we will notify you and provide updates on the status of your purchase. Refunds are available only in accordance with our refund policy and game platform terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                4. Account and Information Use
              </h2>
              <p className="text-gray-600">
                All game account information and personal details provided to vocihub will be treated with strict confidentiality. We will not disclose your information to third parties except when required by law or with your explicit permission. vocihub may use anonymized data for service improvement and customer support purposes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                5. Limitation of Liability
              </h2>
              <p className="text-gray-600">
                While we guarantee the authenticity of our game vouchers and items, vocihub shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. This includes but is not limited to game account issues, server problems, or platform-specific restrictions that may affect the use of purchased items.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                6. User Responsibilities
              </h2>
              <p className="text-gray-600">
                Users are responsible for providing accurate game account information and ensuring compliance with game platform terms of service. Users must verify all purchases before completing transactions and notify vocihub promptly of any issues. vocihub is not responsible for account issues resulting from incorrect information provided by users or violations of game platform terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                7. Governing Law
              </h2>
              <p className="text-gray-600">
                These terms are governed by the laws of the Republic of Indonesia. Any disputes shall be subject to the exclusive jurisdiction of the courts in Jakarta, Indonesia.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                8. Contact Information
              </h2>
              <div className="text-gray-600">
                <p>For any questions about these Terms of Service, please contact us at:</p>
                <div className="mt-2">
                  <p>PT GENGGAM TEKNOLOGI ASIA</p>
                  <p>Gedung Is Plaza Lt. 5</p>
                  <p>Jl Pramuka Kav 150, Utan Kayu Utara</p>
                  <p>Matraman, Jakarta Timur</p>
                  <p>DKI Jakarta, Indonesia</p>
                  <p>Email: admin@vocihub.com</p>
                  <p>Phone: (021) 52067542</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 