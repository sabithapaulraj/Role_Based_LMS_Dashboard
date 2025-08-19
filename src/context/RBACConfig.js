// RBAC permissions config
const permissions = {
  admin: ["dashboard", "studentsPerformance", "quizCompletion"],
  student: ["dashboard", "courseProgress", "quizMarks"]
};

export const hasPermission = (role, page) => {
  return permissions[role]?.includes(page);
};

export default permissions;
