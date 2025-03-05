import React from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ThreadActionsProps {
  onCreateThread?: () => void;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
}

const ThreadActions = ({
  onCreateThread = () => console.log("Create thread clicked"),
  onSearch = (query) => console.log("Search query:", query),
  searchPlaceholder = "Search conversations...",
}: ThreadActionsProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="flex flex-col gap-3 p-3 border-t border-border bg-background">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={handleSearch}
          className="pl-8 w-full"
        />
      </div>
      <Button
        onClick={onCreateThread}
        className="w-full flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        New Conversation
      </Button>
    </div>
  );
};

export default ThreadActions;
