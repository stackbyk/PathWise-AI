// src/utils/recommendation.js
import { getAllPrerequisites } from "./prerequisites";
const careerRequirements = {
  "Data Scientist": [
    { name: "Python", level: 80 },
    { name: "SQL", level: 70 },
    { name: "Statistics", level: 75 },
    { name: "Data Analysis", level: 75 },
    { name: "Data Visualization", level: 70 },
    { name: "Machine Learning", level: 80 },
    { name: "Pandas / NumPy", level: 75 },
    { name: "Problem Solving", level: 75 },
  ],

  "AI / ML Engineer": [
    { name: "Python", level: 85 },
    { name: "Mathematics", level: 75 },
    { name: "Statistics", level: 75 },
    { name: "Machine Learning", level: 85 },
    { name: "Deep Learning", level: 75 },
    { name: "Data Structures", level: 70 },
    { name: "Problem Solving", level: 80 },
    { name: "Git & GitHub", level: 60 },
  ],

  "Full Stack Developer": [
    { name: "HTML", level: 80 },
    { name: "CSS", level: 75 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 75 },
    { name: "Node.js", level: 75 },
    { name: "Databases", level: 70 },
    { name: "REST APIs", level: 70 },
    { name: "Git & GitHub", level: 65 },
    { name: "Problem Solving", level: 75 },
  ],

  "Backend Developer": [
    { name: "Programming", level: 80 },
    { name: "Node.js", level: 80 },
    { name: "REST APIs", level: 75 },
    { name: "Databases", level: 75 },
    { name: "Authentication", level: 70 },
    { name: "Server Architecture", level: 70 },
    { name: "Git & GitHub", level: 65 },
    { name: "Problem Solving", level: 75 },
  ],

  "Cybersecurity Engineer": [
    { name: "Networking", level: 80 },
    { name: "Linux", level: 75 },
    { name: "Cybersecurity", level: 85 },
    { name: "Cloud Security", level: 70 },
    { name: "Authentication", level: 70 },
    { name: "Problem Solving", level: 80 },
    { name: "Git & GitHub", level: 60 },
  ],

  "Cloud Engineer": [
    { name: "Linux", level: 80 },
    { name: "Networking", level: 80 },
    { name: "AWS / Azure / GCP", level: 80 },
    { name: "Docker", level: 75 },
    { name: "Kubernetes", level: 70 },
    { name: "Cloud Security", level: 70 },
    { name: "CI/CD", level: 70 },
    { name: "Infrastructure", level: 75 },
  ],
};

export function getCareerRequirements(careerName) {
  if (!careerName) {
    return [];
  }

  const exactMatch = careerRequirements[careerName];

  if (exactMatch) {
    return exactMatch;
  }

  const normalizedCareer = careerName.toLowerCase().replace(/[^a-z0-9]/g, "");

  const matchingCareer = Object.keys(careerRequirements).find(
    (career) =>
      career.toLowerCase().replace(/[^a-z0-9]/g, "") === normalizedCareer,
  );

  return matchingCareer ? careerRequirements[matchingCareer] : [];
}

export function calculateSkillGap(userSkills, careerSkills) {
  return careerSkills.map((careerSkill) => {
    const userSkill = userSkills.find(
      (skill) => skill.name?.toLowerCase() === careerSkill.name.toLowerCase(),
    );

    const currentLevel = Number(userSkill?.progress || 0);

    const gap = Math.max(Number(careerSkill.level) - currentLevel, 0);

    return {
      name: careerSkill.name,
      required: careerSkill.level,
      current: currentLevel,
      gap,
    };
  });
}

export function recommendSkills(userSkills, careerSkills) {
  const gaps = calculateSkillGap(userSkills, careerSkills);

  const recommendations = gaps
    .filter((skill) => skill.gap > 0)
    .map((skill) => ({
      ...skill,
      prerequisites: getAllPrerequisites(skill.name),
    }));

  const userSkillNames = userSkills.map((skill) => skill.name.toLowerCase());

  return recommendations.sort((a, b) => {
    const aHasMissingPrerequisite = a.prerequisites.some(
      (prerequisite) => !userSkillNames.includes(prerequisite.toLowerCase()),
    );

    const bHasMissingPrerequisite = b.prerequisites.some(
      (prerequisite) => !userSkillNames.includes(prerequisite.toLowerCase()),
    );

    if (aHasMissingPrerequisite && !bHasMissingPrerequisite) {
      return -1;
    }

    if (!aHasMissingPrerequisite && bHasMissingPrerequisite) {
      return 1;
    }

    return b.gap - a.gap;
  });
}
