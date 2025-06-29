export type EnrollmentId = string;
export type ProgressId = string;

export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  SUSPENDED = 'SUSPENDED',
  CANCELLED = 'CANCELLED',
}

export interface Enrollment {
  id: EnrollmentId;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  enrolledAt: Date;
  completedAt: Date | null;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Progress {
  id: ProgressId;
  enrollmentId: EnrollmentId;
  lessonId: string;
  completed: boolean;
  completedAt: Date | null;
  watchTime: number;
  lastWatchedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface EnrollmentWithProgress extends Enrollment {
  progress: Progress[];
  completionPercentage: number;
  totalWatchTime: number;
}