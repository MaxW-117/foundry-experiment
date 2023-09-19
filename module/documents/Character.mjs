import { ActorBase } from "./ActorBase.mjs";

export class Character extends ActorBase {
    /** @override */
    static type = 'character';

    static baseData(actorData) {
        for (let i of actorData.items) {
            if (!actorData.data[i.type])
                actorData.data[i.type] = []
            actorData.data[i.type].push(i)
        }
    }

    /** @override */
    static derivedData(actorData) {
        Object.keys(CONFIG.MYTT.stats).forEach((statKey) => this.deriveStat(actorData, statKey));
    }

    static deriveStat(actorData, statKey) {
        actorData.data.stats[statKey] = 1;
    }

    /** @override */
    static rollData(actorData) {

    }
}