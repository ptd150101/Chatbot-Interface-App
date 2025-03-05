import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search, Upload, LayoutGrid, List } from "lucide-react";

interface DocumentHeaderProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onUpload: () => void;
}

const DocumentHeader = ({
  viewMode = "list",
  onViewModeChange = () => {},
  searchQuery = "",
  onSearchChange = () => {},
  onUpload = () => {},
}: DocumentHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4 p-4 border-b bg-background">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search documents..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 w-full"
        />
      </div>
      <div className="flex items-center space-x-2 ml-4">
        <Button onClick={onUpload}>
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>
    </div>
  );
};

export default DocumentHeader;
