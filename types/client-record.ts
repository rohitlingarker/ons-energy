import { z } from 'zod';

export const ClientRecordSchema = z.object({
  _id: z.string().optional(),
  businessName: z.string().min(1, 'Business name is required'),
  mpanMprn: z.string().min(1, 'MPAN/MPRN is required'),
  soldDate: z.string().min(1, 'Sold date is required'),
  siteAddress: z.string().min(1, 'Site address is required'),
  ssd: z.number().min(0, 'SSD must be positive'),
  eac: z.number().min(0, 'EAC must be positive'),
  standingCharges: z.number().min(0, 'Standing charges must be positive'),
  dayPrice: z.number().min(0, 'Day price must be positive'),
  nightPrice: z.number().min(0, 'Night price must be positive'),
  terms: z.number().min(1, 'Terms must be at least 1'),
  kva: z.number().min(0, 'KVA must be positive'),
  uplift: z.number().min(0, 'Uplift must be positive'),
  commission: z.number().min(0, 'Commission must be positive'),
  totalCommission: z.number().min(0, 'Total commission must be positive'),
  supplier: z.string().min(1, 'Supplier is required'),
  customerName: z.string().min(1, 'Customer name is required'),
  email: z.string().email('Valid email is required'),
  contactNumber: z.string().min(10, 'Valid contact number is required'),
  reasonForNotLive: z.string().optional(),
  partnerSaleCommission: z.number().min(0, 'Partner sale commission must be positive'),
  status: z.enum(['in progress', 'in discussion', 'completed']).default('in discussion'),
});

export type ClientRecord = z.infer<typeof ClientRecordSchema>;

export const CreateClientRecordSchema = ClientRecordSchema.omit({ _id: true });
export type CreateClientRecord = z.infer<typeof CreateClientRecordSchema>;