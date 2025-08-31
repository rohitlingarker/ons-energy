'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { ClientRecord } from '@/types/client-record';
import { EditClientDialog } from '@/components/edit-client-dialog';
import { ViewClientDialog } from '@/components/view-client-dialog';
import { toast } from 'sonner';

interface ClientRecordsTableProps {
  records: ClientRecord[];
  loading: boolean;
  onRefresh: () => void;
  isAdmin: boolean;
}

export function ClientRecordsTable({ records, loading, onRefresh, isAdmin }: ClientRecordsTableProps) {
  const [editingRecord, setEditingRecord] = useState<ClientRecord | null>(null);
  const [viewingRecord, setViewingRecord] = useState<ClientRecord | null>(null);

  const deleteRecord = async (id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return;

    try {
      const response = await fetch(`/api/client-records/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Record deleted successfully');
        onRefresh();
      } else {
        toast.error('Failed to delete record');
      }
    } catch (error) {
      toast.error('Error deleting record');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading records...</p>
        </CardContent>
      </Card>
    );
  }

  if (records.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-slate-600">No records found. Add your first client record to get started.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>MPAN/MPRN</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Sold Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total Commission</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record._id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">{record.businessName}</TableCell>
                    <TableCell>{record.customerName}</TableCell>
                    <TableCell className="font-mono text-sm">{record.mpanMprn}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.supplier}</Badge>
                    </TableCell>
                    <TableCell>{new Date(record.soldDate).toLocaleDateString('en-GB')}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={record.status === 'completed' ? 'success' : record.status === 'in progress' ? 'secondary' : 'outline'}
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      £{record.totalCommission.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setViewingRecord(record)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {isAdmin && (
                            <DropdownMenuItem onClick={() => setEditingRecord(record)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          )}
                          {isAdmin && (
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => record._id && deleteRecord(record._id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <EditClientDialog
        record={editingRecord}
        open={!!editingRecord}
        onOpenChange={(open) => !open && setEditingRecord(null)}
        onSuccess={onRefresh}
      />

      <ViewClientDialog
        record={viewingRecord}
        open={!!viewingRecord}
        onOpenChange={(open) => !open && setViewingRecord(null)}
      />
    </>
  );
}