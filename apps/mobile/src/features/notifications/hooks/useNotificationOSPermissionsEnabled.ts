import { useFocusEffect } from '@react-navigation/core'
import { useState } from 'react'
import { checkNotifications } from 'react-native-permissions'
import { useAppStateTrigger } from 'src/utils/useAppStateTrigger'

export enum NotificationPermission {
  Enabled = 'enabled',
  Disabled = 'disabled',
  Loading = 'loading',
}

export function useNotificationOSPermissionsEnabled(): {
  notificationPermissionsEnabled: NotificationPermission
  checkNotificationPermissions: () => Promise<void>
} {
  const [notificationPermissionsEnabled, setNotificationPermissionsEnabled] = useState<NotificationPermission>(
    NotificationPermission.Loading,
  )

  const checkNotificationPermissions = async (): Promise<void> => {
    const { status } = await checkNotifications()
    const permission = status === 'granted' ? NotificationPermission.Enabled : NotificationPermission.Disabled
    setNotificationPermissionsEnabled(permission)
  }

  useFocusEffect(() => {
    checkNotificationPermissions().catch(() => undefined)
  })

  useAppStateTrigger({ from: 'background', to: 'active', callback: checkNotificationPermissions })

  return { notificationPermissionsEnabled, checkNotificationPermissions }
}
