export interface Document {
  id: string;
  fileName: string;
  originalName: string;
  category: DocumentCategory;
  subcategory?: string;
  projectName: string;
  legalEntity: string;
  documentDate: Date;
  uploadDate: Date;
  fiscalYear: string;
  documentNumber: string;
  status: DocumentStatus;
  fileSize: number;
  fileType: string;
  isAuthenticated: boolean;
  isApproved: boolean;
  uploadedBy: string;
  approvedBy?: string;
  tags: string[];
  crossReferences: string[];
  notes?: string;
  isWIP: boolean;
  version: number;
  qrCode?: string;
  barcode?: string;
}

export type DocumentCategory = 
  | 'LAND_PROPERTY'
  | 'ACCOUNTING_TAX'
  | 'LEGAL_LITIGATION'
  | 'VENDOR_CONTRACTS'
  | 'TECHNICAL_CONSTRUCTION'
  | 'COMPLIANCE';

export type DocumentStatus = 
  | 'DRAFT'
  | 'PENDING_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'ARCHIVED';

export interface DocumentCategoryConfig {
  id: DocumentCategory;
  name: string;
  color: string;
  description: string;
  subcategories: string[];
  prefix: string;
}

export interface UploadFormData {
  files: FileList;
  category: DocumentCategory;
  subcategory: string;
  projectName: string;
  legalEntity: string;
  documentDate: Date;
  tags: string[];
  notes?: string;
  isWIP: boolean;
}

export interface SearchFilters {
  category?: DocumentCategory;
  status?: DocumentStatus;
  dateRange?: {
    start: Date;
    end: Date;
  };
  projectName?: string;
  legalEntity?: string;
  tags?: string[];
  fileName?: string;
}