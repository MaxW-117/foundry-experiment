export class RollHelper extends Roll {
    constructor(rollText = '1d20', params = {}) {
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

    static scalarRoll(min, max) {
        const dieSize = max - min;
        const flatAmount = min;
        const rollText = '1d@dieSize + @flatAmount'
        return new RollHelper(rollText, {
            dieSize,
            flatAmount,
        })
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