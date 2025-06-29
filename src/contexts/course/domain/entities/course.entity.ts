export type CourseId = string;
export type ModuleId = string;
export type LessonId = string;

export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum ContentType {
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
  QUIZ = 'QUIZ',
  ASSIGNMENT = 'ASSIGNMENT',
}

export interface Course {
  id: CourseId;
  title: string;
  description: string;
  instructorId: string;
  status: CourseStatus;
  thumbnailUrl: string | null;
  price: number;
  currency: string;
  settings: CourseSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseSettings {
  isPublic: boolean;
  requiresApproval: boolean;
  maxStudents: number | null;
  allowDiscussions: boolean;
}

export interface Module {
  id: ModuleId;
  courseId: CourseId;
  title: string;
  description: string | null;
  order: number;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: LessonId;
  moduleId: ModuleId;
  title: string;
  description: string | null;
  contentType: ContentType;
  contentUrl: string | null;
  duration: number;
  order: number;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}