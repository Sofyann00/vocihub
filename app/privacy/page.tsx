import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - vocihub',
  description: 'Privacy Policy for vocihub game voucher and top-up services',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 italic mb-8">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <section className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                1. Information We Collect
              </h2>
              <p className="text-gray-600">
                vocihub collects personal information including but not limited to: name, email address, phone number, game account details, player IDs, payment information, and transaction history when you purchase game vouchers, top-up credits, or create an account on our platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-600">
                We use your information to:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600 space-y-1">
                <li>Process your game voucher and top-up purchases</li>
                <li>Deliver purchased items to your game account</li>
                <li>Provide customer support and assistance</li>
                <li>Send purchase confirmations and transaction updates</li>
                <li>Maintain records of your transactions</li>
                <li>Send promotional offers and game updates (with your consent)</li>
                <li>Improve our services and user experience</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                3. Data Security
              </h2>
              <p className="text-gray-600">
                We implement strong technical and organizational measures to protect your personal and payment information against unauthorized access, alteration, disclosure, or destruction. Our security protocols meet industry standards for online transactions and data protection.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                4. Data Retention
              </h2>
              <p className="text-gray-600">
                We retain your personal and transaction information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, and as required by applicable laws. Transaction records are typically maintained for a minimum of 5 years to comply with financial regulations and to assist with any potential inquiries or disputes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                5. Your Rights
              </h2>
              <p className="text-gray-600">
                Under Indonesian data protection laws, you have the right to:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600 space-y-1">
                <li>Access your personal data and transaction history</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Object to processing of your data</li>
                <li>Withdraw consent for marketing communications</li>
                <li>Request limitations on how we use your information</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                6. Cookies and Tracking
              </h2>
              <p className="text-gray-600">
                We use cookies and similar tracking technologies to enhance your experience on our platform, remember your preferences, maintain your login status, analyze site traffic, and provide personalized game recommendations based on your purchase history.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                7. Third-Party Services
              </h2>
              <p className="text-gray-600">
                We may use third-party payment processors and game platform services to facilitate transactions. These services have their own privacy policies and data practices. We encourage you to review their policies to understand how they handle your information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                8. Contact Information
              </h2>
              <div className="text-gray-600">
                <p>For any questions about this Privacy Policy or our data practices, please contact us at:</p>
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