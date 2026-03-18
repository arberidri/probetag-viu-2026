import { useEffect, useState } from "react";
import type { NewsItem } from "../types/news";
import { NewsCard } from "./NewsCard";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

export function NewsList({ news }: { news: NewsItem[] }) {
  const [selected, setSelected] = useState<NewsItem | null>(null);

  useEffect(() => {
    setSelected(news[0] ?? null);
  }, [news]);

  if (news.length === 0) {
    return (
      <Typography sx={{ p: 2 }}>
        Keine News vorhanden.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
      <TableContainer component={Paper} sx={{ maxHeight: 520 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Titel</TableCell>
              <TableCell>Kategorie</TableCell>
              <TableCell>Datum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {news.map((item) => (
              <TableRow
                key={item.id}
                hover
                selected={selected?.id === item.id}
                onClick={() => setSelected(item)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box>
        {selected ? (
          <NewsCard item={selected} />
        ) : (
          <Typography sx={{ p: 2 }}>Wähle News.</Typography>
        )}
      </Box>
    </Box>
  );
}
