import { useState } from 'react';
import { Plus, Upload, FileSearch, BarChart3, Settings, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentCard } from '@/components/DocumentCard';
import { SearchBar } from '@/components/SearchBar';
import { UploadDialog } from '@/components/UploadDialog';
import { documentCategories } from '@/lib/documentCategories';
import { Document, SearchFilters, UploadFormData } from '@/types/document';
import { cn } from '@/lib/utils';

// Mock data for demonstration
const mockDocuments: Document[] = [
  {
    id: '1',
    fileName: 'LAND_2025_001_SUNRISE_VALLEY_ABC_DEVELOPERS_20250115.pdf',
    originalName: 'Sale Deed - Sunrise Valley Plot 15.pdf',
    category: 'LAND_PROPERTY',
    subcategory: 'Sale Deeds',
    projectName: 'Sunrise Valley',
    legalEntity: 'ABC Developers',
    documentDate: new Date('2025-01-15'),
    uploadDate: new Date('2025-01-16'),
    fiscalYear: '2025',
    documentNumber: '001',
    status: 'APPROVED',
    fileSize: 2048000,
    fileType: 'pdf',
    isAuthenticated: true,
    isApproved: true,
    uploadedBy: 'John Doe',
    approvedBy: 'Manager',
    tags: ['sale deed', 'residential', 'plot 15'],
    crossReferences: [],
    isWIP: false,
    version: 1,
  },
  {
    id: '2',
    fileName: 'ACC_2025_INV_045_SUNRISE_VALLEY_ABC_DEVELOPERS_20250110.pdf',
    originalName: 'Invoice - Construction Materials Jan 2025.pdf',
    category: 'ACCOUNTING_TAX',
    subcategory: 'Invoices',
    projectName: 'Sunrise Valley',
    legalEntity: 'ABC Developers',
    documentDate: new Date('2025-01-10'),
    uploadDate: new Date('2025-01-11'),
    fiscalYear: '2025',
    documentNumber: 'INV-045',
    status: 'PENDING_REVIEW',
    fileSize: 1536000,
    fileType: 'pdf',
    isAuthenticated: true,
    isApproved: false,
    uploadedBy: 'Jane Smith',
    tags: ['invoice', 'construction', 'materials'],
    crossReferences: ['VEN-2025-001'],
    isWIP: false,
    version: 1,
  },
  {
    id: '3',
    fileName: 'TECH_2025_002_SUNRISE_VALLEY_ABC_DEVELOPERS_20250108.pdf',
    originalName: 'Structural Blueprint - Building A.pdf',
    category: 'TECHNICAL_CONSTRUCTION',
    subcategory: 'Structural Drawings & Blueprints',
    projectName: 'Sunrise Valley',
    legalEntity: 'ABC Developers',
    documentDate: new Date('2025-01-08'),
    uploadDate: new Date('2025-01-09'),
    fiscalYear: '2025',
    documentNumber: '002',
    status: 'DRAFT',
    fileSize: 5120000,
    fileType: 'pdf',
    isAuthenticated: false,
    isApproved: false,
    uploadedBy: 'Architect Team',
    tags: ['blueprint', 'structural', 'building-a'],
    crossReferences: [],
    isWIP: true,
    version: 1,
  }
];

export const Dashboard = () => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(mockDocuments);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterDocuments(query, searchFilters);
  };

  const handleFiltersChange = (filters: SearchFilters) => {
    setSearchFilters(filters);
    filterDocuments(searchQuery, filters);
  };

  const filterDocuments = (query: string, filters: SearchFilters) => {
    let filtered = [...mockDocuments];

    // Text search
    if (query) {
      filtered = filtered.filter(doc =>
        doc.originalName.toLowerCase().includes(query.toLowerCase()) ||
        doc.projectName.toLowerCase().includes(query.toLowerCase()) ||
        doc.legalEntity.toLowerCase().includes(query.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(doc => doc.category === filters.category);
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(doc => doc.status === filters.status);
    }

    // Project filter
    if (filters.projectName) {
      filtered = filtered.filter(doc =>
        doc.projectName.toLowerCase().includes(filters.projectName!.toLowerCase())
      );
    }

    // Legal entity filter
    if (filters.legalEntity) {
      filtered = filtered.filter(doc =>
        doc.legalEntity.toLowerCase().includes(filters.legalEntity!.toLowerCase())
      );
    }

    setFilteredDocuments(filtered);
  };

  const handleUpload = (data: UploadFormData) => {
    console.log('Upload data:', data);
    // Here you would implement the actual upload logic
  };

  const getCategoryStats = () => {
    return documentCategories.map(category => {
      const categoryDocs = mockDocuments.filter(doc => doc.category === category.id);
      const pendingCount = categoryDocs.filter(doc => doc.status === 'PENDING_REVIEW').length;
      const wipCount = categoryDocs.filter(doc => doc.isWIP).length;

      return {
        ...category,
        totalCount: categoryDocs.length,
        pendingCount,
        wipCount
      };
    });
  };

  const categoryStats = getCategoryStats();
  const totalDocuments = mockDocuments.length;
  const pendingApprovals = mockDocuments.filter(doc => doc.status === 'PENDING_REVIEW').length;
  const wipDocuments = mockDocuments.filter(doc => doc.isWIP).length;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Document Management System
              </h1>
              <p className="text-sm text-muted-foreground">Real Estate Filing System</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowUploadDialog(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <FileSearch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDocuments}</div>
              <p className="text-xs text-muted-foreground">
                Across all categories
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-status-pending">{pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">
                Require review
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Work in Progress</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-status-draft">{wipDocuments}</div>
              <p className="text-xs text-muted-foreground">
                Draft documents
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
            <TabsTrigger value="documents">All Documents</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-6">
            <SearchBar
              onSearch={handleSearch}
              onFiltersChange={handleFiltersChange}
              filters={searchFilters}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  onView={(doc) => console.log('View:', doc)}
                  onEdit={(doc) => console.log('Edit:', doc)}
                  onDownload={(doc) => console.log('Download:', doc)}
                />
              ))}
            </div>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileSearch className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No documents found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or upload new documents.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryStats.map((category) => (
                <Card key={category.id} className={cn(
                  "shadow-card hover:shadow-lg transition-all duration-300 border-l-4",
                  `border-l-${category.color}`
                )}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{category.name}</span>
                      <Badge 
                        variant="secondary"
                        className={cn(
                          `bg-${category.color} text-${category.color}-foreground`
                        )}
                      >
                        {category.totalCount}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pending Review:</span>
                      <Badge variant="outline" className="border-status-pending text-status-pending">
                        {category.pendingCount}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Work in Progress:</span>
                      <Badge variant="outline" className="border-status-draft text-status-draft">
                        {category.wipCount}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleFiltersChange({ category: category.id })}
                    >
                      View Documents
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDocuments
                .filter(doc => doc.status === 'PENDING_REVIEW')
                .map((document) => (
                  <DocumentCard
                    key={document.id}
                    document={document}
                    onView={(doc) => console.log('View:', doc)}
                    onEdit={(doc) => console.log('Edit:', doc)}
                    onDownload={(doc) => console.log('Download:', doc)}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <UploadDialog
        isOpen={showUploadDialog}
        onClose={() => setShowUploadDialog(false)}
        onUpload={handleUpload}
      />
    </div>
  );
};