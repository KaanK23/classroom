export type MetricId = string;

export enum MetricType {
  COURSE_COMPLETION = 'COURSE_COMPLETION',
  USER_ENGAGEMENT = 'USER_ENGAGEMENT',
  VIDEO_WATCH_TIME = 'VIDEO_WATCH_TIME',
  QUIZ_SCORE = 'QUIZ_SCORE',
  ASSIGNMENT_SUBMISSION = 'ASSIGNMENT_SUBMISSION',
}

export enum TimeRange {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  ALL_TIME = 'ALL_TIME',
}

export interface Metric {
  id: MetricId;
  type: MetricType;
  entityId: string;
  entityType: 'USER' | 'COURSE' | 'LESSON';
  value: number;
  metadata: Record<string, unknown>;
  timestamp: Date;
  createdAt: Date;
}

export interface CourseAnalytics {
  courseId: string;
  totalEnrollments: number;
  activeStudents: number;
  completionRate: number;
  averageProgress: number;
  averageWatchTime: number;
  timeRange: TimeRange;
  calculatedAt: Date;
}

export interface UserEngagementMetrics {
  userId: string;
  coursesEnrolled: number;
  coursesCompleted: number;
  totalWatchTime: number;
  streakDays: number;
  lastActiveAt: Date;
  timeRange: TimeRange;
  calculatedAt: Date;
}