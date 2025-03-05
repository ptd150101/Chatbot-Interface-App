import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { File, FileText, MoreVertical, Search } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "docx" | "md" | "txt";
  size: string;
  lastModified: string;
}

interface DocumentListProps {
  documents?: Document[];
  onSelectDocument?: (document: Document) => void;
  selectedDocumentId?: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const DocumentList = ({
  documents = [
    {
      id: "1",
      name: "Project Proposal",
      type: "pdf",
      size: "2.4 MB",
      lastModified: "2023-10-15",
    },
    {
      id: "2",
      name: "Meeting Notes",
      type: "docx",
      size: "345 KB",
      lastModified: "2023-10-20",
    },
    {
      id: "3",
      name: "Research Summary",
      type: "md",
      size: "128 KB",
      lastModified: "2023-10-22",
    },
    {
      id: "4",
      name: "Task List",
      type: "txt",
      size: "56 KB",
      lastModified: "2023-10-25",
    },
    {
      id: "5",
      name: "Financial Report",
      type: "pdf",
      size: "3.2 MB",
      lastModified: "2023-10-18",
    },
  ],
  onSelectDocument = () => {},
  selectedDocumentId = "",
  searchQuery = "",
  onSearchChange = () => {},
}: DocumentListProps) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
      case "docx":
      case "md":
      case "txt":
        return <FileText className="h-4 w-4 text-muted-foreground" />;
      default:
        return <File className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-background border-l">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search documents..."
            value={localSearchQuery}
            onChange={handleSearchChange}
            className="pl-8"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 pt-0">
          {documents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <FileText className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                No documents found
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {documents.map((doc) => (
                <li key={doc.id}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left h-auto py-2 px-3",
                      selectedDocumentId === doc.id &&
                        "bg-accent text-accent-foreground",
                    )}
                    onClick={() => onSelectDocument(doc)}
                  >
                    <div className="flex items-center w-full">
                      <div className="mr-3">{getFileIcon(doc.type)}</div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">
                          {doc.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {doc.type.toUpperCase()} • {doc.size} •{" "}
                          {doc.lastModified}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-2"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DocumentList;
