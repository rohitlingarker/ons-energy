'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';

export function CookieNotice() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('ons-cookies-accepted');
    if (!hasAccepted) {
      setShowNotice(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('ons-cookies-accepted', 'true');
    setShowNotice(false);
  };

  if (!showNotice) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-2">
      <Card className="max-w-md mx-auto border-blue-800 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-1">
              <p className="text-sm text-slate-700 mb-3">
                We use cookies to enhance your experience and analyze site usage. 
                By continuing to browse, you consent to our use of cookies in accordance with our Privacy Policy.
              </p>
              <div className="flex space-x-2">
                <Button size="sm" onClick={acceptCookies} className="bg-blue-800 hover:bg-blue-900">
                  Accept
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowNotice(false)}>
                  Decline
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotice(false)}
              className="p-1 h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}