import { criticalFailureProficiencyIncrement, criticalFailureThresholdFor, criticalSuccessThresholdFor, failureProficiencyIncrement } from "../helpers/balancing-controls.mjs";
import { incrementProficiencies } from "../helpers/proficiency-manager.mjs";

export class RollCheck {
  constructor({min, max, dc, player, proficiencies}) {
    this.min = min;
    this.max = max;
    this.dc = dc;
    this.player = player;
    this.proficiencies = proficiencies;
    const dieSize = max - min;
    const flatAmount = min;
    const rollText = `1d${dieSize} + ${flatAmount}`
    this._baseRoll = new Roll(rollText)
  }

  get total() {
    return (Math.floor(this._baseRoll.total))
  }

  get isMin() {
    return this.total === this.min;
  }

  get isMax() {
    return this.total === this.max;
  }

  get criticalFailure() {
    return this.dc && this.total < criticalFailureThresholdFor(this.dc);
  }

  get failure() {
    return this.dc && this.total < this.dc;
  }

  get success() {
    return this.dc && this.total >= this.dc;
  }

  get criticalSuccess() {
    return this.dc && this.total >= criticalSuccessThresholdFor(this.dc);
  }

  get range() {
    return `${this.min} - ${this.max}`
  }

  async evaluate(opts = {}) {
    this.evaluated = await this._baseRoll.evaluate();
    if (!this.dc || opts.skipProficiencyBoost) {
      console.log('skipping proficiency boosts')
    } else {
      if (this.criticalFailure) {
        incrementProficiencies(this.player, this.proficiencies, criticalFailureProficiencyIncrement)
      } else if (this.failure) {
        incrementProficiencies(this.player, this.proficiencies, failureProficiencyIncrement)
      }
    }
    return { 
      ...this._baseRoll,
      ...this.evaluated,
      ...this,
      total: this.total,
      isMin: this.isMin,
      isMax: this.isMax,
      criticalFailure: this.criticalFailure,
      failure: this.failure,
      success: this.success,
      criticalSuccess: this.criticalSuccess,
      range: this.range,
    }
  }

  static evaluateRange(rangeModifiers) {
      const minBase = rangeModifiers.filter(m => m.type === "minBase").sum('value');
      const maxBase = rangeModifiers.filter(m => m.type === "maxBase").sum('value');
      const minAssurance = rangeModifiers.filter(m => m.type === "minAssurance").sum('value');
      const maxMult = rangeModifiers.filter(m => m.type === "maxMultiplier").sum('value');
      const max = Math.floor(maxBase * maxMult)
      const min = Math.floor(minBase + (max-minBase) * minAssurance)
      return [min, max]
  }
}