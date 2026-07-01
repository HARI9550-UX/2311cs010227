import { List, type RowComponentProps } from 'react-window'
import { Box, ListItem, ListItemButton, Typography } from '@mui/material'
import NotificationCard from './NotificationCard'
import type { NotificationItem } from '../types/notification'

interface NotificationListProps {
  notifications: NotificationItem[]
  loadMoreTrigger: () => void
  isLoading: boolean
}

const ITEM_HEIGHT = 128

type NotificationRowData = {
  data: NotificationItem[]
}

function Row({ index, style, data }: RowComponentProps<NotificationRowData>) {
  const notification = data[index]

  return (
    <ListItem style={style} key={notification.id} disablePadding>
      <ListItemButton component="div" sx={{ padding: 0 }}>
        <NotificationCard notification={notification} />
      </ListItemButton>
    </ListItem>
  )
}

export default function NotificationList({ notifications, loadMoreTrigger, isLoading }: NotificationListProps) {
  return (
    <Box sx={{ width: '100%', height: { xs: 520, sm: 640 }, mt: 2 }}>
      <List<NotificationRowData>
        defaultHeight={Math.min(notifications.length * ITEM_HEIGHT, 640)}
        rowCount={notifications.length}
        rowHeight={ITEM_HEIGHT}
        rowComponent={Row}
        rowProps={{ data: notifications }}
        style={{ width: '100%' }}
        onRowsRendered={({ stopIndex }) => {
          if (stopIndex >= notifications.length - 5 && !isLoading) {
            loadMoreTrigger()
          }
        }}
      />
      {notifications.length === 0 && !isLoading && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No notifications found.
        </Typography>
      )}
    </Box>
  )
}
