import { ActorBase } from "./ActorBase.mjs";

export class Character extends ActorBase {
    /** @override */
    static type = 'character';

    // ============================= BASE DATA ==================================
    static baseData(context) {
        Character.sortItems(context);
    }

    static sortItems(context) {
        for (let i of context.items) {
            if (!context.data[i.type])
                context.data[i.type] = []
            context.data[i.type].push(i)
        }
    }

    // ============================= DERIVED DATA ==================================

    /** @override */
    static derivedData(context) {
        const actorData = context.data;
        Character.setupStats(actorData);
        Character.deriveAncestries(actorData);
        Character.deriveStats(actorData);

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
                name: CONFIG.MYTT.stats[key].name,
                description: CONFIG.MYTT.stats[key].description,
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
        actorData.ancestry.forEach((a) => {
            const ancestryData = a.data.data;
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

    /** @override */
    static rollData(context) {

    }
}