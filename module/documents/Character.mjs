import { ActorBase } from "./ActorBase.mjs";

export class Character extends ActorBase {
    /** @override */
    static type = 'character';

    /** @override */
    static derivedData(actorData) {
        Object.keys(CONFIG.MYTT.stats).forEach((statKey) => this.deriveStat(actorData, statKey))
    }

    static deriveStat(actorData, statKey) {
        actorData.data[statKey] = 1;
    }

    /** @override */
    static rollData(actorData) {

    }
}