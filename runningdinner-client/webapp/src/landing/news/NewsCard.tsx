import AnnouncementIcon from '@mui/icons-material/Announcement';
import { Avatar, Box, CardHeader, Chip, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { LocalDate } from '@runningdinner/shared';

import { CardFlexibleHeight } from '../LandingStyles';

interface NewsCardProps {
  title: string;
  content: string;
  date: Date;
}

export function NewsCard({ title, content, date }: NewsCardProps) {
  // Determine if this is a recent news item (within last 90 days)
  const isRecent = new Date().getTime() - date.getTime() < 90 * 24 * 60 * 60 * 1000;

  return (
    <CardFlexibleHeight
      sx={{
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600, flexGrow: 1 }}>
              {title}
            </Typography>
            {isRecent && (
              <Chip label="New" color="primary" size="small" sx={{ fontWeight: 600, fontSize: '0.75rem' }} />
            )}
          </Box>
        }
        sx={{ pb: 1 }}
        avatar={
          <Avatar sx={{ color: '#fff', backgroundColor: 'primary.main', width: 48, height: 48 }}>
            <AnnouncementIcon />
          </Avatar>
        }
        subheader={
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            <LocalDate date={date} />
          </Typography>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.primary' }}>
          {content}
        </Typography>
      </CardContent>
    </CardFlexibleHeight>
  );
}
