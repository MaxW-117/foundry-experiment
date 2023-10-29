export const criticalThreshold = 33/100; // crit failure and success is decided by suceeding or failing a check by this amount
export const failureProficiencyIncrement = 1;
export const criticalFailureProficiencyIncrement = 3;
export const proficiencyFailuresToImprove = 3;

export function criticalSuccessThresholdFor(dc) {
  return dc * (1+criticalThreshold)
}

export function criticalFailureThresholdFor(dc) {
  return dc * (1-criticalThreshold)
}

export function failuresNeededToLevel(currentLevel, proficiencySpecificity) {
  return currentLevel * proficiencyFailuresToImprove * proficiencySpecificity;
}

export function getProficiencyModifier(proficiency) {
  return proficiency.system.level * 0.02;
}