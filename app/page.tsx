'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Zap, Shield, Lightbulb, Users, Phone, Mail, MapPin } from 'lucide-react';
import { CookieNotice } from '@/components/cookie-notice';
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';


export default function Home() {
  const { isSignedIn } = useUser();
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-blue-800" />
            <span className="text-2xl font-bold text-blue-800">ONS Energy</span>
          </div>
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link href="/sign-in">
              <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white">
                Login
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            UK Energy Broker
            <span className="block text-blue-800">Cost-Saving Solutions</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            ONS Energy: A UK-based energy broker offering tailored cost-saving solutions for electricity, gas, and renewables to business clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3">
              Get Quote
            </Button>
            <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3" >
              <Link href="https://ons.energy/"> 
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            We help businesses reduce energy costs, secure fair contracts, and access expert consultancy.
          </h2>
          
          {/* Core Values */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Lightbulb className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Cutting-edge solutions for modern energy challenges
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-800 mx-auto mb-4" />
                <CardTitle className="text-lg">Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Clear, honest communication in all our dealings
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Zap className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Sustainability</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Renewable energy solutions for a greener future
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-800 mx-auto mb-4" />
                <CardTitle className="text-lg">Customer Service</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Dedicated support throughout your energy journey
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <MapPin className="h-8 w-8 text-blue-800 mx-auto mb-4" />
                <CardTitle>Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  124 City Road<br />
                  London EC1V 2NX<br />
                  United Kingdom
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Phone className="h-8 w-8 text-green-600 mx-auto mb-4" />
                <CardTitle>Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">+44-3300576620</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Mail className="h-8 w-8 text-blue-800 mx-auto mb-4" />
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">info@ons.energy</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Zap className="h-6 w-6" />
              <span className="text-xl font-bold">ONS Energy</span>
            </div>
            <p className="text-slate-400 mb-4">
              © 2025 ONS Energy. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <CookieNotice />
    </div>
  );
}