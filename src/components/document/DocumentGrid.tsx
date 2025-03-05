import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { FileIcon, FileTextIcon, FileTypeIcon, ImageIcon } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "docx" | "md" | "txt" | "image";
  dateModified: string;
  thumbnail?: string;
}

interface DocumentGridProps {
  documents?: Document[];
  onSelectDocument?: (document: Document) => void;
  selectedDocumentId?: string;
}

const DocumentGrid = ({
  documents = [
    {
      id: "1",
      name: "Project Proposal.pdf",
      type: "pdf",
      dateModified: "2023-06-15",
    },
    {
      id: "2",
      name: "Meeting Notes.docx",
      type: "docx",
      dateModified: "2023-06-10",
    },
    {
      id: "3",
      name: "README.md",
      type: "md",
      dateModified: "2023-06-05",
    },
    {
      id: "4",
      name: "Notes.txt",
      type: "txt",
      dateModified: "2023-06-01",
    },
    {
      id: "5",
      name: "Diagram.png",
      type: "image",
      dateModified: "2023-05-28",
      thumbnail:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=80",
    },
    {
      id: "6",
      name: "Architecture.pdf",
      type: "pdf",
      dateModified: "2023-05-20",
    },
  ],
  onSelectDocument = () => {},
  selectedDocumentId = "",
}: DocumentGridProps) => {
  // Function to render the appropriate icon based on document type
  const renderDocumentIcon = (type: Document["type"]) => {
    switch (type) {
      case "pdf":
        return <FileIcon className="h-8 w-8 text-red-500" />;
      case "docx":
        return <FileTextIcon className="h-8 w-8 text-blue-500" />;
      case "md":
        return <FileTextIcon className="h-8 w-8 text-green-500" />;
      case "txt":
        return <FileTypeIcon className="h-8 w-8 text-gray-500" />;
      case "image":
        return <ImageIcon className="h-8 w-8 text-purple-500" />;
      default:
        return <FileIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="bg-background w-full h-full p-4 overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            className={`cursor-pointer transition-all hover:shadow-md ${selectedDocumentId === doc.id ? "ring-2 ring-primary" : ""}`}
            onClick={() => onSelectDocument(doc)}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center">
              {doc.thumbnail ? (
                <div className="w-full h-24 mb-2 overflow-hidden rounded-md">
                  <img
                    src={doc.thumbnail}
                    alt={doc.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-24 mb-2 flex items-center justify-center bg-muted rounded-md">
                  {renderDocumentIcon(doc.type)}
                </div>
              )}
              <div className="w-full mt-2 text-center">
                <p className="text-sm font-medium truncate" title={doc.name}>
                  {doc.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(doc.dateModified).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-2 justify-center">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectDocument(doc);
                }}
              >
                Preview
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentGrid;
