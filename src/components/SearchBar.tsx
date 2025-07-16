import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { SearchFilters, DocumentCategory, DocumentStatus } from '@/types/document';
import { documentCategories } from '@/lib/documentCategories';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFiltersChange: (filters: SearchFilters) => void;
  filters: SearchFilters;
}

export const SearchBar = ({ onSearch, onFiltersChange, filters }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    onFiltersChange({ ...filters, ...newFilters });
  };

  const clearFilters = () => {
    onFiltersChange({});
    setSearchQuery('');
    onSearch('');
  };

  const activeFiltersCount = Object.keys(filters).filter(key => {
    const value = filters[key as keyof SearchFilters];
    return value !== undefined && value !== null && value !== '';
  }).length;

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents by name, project, entity, or tags..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={cn(
            "relative",
            activeFiltersCount > 0 && "border-primary text-primary"
          )}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge 
              variant="secondary" 
              className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" onClick={clearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-muted/50">
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              value={filters.category || ''}
              onValueChange={(value) => updateFilters({ 
                category: value as DocumentCategory || undefined 
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All categories</SelectItem>
                {documentCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      <div 
                        className={cn(
                          "w-3 h-3 rounded-full",
                          `bg-${category.color}`
                        )}
                      />
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={filters.status || ''}
              onValueChange={(value) => updateFilters({ 
                status: value as DocumentStatus || undefined 
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All statuses</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PENDING_REVIEW">Pending Review</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Project Name Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Project</label>
            <Input
              placeholder="Project name"
              value={filters.projectName || ''}
              onChange={(e) => updateFilters({ projectName: e.target.value || undefined })}
            />
          </div>

          {/* Legal Entity Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Legal Entity</label>
            <Input
              placeholder="Legal entity"
              value={filters.legalEntity || ''}
              onChange={(e) => updateFilters({ legalEntity: e.target.value || undefined })}
            />
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {documentCategories.find(c => c.id === filters.category)?.name}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilters({ category: undefined })}
              />
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Status: {filters.status.replace('_', ' ')}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilters({ status: undefined })}
              />
            </Badge>
          )}
          {filters.projectName && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Project: {filters.projectName}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilters({ projectName: undefined })}
              />
            </Badge>
          )}
          {filters.legalEntity && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Entity: {filters.legalEntity}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilters({ legalEntity: undefined })}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};