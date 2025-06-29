export type NotificationId = string;

export enum NotificationType {
  ENROLLMENT_SUCCESS = 'ENROLLMENT_SUCCESS',
  COURSE_UPDATE = 'COURSE_UPDATE',
  NEW_DISCUSSION = 'NEW_DISCUSSION',
  ASSIGNMENT_DUE = 'ASSIGNMENT_DUE',
  COURSE_COMPLETED = 'COURSE_COMPLETED',
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT',
}

export enum NotificationChannel {
  EMAIL = 'EMAIL',
  IN_APP = 'IN_APP',
  PUSH = 'PUSH',
}

export interface Notification {
  id: NotificationId;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  channel: NotificationChannel;
  read: boolean;
  readAt: Date | null;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationPreferences {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  notificationTypes: Partial<Record<NotificationType, boolean>>;
  createdAt: Date;
  updatedAt: Date;
}