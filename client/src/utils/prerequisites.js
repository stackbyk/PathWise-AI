// src/utils/prerequisites.js

import { prerequisites } from "../data/prerequisites";

export function getPrerequisites(skillName) {
  return prerequisites[skillName] || [];
}

export function getAllPrerequisites(skillName, result = []) {
  const directPrerequisites = getPrerequisites(skillName);

  directPrerequisites.forEach((skill) => {
    if (!result.includes(skill)) {
      result.push(skill);

      getAllPrerequisites(skill, result);
    }
  });

  return result;
}
