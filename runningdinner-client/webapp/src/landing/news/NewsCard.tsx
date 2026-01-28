import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Avatar, Box, CardHeader, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { LocalDate } from '@runningdinner/shared';

import { CardFlexibleHeight } from '../LandingStyles';

interface NewsCardItem {
  title: string;
  content: React.ReactNode;
  date: Date;
}

export function NewsCard({ title, content, date }: NewsCardItem) {
  return (
    <CardFlexibleHeight 
      sx={{ 
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          transform: 'translateY(-2px)',
        }
      }}
    >
      <CardHeader
        sx={{ 
          pb: 1,
          '& .MuiCardHeader-title': {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.3,
          }
        }}
        avatar={
          <Avatar 
            sx={{ 
              color: '#fff', 
              backgroundColor: 'primary.main',
              width: 48,
              height: 48,
            }}
          >
            <NewspaperIcon />
          </Avatar>
        }
        title={title}
        subheader={
          <Box sx={{ mt: 0.5 }}>
            <LocalDate date={date} />
          </Box>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <Typography 
          variant="body1" 
          sx={{ 
            lineHeight: 1.6,
            color: 'text.secondary',
            '& br': {
              display: 'block',
              content: '""',
              marginTop: 1
            }
          }}
        >
          {content}
        </Typography>
      </CardContent>
    </CardFlexibleHeight>
  );
}
