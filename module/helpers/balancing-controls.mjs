export const criticalThreshold = 25/100; // crit failure and success is decided by suceeding or failing a check by this amount
export const failureProficiencyIncrement = 1;
export const criticalFailureProficiencyIncrement = 3;
export const proficiencyFailuresToImproveSimple = 5;
const broadProficiencies = ['group', 'category'];
export const proficiencyFailuresToImproveBroad = 15;

export function criticalSuccessThresholdFor(dc) {
  return dc * (1+criticalThreshold)
}

export function criticalFailureThresholdFor(dc) {
  return dc * (1-criticalThreshold)
}

export function sufficientFailuresToLevel(proficiencyKey, progress) {
  const isBroad = broadProficiencies.some(bp => proficiencyKey.includes(bp));
  const failureThreshold = isBroad? proficiencyFailuresToImproveBroad : proficiencyFailuresToImproveSimple;
  return progress - failureThreshold;
}