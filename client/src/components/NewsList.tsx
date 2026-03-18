import { useMemo, useState } from "react";
import type { NewsItem } from "../types/news";
import { NewsCard } from "./NewsCard";
import IconButton from '@mui/material/IconButton';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const filtercategories = ["Alle", "Event", "Projekt", "Info"] as const;

type CategoryFilter = (typeof filtercategories)[number];

export function NewsList({ news }: { news: NewsItem[] }) {
  const [filter, setFilter] = useState<CategoryFilter>("Alle");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNews = useMemo(() => {
    let result = news;

    
    if (filter !== "Alle") {
      result = result.filter((item) => item.category === filter);
    }

   
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerSearch) ||
          item.content.toLowerCase().includes(lowerSearch)
      );
    }

    return result;
  }, [filter, searchTerm, news]);

  if (news.length === 0) {
    return (
      <Typography sx={{ p: 2 }}>
        Keine News vorhanden.
      </Typography>
    );
  }

  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Suche"
        size="small"
        value={searchTerm}
        onChange={(search) => setSearchTerm(search.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setSearchTerm("")}
                  edge="end"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {filtercategories.map((category) => (
          <Button
            key={category}
            size="small"
            variant={filter === category ? "contained" : "outlined"}
            onClick={() => setFilter(category)}
          >
            {category}
          </Button>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
        }}
      >
        {filteredNews.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </Box>
    </Box>
  );
}
