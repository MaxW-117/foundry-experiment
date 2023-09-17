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
        data.health.max = Math.max(1, data.health.max)
        data.health.percentage = Math.floor(10000 * data.health.value / data.health.max)/100

        data.showMana = data.mana.max > 10
        data.mana.max = Math.max(1, data.mana.max)
        data.mana.percentage = Math.floor(10000 * data.mana.value / data.mana.max)/100

        data.showStamina = data.stamina.max > 10
        data.stamina.max = Math.max(1, data.stamina.max)
        data.stamina.percentage = Math.floor(10000 * data.stamina.value / data.stamina.max)/100
    }

    static sheetItemData(context) {

    }
}