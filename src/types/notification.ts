export type NotificationType = 'Message' | 'Alert' | 'Invoice' | 'Payment' | 'Purchase'

export interface NotificationItem {
  id: string
  type: NotificationType
  message: string
  timestamp: string
}

export interface NotificationsResponse {
  notifications: NotificationItem[]
}
