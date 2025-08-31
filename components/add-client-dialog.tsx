'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreateClientRecord, CreateClientRecordSchema } from '@/types/client-record';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUser } from '@clerk/nextjs';

interface AddClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AddClientDialog({ open, onOpenChange, onSuccess }: AddClientDialogProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateClientRecord>({
    resolver: zodResolver(CreateClientRecordSchema),
  });

  const onSubmit = async (data: CreateClientRecord) => {
    setLoading(true);
    try {
      const response = await fetch('/api/client-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Record added successfully');
        reset();
        onOpenChange(false);
        onSuccess();
      } else {
        toast.error('Failed to add record');
      }
    } catch (error) {
      toast.error('Error adding record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Client Record</DialogTitle>
          <DialogDescription>
            Enter the details for the new client energy contract record.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-slate-800">Business Information</h3>
              
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  {...register('businessName')}
                  className={errors.businessName ? 'border-red-500' : ''}
                />
                {errors.businessName && (
                  <p className="text-sm text-red-600 mt-1">{errors.businessName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="mpanMprn">MPAN/MPRN</Label>
                <Input
                  id="mpanMprn"
                  {...register('mpanMprn')}
                  className={errors.mpanMprn ? 'border-red-500' : ''}
                />
                {errors.mpanMprn && (
                  <p className="text-sm text-red-600 mt-1">{errors.mpanMprn.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="siteAddress">Site Address</Label>
                <Textarea
                  id="siteAddress"
                  {...register('siteAddress')}
                  className={errors.siteAddress ? 'border-red-500' : ''}
                />
                {errors.siteAddress && (
                  <p className="text-sm text-red-600 mt-1">{errors.siteAddress.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="soldDate">Sold Date</Label>
                <Input
                  id="soldDate"
                  type="date"
                  {...register('soldDate')}
                  className={errors.soldDate ? 'border-red-500' : ''}
                />
                {errors.soldDate && (
                  <p className="text-sm text-red-600 mt-1">{errors.soldDate.message}</p>
                )}
              </div>
            </div>

            {/* Technical & Financial */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-slate-800">Technical & Financial</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ssd">SSD</Label>
                  <Input
                    id="ssd"
                    type="number"
                    step="0.01"
                    {...register('ssd', { valueAsNumber: true })}
                    className={errors.ssd ? 'border-red-500' : ''}
                  />
                  {errors.ssd && (
                    <p className="text-sm text-red-600 mt-1">{errors.ssd.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="eac">EAC</Label>
                  <Input
                    id="eac"
                    type="number"
                    step="0.01"
                    {...register('eac', { valueAsNumber: true })}
                    className={errors.eac ? 'border-red-500' : ''}
                  />
                  {errors.eac && (
                    <p className="text-sm text-red-600 mt-1">{errors.eac.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="standingCharges">Standing Charges</Label>
                  <Input
                    id="standingCharges"
                    type="number"
                    step="0.01"
                    {...register('standingCharges', { valueAsNumber: true })}
                    className={errors.standingCharges ? 'border-red-500' : ''}
                  />
                  {errors.standingCharges && (
                    <p className="text-sm text-red-600 mt-1">{errors.standingCharges.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="dayPrice">Day Price</Label>
                  <Input
                    id="dayPrice"
                    type="number"
                    step="0.01"
                    {...register('dayPrice', { valueAsNumber: true })}
                    className={errors.dayPrice ? 'border-red-500' : ''}
                  />
                  {errors.dayPrice && (
                    <p className="text-sm text-red-600 mt-1">{errors.dayPrice.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nightPrice">Night Price</Label>
                  <Input
                    id="nightPrice"
                    type="number"
                    step="0.01"
                    {...register('nightPrice', { valueAsNumber: true })}
                    className={errors.nightPrice ? 'border-red-500' : ''}
                  />
                  {errors.nightPrice && (
                    <p className="text-sm text-red-600 mt-1">{errors.nightPrice.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="terms">Terms</Label>
                  <Input
                    id="terms"
                    type="number"
                    {...register('terms', { valueAsNumber: true })}
                    className={errors.terms ? 'border-red-500' : ''}
                  />
                  {errors.terms && (
                    <p className="text-sm text-red-600 mt-1">{errors.terms.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="kva">KVA</Label>
                  <Input
                    id="kva"
                    type="number"
                    step="0.01"
                    {...register('kva', { valueAsNumber: true })}
                    className={errors.kva ? 'border-red-500' : ''}
                  />
                  {errors.kva && (
                    <p className="text-sm text-red-600 mt-1">{errors.kva.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="uplift">Uplift</Label>
                  <Input
                    id="uplift"
                    type="number"
                    step="0.01"
                    {...register('uplift', { valueAsNumber: true })}
                    className={errors.uplift ? 'border-red-500' : ''}
                  />
                  {errors.uplift && (
                    <p className="text-sm text-red-600 mt-1">{errors.uplift.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Commission & Contact */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-slate-800">Commission</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="commission">Commission</Label>
                  <Input
                    id="commission"
                    type="number"
                    step="0.01"
                    {...register('commission', { valueAsNumber: true })}
                    className={errors.commission ? 'border-red-500' : ''}
                  />
                  {errors.commission && (
                    <p className="text-sm text-red-600 mt-1">{errors.commission.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="totalCommission">Total Commission</Label>
                  <Input
                    id="totalCommission"
                    type="number"
                    step="0.01"
                    {...register('totalCommission', { valueAsNumber: true })}
                    className={errors.totalCommission ? 'border-red-500' : ''}
                  />
                  {errors.totalCommission && (
                    <p className="text-sm text-red-600 mt-1">{errors.totalCommission.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="partnerSaleCommission">Partner Sale Commission</Label>
                <Input
                  id="partnerSaleCommission"
                  type="number"
                  step="0.01"
                  {...register('partnerSaleCommission', { valueAsNumber: true })}
                  className={errors.partnerSaleCommission ? 'border-red-500' : ''}
                />
                {errors.partnerSaleCommission && (
                  <p className="text-sm text-red-600 mt-1">{errors.partnerSaleCommission.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  {...register('supplier')}
                  className={errors.supplier ? 'border-red-500' : ''}
                />
                {errors.supplier && (
                  <p className="text-sm text-red-600 mt-1">{errors.supplier.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-slate-800">Contact Information</h3>
              
              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  {...register('customerName')}
                  className={errors.customerName ? 'border-red-500' : ''}
                />
                {errors.customerName && (
                  <p className="text-sm text-red-600 mt-1">{errors.customerName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  {...register('contactNumber')}
                  className={errors.contactNumber ? 'border-red-500' : ''}
                />
                {errors.contactNumber && (
                  <p className="text-sm text-red-600 mt-1">{errors.contactNumber.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  onValueChange={(value) => register('status').onChange({ target: { value } })}
                  defaultValue="in discussion"
                >
                  <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="in discussion">In Discussion</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-red-600 mt-1">{errors.status.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="reasonForNotLive">Reason for not live (Optional)</Label>
                <Textarea
                  id="reasonForNotLive"
                  {...register('reasonForNotLive')}
                  className={errors.reasonForNotLive ? 'border-red-500' : ''}
                />
                {errors.reasonForNotLive && (
                  <p className="text-sm text-red-600 mt-1">{errors.reasonForNotLive.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-blue-800 hover:bg-blue-900">
              {loading ? 'Adding...' : 'Add Record'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}