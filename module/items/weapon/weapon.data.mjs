import { extrapolateStatMultiplier } from "../../helpers/utils.mjs";
import { RollCheck } from "../../rolls/roll-check.mjs";
import { MyttItem } from "../item.mjs";

export class Weapon extends MyttItem {
    // ============================= PREP DATA ==================================
    prepareData() {
      if (this.actor) this.actor.prepareDerivedData();
      this.evaluateAttackRange();
      this.evaluateDamageRange();
      super.prepareData();
    }
    // ============================= ROLL DATA ==================================

    /** @override */
    getRollData() {
      const rollData = super.getRollData()

      return rollData
    }

    async roll(options = {}) {
      const item = this;
      if (options?.type == "damage") return console.error("not built yet")
      let dc = undefined;
      if (options.target) {
        dc = options.target.actor.system.ac;
      }
      const cardData = {
        user: game.user._id,
        speaker: ChatMessage.getSpeaker(),
        owner: item.actor._id,
        item: item.system,
        data: item,
      }
      // this.evaluateAttackRange(item)
      const r = new RollCheck({
        min: item.system.attackMin,
        max: item.system.attackMax,
        player: item.player,
        actor: item.actor,
        proficiencies: ['weapon-group-'+item.system.group, 'weapon-category-'+item.system.category, 'weapon-type-'+item.system.type],
        dc,
      });
      const results = await r.evaluate();
      cardData.roll = results;
      cardData.content = await renderTemplate(CONFIG.MYTT.templates.weaponRollCard, cardData);
      return ChatMessage.create(cardData);
    }

    evaluateAttackRange() {
      const item = this.system;
      const actor = this.actor?.system;
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
        const proficiencies = ['weapon-group-'+item.group, 'weapon-category-'+item.category, 'weapon-type-'+item.type];
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
      const attackRollRange = RollCheck.evaluateRange(item.attackRollRangeModifiers);
      item.attackMin = attackRollRange[0];
      item.attackMax = attackRollRange[1];
    }
  
    evaluateDamageRange() {
      const item = this.system;
      const actor = this.actor?.system;
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
      const damageRollRange = RollCheck.evaluateRange(item.damageRollRangeModifiers);
      item.damageMin = damageRollRange[0];
      item.damageMax = damageRollRange[1];
    }
}