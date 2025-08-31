import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Zap } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-blue-800" />
            <span className="text-2xl font-bold text-blue-800">ONS Energy</span>
          </div>
          <Link href="/">
            <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-6">
              Last updated: January 2025
            </p>

            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="mb-4">
              ONS Energy collects information you provide directly to us, such as when you request a quote, 
              contact us, or use our services. This may include your name, email address, phone number, 
              business information, and energy usage data.
            </p>

            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Provide energy brokerage services</li>
              <li>Communicate with you about our services</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to improve your experience on our website. 
              You can control cookies through your browser settings. Essential cookies are necessary for 
              the website to function properly.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="mb-4">
              Under UK GDPR, you have the right to:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing</li>
              <li>Data portability</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-slate-100 p-4 rounded-md">
              <p><strong>ONS Energy</strong></p>
              <p>124 City Road, London EC1V 2NX, UK</p>
              <p>Email: info@ons.energy</p>
              <p>Phone: +44-3300576620</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}