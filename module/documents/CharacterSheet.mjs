export class CharacterSheet {

    static prepareSheetData(context) {
        if (context.actor.type !== 'character') return;
        this.sheetCharacterData(context);
        this.sheetItemData(context);
    }

    static sheetCharacterData(context) {
        const data = context.data;
        data.health.max = Math.max(1, data.health.max)
        data.health.percentage = Math.floor(10000 * data.health.value / data.health.max) / 100

        data.showMana = data.mana.max > 10
        data.mana.max = Math.max(1, data.mana.max)
        data.mana.percentage = Math.floor(10000 * data.mana.value / data.mana.max) / 100

        data.showStamina = data.stamina.max > 10
        data.stamina.max = Math.max(1, data.stamina.max)
        data.stamina.percentage = Math.floor(10000 * data.stamina.value / data.stamina.max) / 100

        data.freeStatPoints = 0;
        data.freeStatPointsAvailable = data.freeStatPoints > 0;
        data.displayStats = Object.keys(CONFIG.MYTT.stats)
            .filter(k => k !== 'luc')
            .map((key) => {
                return {
                    key: key,
                    name: CONFIG.MYTT.stats[key].name,
                    description: CONFIG.MYTT.stats[key].description,
                    breakdown: `Some breakdown here`,
                    value: data[key],
                    increasable: data.freeStatPointsAvailable
                };
            });
    }

    static sheetItemData(context) {

    }

    static registerHooks(html) {
        // Render the item sheet for viewing/editing prior to the editable check.
        html.find('.item-edit').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = context.actor.items.get(li.data("itemId"));
            item.sheet.render(true);
        });

        console.log('is editable? ', this.isEditable)

        // -------------------------------------------------------------
        // Everything below here is only needed if the sheet is editable
        if (!this.isEditable) return;

        // Add Inventory Item
        html.find('.item-create').click(CharacterSheet._onItemCreate.bind(this));

        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            item.delete();
            li.slideUp(200, () => this.render(false));
        });
    }

    /**
 * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
 * @param {Event} event   The originating click event
 * @private
 */
    static async _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        // Get the type of item to create.
        const type = header.dataset.type;
        // Grab any data associated with this control.
        const data = duplicate(header.dataset);
        // Initialize a default name.
        const name = `New ${type.capitalize()}`;
        // Prepare the item object.
        const itemData = {
            name: name,
            type: type,
            data: data
        };
        // Remove the type from the dataset since it's in the itemData.type prop.
        delete itemData.data["type"];

        // Finally, create the item!
        return await Item.create(itemData, { parent: this.actor });
    }
}