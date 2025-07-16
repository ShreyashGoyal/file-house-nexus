import { Document } from '@/types/document';
import { getCategoryConfig } from '@/lib/documentCategories';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  Eye, 
  Edit, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Tag,
  Calendar,
  Building
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocumentCardProps {
  document: Document;
  onView?: (document: Document) => void;
  onEdit?: (document: Document) => void;
  onDownload?: (document: Document) => void;
}

export const DocumentCard = ({ document, onView, onEdit, onDownload }: DocumentCardProps) => {
  const categoryConfig = getCategoryConfig(document.category);
  
  const getStatusIcon = () => {
    switch (document.status) {
      case 'APPROVED':
        return <CheckCircle className="h-4 w-4" />;
      case 'PENDING_REVIEW':
        return <Clock className="h-4 w-4" />;
      case 'DRAFT':
        return <Edit className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = () => {
    switch (document.status) {
      case 'APPROVED':
        return 'status-approved';
      case 'PENDING_REVIEW':
        return 'status-pending';
      case 'DRAFT':
        return 'status-draft';
      default:
        return 'destructive';
    }
  };

  return (
    <Card className={cn(
      "group hover:shadow-lg transition-all duration-300 border-l-4",
      `border-l-${categoryConfig?.color}`
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <h3 className="font-semibold text-sm line-clamp-2">{document.originalName}</h3>
              <p className="text-xs text-muted-foreground">{document.fileName}</p>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className={cn(
              `bg-${categoryConfig?.color} text-${categoryConfig?.color}-foreground`
            )}
          >
            {categoryConfig?.name}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Building className="h-3 w-3" />
            <span>{document.projectName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{document.documentDate.toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs",
                `border-${getStatusColor()} text-${getStatusColor()}`
              )}
            >
              {document.status.replace('_', ' ')}
            </Badge>
          </div>
          
          {document.isWIP && (
            <Badge variant="outline" className="text-xs border-status-draft text-status-draft">
              WIP
            </Badge>
          )}
        </div>

        {document.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            <Tag className="h-3 w-3 text-muted-foreground" />
            {document.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {document.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">+{document.tags.length - 3}</span>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onView?.(document)}
            className="flex-1"
          >
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onEdit?.(document)}
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onDownload?.(document)}
          >
            <Download className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};