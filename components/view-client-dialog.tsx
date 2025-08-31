'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ClientRecord } from '@/types/client-record';

interface ViewClientDialogProps {
  record: ClientRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewClientDialog({ record, open, onOpenChange }: ViewClientDialogProps) {
  if (!record) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{record.businessName}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-slate-600">MPAN/MPRN</p>
                <p className="font-mono">{record.mpanMprn}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Site Address</p>
                <p className="whitespace-pre-line">{record.siteAddress}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Sold Date</p>
                <p>{new Date(record.soldDate).toLocaleDateString('en-GB')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Supplier</p>
                <Badge variant="outline">{record.supplier}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-slate-600">Customer Name</p>
                <p>{record.customerName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Email</p>
                <p>{record.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Contact Number</p>
                <p>{record.contactNumber}</p>
              </div>
              {record.reasonForNotLive && (
                <div>
                  <p className="text-sm font-medium text-slate-600">Reason for not live</p>
                  <p className="whitespace-pre-line">{record.reasonForNotLive}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Technical Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-600">SSD</p>
                  <p>{record.ssd}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">EAC</p>
                  <p>{record.eac}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-600">Day Price</p>
                  <p>£{record.dayPrice.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Night Price</p>
                  <p>£{record.nightPrice.toFixed(4)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-600">Standing Charges</p>
                  <p>£{record.standingCharges.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Terms</p>
                  <p>{record.terms} months</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-600">KVA</p>
                  <p>{record.kva}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Uplift</p>
                  <p>{record.uplift}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Financial Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-slate-600">Commission</p>
                <p className="text-green-600 font-medium">£{record.commission.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Total Commission</p>
                <p className="text-green-600 font-bold text-lg">£{record.totalCommission.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Partner Sale Commission</p>
                <p className="text-green-600 font-medium">£{record.partnerSaleCommission.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}