import { NewsItem } from "../types/news";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

type NewsCardProps = {
  item: NewsItem;
};

const categoryColors: Record<NewsItem["category"], string> = {
  Event: "var(--color-event)",
  Projekt: "var(--color-projekt)",
  Info: "var(--color-info)",
};



export function NewsCard({ item }: NewsCardProps) {
  const category = item.category;

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "var(--viu-card-bg)",
        borderColor: categoryColors[category],
        boxShadow: "var(--viu-shadow)",
        borderRadius: "var(--viu-radius)",
      }}
    >
      {item.imageUrl && (
        <CardMedia
          component="img"
          height="160"
          //image={item.imageUrl}
          image="../../../hund.jpg"
          alt={item.title}
        />
      )}

      <CardContent>
        <Chip
          label={category}
          size="small"
          sx={{
            backgroundColor: categoryColors[category],
            color: "#fff",
            mb: 1,
          }}
        />

        <Typography variant="h6" component="h3" gutterBottom>
          {item.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          {item.content}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {new Date(item.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NewsCard;
