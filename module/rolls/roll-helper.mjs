import { sum } from "../helpers/utils.mjs";

export class RollHelper extends Roll {
    constructor(rollText = '1d20', params = {}, target=null) {
        super(rollText, params)
    }

    static statRoll(actorRollData, stat) {
        const statValue = actorRollData.stats[stat].value
        const rollText = `1d20 * (1 + @${stat}/10)`
        const roll = new RollHelper(rollText, {
            [stat]: statValue
        })
        return roll;
    }

    static rangeRoll(min, max) {
        const dieSize = max - min;
        const flatAmount = min;
        console.log({min, max, dieSize, flatAmount})
        const rollText = `1d${dieSize} + @flatAmount`
        const roll =  new RollHelper(rollText, {
            flatAmount,
        })
        roll.min = min;
        roll.max = max;
        return roll;
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

    get total() {
        return (Math.floor(super.total))
    }

    get isMax() {
        const highestFace = this.dice.reduce((highest, die) => {
            if (highest > die.faces) return highest;
            return die.faces;
        }, 0)
        return this.includesFace(highestFace)
    }

    get isMin() {
        const lowestFace = 1;
        return this.includesFace(lowestFace)
    }

    includesFace(value) {
        return this.dice.some((dice) => 
            dice.results.some((results) => 
                results.result === value
            )
        )
    }
  }