import { MyttActor } from "../actor.mjs";

export class Character extends MyttActor {

    // ============================= BASE DATA ==================================
    prepareData() {
        console.debug("Character - prepareData - START")
        this.sortItems();
        console.debug("Character - prepareData - END")
        super.prepareData();

    }

    sortItems() {
        for (let i of this.items) {
            if (!this.system[i.type])
                this.system[i.type] = []
            this.system[i.type].push(i)
        }
    }

    // ============================= DERIVED DATA ==================================

    /** @override */
    prepareDerivedData() {
        console.debug("Character - prepareDerivedData - START")
        super.prepareDerivedData();
        const actorData = this.system;
        Character.setupStats(actorData);
        Character.deriveAncestries(actorData);
        Character.deriveStats(actorData);
        Character.deriveResources(actorData);
        console.debug("Character - prepareDerivedData - END")

    }

    static setupStats(actorData) {
        actorData.stats = {}
        actorData.freeStatPoints = {
            unallocated: 0,
            used: 0,
            total: 0,
        }
        Object.keys(CONFIG.MYTT.stats).forEach((key) => {
            actorData.stats[key] = { 
                ... CONFIG.MYTT.stats[key],
                breakdown: [{
                    value: actorData.assignedStats[key],
                    source: "Allocated"
                }],
            };
            actorData.freeStatPoints.used += actorData.assignedStats[key];
        });
    }

    static deriveStats(actorData) {
        Object.keys(actorData.stats).forEach((statKey) => {
            const sum = actorData.stats[statKey].breakdown.reduce((total, b) => total+b.value, 0);
            actorData.stats[statKey].value = sum;
        });
    }

    static deriveAncestries(actorData){
        actorData.ancestry?.forEach((a) => {
            const ancestryData = a.system;
            Object.keys(ancestryData.stats).forEach((statKey) => {
                actorData.stats[statKey].breakdown.push({
                    source: a.name,
                    value: ancestryData.stats[statKey] * ancestryData.level,
                });
            });
            actorData.freeStatPoints.total += ancestryData.level * ancestryData.freeStats
        })
        actorData.freeStatPoints.unallocated = actorData.freeStatPoints.total - actorData.freeStatPoints.used;
    }

    static deriveResources(actorData) {
        actorData.health.max = actorData.stats.vit.value * 3;
        actorData.mana.max = actorData.stats.kno.value * 4;
        actorData.stamina.max = actorData.stats.end.value * 0.5;
        actorData.ac = 10 + actorData.stats.agi.value;
    }

    /** @override */
    static rollData() {
      const rollData = super.getRollData()
    
      return rollData
    }
}