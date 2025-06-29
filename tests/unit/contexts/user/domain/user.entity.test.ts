import { User, UserRole, UserWithRole } from '@/contexts/user/domain/entities/user.entity';

describe('User Entity', () => {
  describe('User', () => {
    it('should create a valid user object', () => {
      const user: User = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        emailVerified: new Date(),
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(user.id).toBe('123');
      expect(user.email).toBe('test@example.com');
      expect(user.name).toBe('Test User');
    });
  });

  describe('UserRole', () => {
    it('should have all expected roles', () => {
      expect(UserRole.STUDENT).toBe('STUDENT');
      expect(UserRole.INSTRUCTOR).toBe('INSTRUCTOR');
      expect(UserRole.ADMIN).toBe('ADMIN');
    });
  });

  describe('UserWithRole', () => {
    it('should create a user with role and permissions', () => {
      const userWithRole: UserWithRole = {
        id: '123',
        email: 'instructor@example.com',
        name: 'Instructor User',
        emailVerified: new Date(),
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: UserRole.INSTRUCTOR,
        permissions: [
          {
            id: '1',
            name: 'create_course',
            resource: 'course',
            action: 'create',
          },
        ],
      };

      expect(userWithRole.role).toBe(UserRole.INSTRUCTOR);
      expect(userWithRole.permissions).toHaveLength(1);
      expect(userWithRole.permissions[0]?.name).toBe('create_course');
    });
  });
});