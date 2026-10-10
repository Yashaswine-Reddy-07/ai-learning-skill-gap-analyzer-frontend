/**
 * Benchmark requirement for a skill associated with a role.
 */
export interface RoleRequirement {
  skillId: number;
  skillName: string;
  category: string;
  requiredLevel: number; // 1 to 5
}

/**
 * Career role profile with required skills.
 */
export interface CareerRole {
  roleId: number;
  roleName: string;
  requiredSkills: RoleRequirement[];
}
