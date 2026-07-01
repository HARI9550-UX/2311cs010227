import { useCallback, useEffect, useState } from 'react'
import type { NotificationItem, NotificationType } from '../types/notification'

interface UseNotificationsResult {
  notifications: NotificationItem[]
  loading: boolean
  error: string | null
  hasNextPage: boolean
  filter: NotificationType | ''
  setFilter: (filter: NotificationType | '') => void
  loadMore: () => void
  reload: () => void
}

const PAGE_SIZE = 5

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'Message',
    message: 'Your appointment reminder for tomorrow has been confirmed.',
    timestamp: '2026-07-01T08:30:00.000Z',
  },
  {
    id: '2',
    type: 'Alert',
    message: 'A new lab result is ready for review in your patient portal.',
    timestamp: '2026-07-01T09:15:00.000Z',
  },
  {
    id: '3',
    type: 'Invoice',
    message: 'Your monthly invoice is available and due on July 20.',
    timestamp: '2026-07-01T10:00:00.000Z',
  },
  {
    id: '4',
    type: 'Payment',
    message: 'Payment of $120.00 was received successfully.',
    timestamp: '2026-07-01T11:20:00.000Z',
  },
  {
    id: '5',
    type: 'Purchase',
    message: 'Your prescription refill request has been shipped.',
    timestamp: '2026-07-01T12:05:00.000Z',
  },
  {
    id: '6',
    type: 'Message',
    message: 'A care coordinator left you a note about your treatment plan.',
    timestamp: '2026-07-01T13:10:00.000Z',
  },
  {
    id: '7',
    type: 'Alert',
    message: 'Please update your insurance details before your next visit.',
    timestamp: '2026-07-01T14:30:00.000Z',
  },
  {
    id: '8',
    type: 'Invoice',
    message: 'An updated invoice for your recent consultation is now visible.',
    timestamp: '2026-07-01T15:45:00.000Z',
  },
  {
    id: '9',
    type: 'Payment',
    message: 'Your payment method was successfully updated.',
    timestamp: '2026-07-01T16:25:00.000Z',
  },
  {
    id: '10',
    type: 'Purchase',
    message: 'A new wellness package is now available for purchase.',
    timestamp: '2026-07-01T17:40:00.000Z',
  },
]

function getFilteredNotifications(filter: NotificationType | ''): NotificationItem[] {
  if (!filter) {
    return MOCK_NOTIFICATIONS
  }

  return MOCK_NOTIFICATIONS.filter(item => item.type === filter)
}

export function useNotifications(): UseNotificationsResult {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<NotificationType | ''>('')
  const [offset, setOffset] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(true)

  useEffect(() => {
    setLoading(true)
    const filtered = getFilteredNotifications(filter)
    const firstPage = filtered.slice(0, PAGE_SIZE)

    setNotifications(firstPage)
    setOffset(PAGE_SIZE)
    setHasNextPage(firstPage.length < filtered.length)
    setError(null)
    setLoading(false)
  }, [filter])

  const loadMore = useCallback(() => {
    if (loading || !hasNextPage) {
      return
    }

    const filtered = getFilteredNotifications(filter)
    const nextPage = filtered.slice(offset, offset + PAGE_SIZE)

    setNotifications(prev => [...prev, ...nextPage])
    setOffset(prev => prev + PAGE_SIZE)
    setHasNextPage(offset + nextPage.length < filtered.length)
  }, [filter, hasNextPage, loading, offset])

  const reload = useCallback(() => {
    const filtered = getFilteredNotifications(filter)
    const firstPage = filtered.slice(0, PAGE_SIZE)

    setNotifications(firstPage)
    setOffset(PAGE_SIZE)
    setHasNextPage(firstPage.length < filtered.length)
    setError(null)
  }, [filter])

  return {
    notifications,
    loading,
    error,
    hasNextPage,
    filter,
    setFilter,
    loadMore,
    reload,
  }
}
