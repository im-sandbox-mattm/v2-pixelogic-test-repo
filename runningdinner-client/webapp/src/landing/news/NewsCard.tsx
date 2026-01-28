import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { LocalDate } from '@runningdinner/shared';

interface NewsCardProps {
  title: string;
  content: string;
  date: Date;
}

export function NewsCard({ title, content, date }: NewsCardProps) {
  return (
    <Card 
      elevation={2}
      sx={{ 
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main',
              width: 48,
              height: 48,
              mr: 2,
            }}
          >
            <NewspaperIcon />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h5" 
              component="h2"
              sx={{ 
                fontWeight: 600,
                mb: 0.5,
                color: 'text.primary',
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              <LocalDate date={date} />
            </Typography>
          </Box>
        </Box>
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary',
            lineHeight: 1.7,
            mt: 2,
          }}
        >
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}
