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
        Character.setupStats(context);
        Character.deriveAncestries(context);
        Character.deriveStats(context);

        console.log('derived stats', context.data.stats)
    }

    static setupStats(context) {
        context.data.stats = {}
        context.data.freeStatPoints = {
            unallocated: 0,
            used: 0,
            total: 0,
        }
        Object.keys(CONFIG.MYTT.stats).forEach((key) => {
            context.data.stats[key] = { 
                name: CONFIG.MYTT.stats[key].name,
                description: CONFIG.MYTT.stats[key].description,
                breakdown: [{
                    value: context.data.assignedStats[key],
                    source: "Allocated"
                }],
            };
        });
        context.data.freeStatPoints.total = 0;
    }

    static deriveStats(context) {
        Object.keys(context.data.stats).forEach((statKey) => {
            const sum = context.data.stats[statKey].breakdown.reduce((total, b) => total+b.value, 0);
            context.data.stats[statKey].value = sum;
        });
    }

    static deriveAncestries(context){
        context.data.ancestry.forEach((a) => {
            const ancestryData = a.data.data;
            Object.keys(ancestryData.stats).forEach((statKey) => {
                context.data.stats[statKey].breakdown.push({
                    source: a.name,
                    value: ancestryData.stats[statKey] * ancestryData.level,
                });
            });
            context.data.totalFreeStatPoints += ancestryData.level * ancestryData.freeStats
        })
    }



    /** @override */
    static rollData(context) {

    }
}