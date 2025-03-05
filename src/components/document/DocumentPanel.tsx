import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { ChevronLeft, Upload, LayoutGrid, List, Search } from "lucide-react";
import { Input } from "../ui/input";

import DocumentList from "./DocumentList";
import DocumentPreview from "./DocumentPreview";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "docx" | "md" | "txt" | "image";
  dateModified: string;
  size?: string;
  url?: string;
  content?: string;
  thumbnail?: string;
}

interface DocumentPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  documents?: Document[];
}

// Create a local DocumentHeader component since the imported one was empty
interface DocumentHeaderProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onUpload: () => void;
}

const DocumentHeader = ({
  viewMode = "grid",
  onViewModeChange = () => {},
  searchQuery = "",
  onSearchChange = () => {},
  onUpload = () => {},
}: DocumentHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          // placeholder="Search documents..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 w-full"
        />
      </div>
      <div className="flex items-center space-x-2 ml-4">
        <Button
          variant={viewMode === "grid" ? "secondary" : "ghost"}
          size="icon"
          onClick={() => onViewModeChange("grid")}
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "list" ? "secondary" : "ghost"}
          size="icon"
          onClick={() => onViewModeChange("list")}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button onClick={onUpload}>
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>
    </div>
  );
};

const DocumentPanel = ({
  isOpen = true,
  onClose = () => {},
  documents = [
    {
      id: "1",
      name: "Project Proposal.pdf",
      type: "pdf",
      dateModified: "2023-06-15",
      size: "2.4 MB",
      url: "https://images.unsplash.com/photo-1706126187482-6ba20ca1d8b7?w=800&q=80",
    },
    {
      id: "2",
      name: "Meeting Notes.docx",
      type: "docx",
      dateModified: "2023-06-10",
      size: "345 KB",
    },
    {
      id: "3",
      name: "README.md",
      type: "md",
      dateModified: "2023-06-05",
      size: "128 KB",
      content:
        "# Project Documentation\n\nThis is a sample markdown file with documentation for the project.\n\n## Features\n\n- Multi-modal chat interface\n- Document management\n- Thread organization",
    },
    {
      id: "4",
      name: "Notes.txt",
      type: "txt",
      dateModified: "2023-06-01",
      size: "56 KB",
      content:
        "Important meeting notes:\n\n1. Discuss project timeline\n2. Review design mockups\n3. Assign tasks to team members\n4. Schedule next check-in",
    },
    {
      id: "5",
      name: "Diagram.png",
      type: "image",
      dateModified: "2023-05-28",
      size: "1.2 MB",
      thumbnail:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=80",
    },
    {
      id: "6",
      name: "Architecture.pdf",
      type: "pdf",
      dateModified: "2023-05-20",
      size: "3.2 MB",
      url: "https://images.unsplash.com/photo-1706126187482-6ba20ca1d8b7?w=800&q=80",
    },
  ],
}: DocumentPanelProps) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Filter documents based on search query
  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectDocument = (doc: Document) => {
    setSelectedDocument(doc);
  };

  const handleClosePreview = () => {
    setSelectedDocument(null);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleUpload = () => {
    // In a real implementation, this would open a file picker
    console.log("Upload document clicked");
  };

  if (!isOpen) return null;

  return (
    <div className="w-full h-full flex flex-col bg-background border-l">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-medium ml-2">Documents</h2>
        </div>
        <div className="flex items-center">
          <Button onClick={handleUpload} className="ml-2">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {selectedDocument ? (
          <div className="w-full h-full">
            <DocumentPreview
              document={{
                ...selectedDocument,
                url: selectedDocument.url || "",
              }}
              onClose={handleClosePreview}
            />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-hidden">
              <DocumentList
                documents={filteredDocuments.map((doc) => ({
                  id: doc.id,
                  name: doc.name,
                  type: doc.type,
                  size: doc.size || "",
                  lastModified: doc.dateModified,
                }))}
                onSelectDocument={(doc) => {
                  const fullDoc = documents.find((d) => d.id === doc.id);
                  if (fullDoc) handleSelectDocument(fullDoc);
                }}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentPanel;
