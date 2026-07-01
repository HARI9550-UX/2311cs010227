import type { NotificationsResponse, NotificationType } from '../types/notification'

const API_BASE = 'http://20.244.56.144/evaluation-service'
const PAGE_SIZE = 20

export interface FetchNotificationsParams {
  type?: NotificationType
  offset?: number
}

export interface FetchNotificationsResult {
  notifications: NotificationsResponse['notifications']
  total: number
}

export async function fetchNotifications({ type, offset = 0 }: FetchNotificationsParams): Promise<FetchNotificationsResult> {
  const params = new URLSearchParams()
  if (type) params.append('type', type)
  params.append('offset', offset.toString())
  params.append('limit', PAGE_SIZE.toString())

  const response = await fetch(`${API_BASE}/notifications?${params.toString()}`)
  if (!response.ok) {
    throw new Error(`Failed to load notifications: ${response.status}`)
  }

  const data = (await response.json()) as NotificationsResponse
  if (data.notifications.length > PAGE_SIZE) {
    return {
      notifications: data.notifications.slice(offset, offset + PAGE_SIZE),
      total: data.notifications.length,
    }
  }

  return {
    notifications: data.notifications,
    total: data.notifications.length,
  }
}

export const NOTIFICATION_TYPES: NotificationType[] = ['Message', 'Alert', 'Invoice', 'Payment', 'Purchase']
export const PAGE_COUNT = PAGE_SIZE
