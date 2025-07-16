import { DocumentCategoryConfig } from '@/types/document';

export const documentCategories: DocumentCategoryConfig[] = [
  {
    id: 'LAND_PROPERTY',
    name: 'Land Records & Property Documents',
    color: 'land-property',
    description: 'Sale deeds, title deeds, property tax receipts, survey maps',
    prefix: 'LAND',
    subcategories: [
      'Sale Deeds',
      'Title Deeds',
      'Encumbrance Certificates',
      'Property Tax Receipts',
      'Mutation Records',
      'Survey Maps',
      'Building Plans & Approvals'
    ]
  },
  {
    id: 'ACCOUNTING_TAX',
    name: 'Accounting Files',
    color: 'accounting-tax',
    description: 'Income reports, statutory returns, invoices, bank statements',
    prefix: 'ACC',
    subcategories: [
      'Income & Expense Reports',
      'Statutory Returns',
      'Invoices',
      'Bank Statements',
      'Loan Documents',
      'TDS & IT Filings'
    ]
  },
  {
    id: 'LEGAL_LITIGATION',
    name: 'Litigation Documents',
    color: 'legal-litigation',
    description: 'Case files, legal notices, court orders, legal correspondence',
    prefix: 'LEG',
    subcategories: [
      'Case Files',
      'Legal Notices',
      'Agreements',
      'Court Orders',
      'Legal Correspondence'
    ]
  },
  {
    id: 'VENDOR_CONTRACTS',
    name: 'Contracts & Vendor Agreements',
    color: 'vendor-contracts',
    description: 'Construction contracts, supplier agreements, lease agreements',
    prefix: 'VEN',
    subcategories: [
      'Construction Contracts',
      'Supplier Agreements',
      'Lease & Rental Agreements',
      'Service Provider Contracts'
    ]
  },
  {
    id: 'TECHNICAL_CONSTRUCTION',
    name: 'Technical Documents (Construction)',
    color: 'technical-construction',
    description: 'Structural drawings, project specifications, inspection reports',
    prefix: 'TECH',
    subcategories: [
      'Structural Drawings & Blueprints',
      'Project Specifications & Material Reports',
      'Site Inspection Reports',
      'Quality Control Records',
      'Environmental & Safety Compliance'
    ]
  },
  {
    id: 'COMPLIANCE',
    name: 'Compliance Documents',
    color: 'compliance',
    description: 'Municipal sanctions, environmental clearances, RERA registrations',
    prefix: 'COMP',
    subcategories: [
      'Municipal Sanctions & Approvals',
      'Urban Land Ceiling (ULC) NOCs',
      'Environmental Clearances',
      'Fire & Safety Compliance',
      'RERA Registrations'
    ]
  }
];

export const getCategoryConfig = (categoryId: string) => {
  return documentCategories.find(cat => cat.id === categoryId);
};

export const generateDocumentFileName = (
  category: string,
  fiscalYear: string,
  documentNumber: string,
  projectName: string,
  legalEntity: string,
  documentDate: Date,
  originalFileName?: string
): string => {
  const categoryConfig = getCategoryConfig(category);
  const prefix = categoryConfig?.prefix || 'DOC';
  const dateStr = documentDate.toISOString().split('T')[0].replace(/-/g, '');
  const cleanProjectName = projectName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
  const cleanEntityName = legalEntity.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
  
  const baseName = `${prefix}_${fiscalYear}_${documentNumber}_${cleanProjectName}_${cleanEntityName}_${dateStr}`;
  
  if (originalFileName) {
    const extension = originalFileName.split('.').pop();
    return `${baseName}.${extension}`;
  }
  
  return baseName;
};