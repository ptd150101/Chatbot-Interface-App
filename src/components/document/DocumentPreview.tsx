import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

interface DocumentPreviewProps {
  document?: {
    id: string;
    name: string;
    type: "pdf" | "docx" | "md" | "txt";
    url: string;
    content?: string;
  };
  onClose?: () => void;
}

const DocumentPreview = ({
  document = {
    id: "1",
    name: "Sample Document.pdf",
    type: "pdf",
    url: "https://images.unsplash.com/photo-1706126187482-6ba20ca1d8b7?w=800&q=80",
    content: "This is a sample document content for preview purposes.",
  },
  onClose = () => {},
}: DocumentPreviewProps) => {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Mock total pages

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const renderPreviewContent = () => {
    switch (document.type) {
      case "pdf":
        return (
          <div className="flex flex-col items-center">
            <div
              className="relative w-full bg-white rounded-md shadow-sm overflow-hidden"
              style={{ height: "400px" }}
            >
              <img
                src={document.url}
                alt={document.name}
                className="w-full h-full object-contain"
                style={{ transform: `scale(${zoom / 100})` }}
              />
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-background/80 px-3 py-1 rounded-full text-xs">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>
        );
      case "docx":
        return (
          <div className="p-4 bg-white rounded-md shadow-sm">
            <h3 className="text-lg font-medium mb-2">{document.name}</h3>
            <p className="text-sm text-muted-foreground">
              DOCX preview is not available. Please download the document to
              view it.
            </p>
          </div>
        );
      case "md":
        return (
          <div className="p-4 bg-white rounded-md shadow-sm">
            <div className="prose prose-sm max-w-none">{document.content}</div>
          </div>
        );
      case "txt":
        return (
          <div className="p-4 bg-white rounded-md shadow-sm font-mono text-sm whitespace-pre-wrap">
            {document.content}
          </div>
        );
      default:
        return (
          <div className="p-4 bg-muted rounded-md">
            <p className="text-center text-muted-foreground">
              No preview available
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-background border-l">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-lg font-medium truncate">
          {document?.name || "No document selected"}
        </h3>
      </div>

      <Tabs defaultValue="preview" className="flex-1 flex flex-col">
        <div className="px-4 pt-2 border-b">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="preview"
          className="flex-1 flex flex-col p-4 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-xs">{zoom}%</span>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 rounded-md border">
            {renderPreviewContent()}
          </ScrollArea>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="details" className="flex-1 p-4">
          <ScrollArea className="h-full">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">File Name</h4>
                <p className="text-sm text-muted-foreground">
                  {document?.name}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">File Type</h4>
                <p className="text-sm text-muted-foreground uppercase">
                  {document?.type}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Size</h4>
                <p className="text-sm text-muted-foreground">1.2 MB</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Created</h4>
                <p className="text-sm text-muted-foreground">June 12, 2023</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Last Modified</h4>
                <p className="text-sm text-muted-foreground">June 15, 2023</p>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentPreview;
