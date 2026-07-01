import { useMemo, useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import Filter from '../components/Filter'
import SearchBar from '../components/SearchBar'
import NotificationList from '../components/NotificationList'
import { useNotifications } from '../hooks/useNotifications'
import { debounce } from '../utils/debounce'

const debouncedSearch = debounce((value: string, setter: (value: string) => void) => setter(value), 500)

export default function Home() {
  const { notifications, loading, error, hasNextPage, filter, setFilter, loadMore, reload } = useNotifications()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const filteredNotifications = useMemo(() => {
    if (!searchValue.trim()) return notifications
    const lower = searchValue.toLowerCase()
    return notifications.filter(item => item.message.toLowerCase().includes(lower) || item.type.toLowerCase().includes(lower))
  }, [notifications, searchValue])

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    debouncedSearch(value, setSearchValue)
  }

  const handleRefresh = () => {
    reload()
    setSnackbarOpen(true)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6fb' }}>
      <AppBar position="sticky" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Afford Medical Notifications
          </Typography>
          <IconButton color="inherit" onClick={handleRefresh} aria-label="refresh">
            ↻
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Box sx={{ flex: { xs: 'unset', md: 1 } }}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle1" gutterBottom>
                Controls
              </Typography>
              <Stack spacing={2}>
                <Filter selected={filter} onChange={value => setFilter(value)} />
                <SearchBar value={searchTerm} onChange={handleSearchChange} />
                <Button variant="contained" onClick={handleRefresh}>
                  Reload notifications
                </Button>
                <Typography variant="body2" color="text.secondary">
                  Showing {filteredNotifications.length} notification{filteredNotifications.length === 1 ? '' : 's'}.
                </Typography>
                {!hasNextPage && !loading && (
                  <Typography variant="body2" color="text.secondary">
                    All notifications loaded.
                  </Typography>
                )}
              </Stack>
            </Paper>
          </Box>

          <Box sx={{ flex: 2 }}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Notification feed</Typography>
                {loading && <CircularProgress size={20} />}
              </Stack>
              <NotificationList notifications={filteredNotifications} loadMoreTrigger={loadMore} isLoading={loading} />
              {error && (
                <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
              {loading && notifications.length > 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Loading more notifications...
                </Typography>
              )}
              {!hasNextPage && !loading && notifications.length > 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  End of notification history.
                </Typography>
              )}
            </Paper>
          </Box>
        </Stack>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Notifications refreshed"
      />
    </Box>
  )
}
