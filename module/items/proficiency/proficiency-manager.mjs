import { failuresNeededToLevel } from "../../helpers/balancing-controls.mjs";
import { Proficiency } from "./proficiency.data.mjs";

export const ProficiencyManager = {
  incrementProficiencies,
  incrementProficiency,
  getProficiency,
  createProficiency,
}

export function createProficiency(taxonomy, parent, amount = 1) {
  const [category, subcategory, ...nameArray] = taxonomy
  const specificity = determineSpecificity(subcategory);
  const data = {
    key: taxonomy.join('-'),
    // type: 'proficiency',
    category,
    subcategory,
    name: nameArray.join(' '),
    specificity,
    level: 1,
    progress: amount-1, 
  }
  const itemProps = {
    data,
    type: 'proficiency',
    name: nameArray.join(' ')
  }
  return Proficiency.create(itemProps, { parent });
}

function incrementProficiencies(actor, profs, amount) {
  if (profs.length < 1) return;
  profs.forEach((p) => { incrementProficiency(actor, p, amount); })
}

function incrementProficiency(actor, profKey, amount) {
  if (!actor?.system?.proficiencies) return console.error('incrementProficiencies - No proficiencies for this actor')

    let proficiency = getProficiency(actor, profKey);
    if (!proficiency) {
      console.debug("Creating proficiency: " + profKey + " for actor: " + actor.name);
      proficiency = createProficiency(profKey.split('-'), actor, amount);      
    } else {
      console.debug("Found proficiency: " + profKey + " for actor: " + actor.name);
      proficiency.update({["system.progress"]: proficiency.system.progress + amount});
      evaluateProficiencyLevelUp(proficiency);
    }

    
}

function evaluateProficiencyLevelUp(proficiency) {
  const failuresRemaining = failuresNeededToLevel(proficiency.system.level, proficiency.system.specificity, proficiency.system.progress) - proficiency.system.progress;
  console.debug('evaluateProficiencyLevelUp - ' + proficiency.name + ' has ' + failuresRemaining + ' failures remaining')
  if (failuresRemaining <= 0) {
    proficiency.update({
      ["system.level"]: proficiency.system.level + 1,
      ["system.progress"]: failuresRemaining * -1,
    });

    proficiency.level ++;
    proficiency.progress = failuresRemaining;

    //TODO push list of upgraded profficiencies somewhere to help track progress to a level up
    console.log(proficiency.name + ' has LEVELED UP');
  }
}

function getProficiency(actor, profKey) {
  return actor.items.find((i) => i.system.key === profKey);
}

function determineSpecificity(type) {
  switch (type) {
    case 'type':
      return 1;
    case 'group':
      return 2;
    case 'category':
      return 3;
    default:
      return 0;
  }
}