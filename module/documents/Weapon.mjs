import { extrapolateStatMultiplier } from "../helpers/utils.mjs";
import { RollHelper } from "../rolls/roll-helper.mjs";
import { ItemBase } from "./ItemBase.mjs";

export class Weapon extends ItemBase {
  static type = 'weapon';

  /** @override */
  static prepData(itemData) {
    // console.info("Weapon - prepData", {itemData})
    if (itemData.actor) itemData.actor.prepareDerivedData();
    this.evaluateAttackRange(itemData);
    this.evaluateDamageRange(itemData);

    console.log("Weapon - after prepData", {itemData})
  }

  /** @override */
  static rollData(itemData) {
  //   console.error("Weapon - rollData", {itemData})
  //   const item = itemData.item;
  //   const actor = item.actor.system;
  //   const proficiencies = [item.group, item.category, item.type];
  //   const profMods = proficiencies.map((p) => {
  //     return {
  //       type: 'minAssurance',
  //       value: actor.proficiencies[p]?.value || 0,
  //       name: actor.proficiencies[p]?.name || p,
  //     }
  //   });
  //   const baseMods = [
  //     {
  //       type: 'minBase',
  //       value: item.min,
  //       name: 'Minimum Base',
  //     },
  //     {
  //       type: 'maxBase',
  //       value: item.max,
  //       name: 'Maximum Base',
  //     }
  //   ];
  //   const statMod = {
  //     type: 'maxMultiplier',
  //     value: actor.stats[item.attackStat] || 1,
  //     name: item.attackStat,
  //   }
  //   itemData.attackRollRangeModifiers = [...profMods, ...baseMods, statMod]
  //   const attackRollRange = RollHelper.evaluateRange(itemData.attackRollRangeModifiers);
  //   itemData.attackMin = attackRollRange[0];
  //   itemData.attackMax = attackRollRange[1];
  }

  static evaluateAttackRange(itemData) {
    const item = itemData.system;
    const actor = itemData.actor?.system;
    item.attackRollRangeModifiers = [
      {
        type: 'minBase',
        value: item.baseMinAttack,
        name: 'Minimum Base',
      },
      {
        type: 'maxBase',
        value: item.baseMaxAttack,
        name: 'Maximum Base',
      }
    ];
    if (actor) {
      const proficiencies = [item.group, item.category, item.type];
      const profMods = proficiencies.map((p) => {
        return {
          type: 'minAssurance',
          value: actor.proficiencies[p]?.value || 0,
          name: actor.proficiencies[p]?.name || p,
        }
      });

      const statValue = actor.stats[item.attackStat].value || 0;
      const statMod = {
        type: 'maxMultiplier',
        value: extrapolateStatMultiplier(item.attackStat, statValue),
        name: item.attackStat,
      }
      item.attackRollRangeModifiers.push(...profMods, statMod)
    }
    const attackRollRange = RollHelper.evaluateRange(item.attackRollRangeModifiers);
    item.attackMin = attackRollRange[0];
    item.attackMax = attackRollRange[1];
  }

  static evaluateDamageRange(itemData) {
    const item = itemData.system;
    const actor = itemData.actor?.system;
    item.damageRollRangeModifiers = [
      {
        type: 'minBase',
        value: item.baseMinDamage,
        name: 'Minimum Base',
      },
      {
        type: 'maxBase',
        value: item.baseMaxDamage,
        name: 'Maximum Base',
      }
    ];

    if (actor) {
      const statValue = actor.stats[item.damageStat].value || 0;
      const statMod = {
        type: 'maxMultiplier',
        value: extrapolateStatMultiplier(item.damageStat, statValue),
        name: item.damageStat,
      }
      item.damageRollRangeModifiers.push(statMod)
    }
    const damageRollRange = RollHelper.evaluateRange(item.attackRollRangeModifiers);
    item.damageMin = damageRollRange[0];
    item.damageMax = damageRollRange[1];
  }
}