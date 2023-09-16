import { ActorBase } from "./ActorBase.mjs";

export class Character extends ActorBase {
    /** @override */
    static type = 'character';

    /** @override */
    static derivedData(actorData) {

    }

    /** @override */
    static rollData(actorData) {

    }

    /** @override */
    static sheetData(context) {
        this.sheetCharacterData(context);
        this.sheetItemData(context);
    }

    static sheetCharacterData(context) {
        const data = context.data; 
        data.health.percentage = Math.floor(10000 * data.health.value / data.health.max)/100
    }

    static sheetItemData(context) {

    }
}