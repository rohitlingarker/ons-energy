'use client';

import { useState, useEffect } from 'react';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Zap, Plus, Search, Download } from 'lucide-react';
import { ClientRecord } from '@/types/client-record';
import { ClientRecordsTable } from '@/components/client-records-table';
import { AddClientDialog } from '@/components/add-client-dialog';
import { toast } from 'sonner';

export function DashboardContent({ isAdmin }: { isAdmin: boolean }) {
  const [records, setRecords] = useState<ClientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/client-records');
      if (response.ok) {
        const data = await response.json();
        setRecords(data);
      } else {
        toast.error('Failed to fetch records');
      }
    } catch (error) {
      toast.error('Error fetching records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const filteredRecords = records.filter(record =>
    record.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCommission = records.reduce((sum, record) => sum + record.totalCommission, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-blue-800" />
            <span className="text-2xl font-bold text-blue-800">ONS Energy</span>
            <Badge variant="outline" className="ml-2">Admin Dashboard</Badge>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Records</CardDescription>
              <CardTitle className="text-2xl">{records.length}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Commission</CardDescription>
              <CardTitle className="text-2xl text-green-600">
                £{totalCommission.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Suppliers</CardDescription>
              <CardTitle className="text-2xl">
                {new Set(records.map(r => r.supplier)).size}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Client Records</CardTitle>
                <CardDescription>Manage your client database and energy contracts</CardDescription>
              </div>
              <div className="flex gap-2">
                {isAdmin && (
                  <Button onClick={() => setShowAddDialog(true)} className="bg-blue-800 hover:bg-blue-900">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Record
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={async () => {
                    // Dynamically import xlsx only when needed
                    const XLSX = (await import('xlsx'));
                    // Prepare data for export
                    const exportData = filteredRecords.map(({ _id, ...rest }) => ({
                      ...rest,
                      id: _id, // Optionally include the Mongo _id as 'id'
                    }));
                    // Convert to worksheet
                    const ws = XLSX.utils.json_to_sheet(exportData);
                    // Create workbook and add the worksheet
                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, "ClientRecords");
                    // Generate XLSX file and trigger download
                    XLSX.writeFile(wb, "client-records.xlsx");
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search by business name, customer, or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Records Table */}
        <ClientRecordsTable 
          records={filteredRecords} 
          loading={loading}
          onRefresh={fetchRecords}
          isAdmin={isAdmin}
        />
      </main>

      <AddClientDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
        onSuccess={fetchRecords}
      />
    </div>
  );
}