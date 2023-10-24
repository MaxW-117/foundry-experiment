import { sufficientFailuresToLevel } from "./balancing-controls.mjs";

export const proficiencyTemplate = {
  name: "",
  level: 0,
  progress: 0,
}

export function proficiencyFactory(name) {
  return {
    name,
    key: name,
    level: 1,
    progress: 0,
  }
}

export function incrementProficiencies(actor, profs, amount) {
  if (!actor?.system?.proficiencies) return console.error('incrementProficiencies - No proficiencies for this actor')
  if (profs.length < 1) return;

  profs.forEach((p) => {
    if (!actor.system.proficiencies[p]) {
      actor.system.proficiencies[p] = proficiencyFactory(p);
    }

    const proficiency = actor.system.proficiencies[p];
    proficiency.progress += amount;
    evaluateProficiencyLevelUp(proficiency);
  })
}

function evaluateProficiencyLevelUp(proficiency) {
  const failuresRemaining = sufficientFailuresToLevel(proficiency.key, proficiency.progress);
  if (failuresRemaining >= 0) {
    proficiency.level ++;
    proficiency.progress = failuresRemaining;
    //TODO push list of upgraded profficiencies somewhere to help track progress to a level up
    console.log(proficiency.name + ' has LEVELED UP');
  }
}