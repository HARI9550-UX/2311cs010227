import { Card, CardContent, Stack, Typography, Chip } from '@mui/material'
import type { NotificationItem } from '../types/notification'

const iconMap: Record<string, string> = {
  Message: '💬',
  Alert: '⚠️',
  Invoice: '🧾',
  Payment: '💳',
  Purchase: '📦',
}

const colorMap: Record<string, 'primary' | 'warning' | 'success' | 'info' | 'secondary'> = {
  Message: 'primary',
  Alert: 'warning',
  Invoice: 'info',
  Payment: 'success',
  Purchase: 'secondary',
}

export default function NotificationCard({ notification }: { notification: NotificationItem }) {
  const icon = iconMap[notification.type] ?? '🔔'
  const chipColor = colorMap[notification.type] ?? 'primary'

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }} spacing={1}>
          <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
            <Typography component="span" variant="body1" sx={{ fontSize: '1.1rem' }}>
              {icon}
            </Typography>
            <Typography variant="subtitle2">{notification.type}</Typography>
            <Chip label={notification.type} color={chipColor} size="small" />
          </Stack>
          <Typography variant="caption" color="text.secondary">
            {new Date(notification.timestamp).toLocaleString()}
          </Typography>
        </Stack>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {notification.message}
        </Typography>
      </CardContent>
    </Card>
  )
}
