import { MyttActorSheet } from '../actor-sheet.mjs'
import { RollHelper } from '../../helpers/rolls/roll-helper.mjs'

export class CharacterSheet extends MyttActorSheet {
  getData() {
    const context = super.getData();
    const actorData = context.system;
    this.sheetCharacterData(actorData);
    this.sheetItemData(actorData);
    return context;
  }

  sheetCharacterData(data) {
    data.health.max = Math.max(1, data.health.max)
    data.health.percentage = Math.floor(10000 * data.health.value / data.health.max) / 100

    data.showMana = data.mana.max > 10
    data.mana.max = Math.max(1, data.mana.max)
    data.mana.percentage = Math.floor(10000 * data.mana.value / data.mana.max) / 100

    data.showStamina = data.stamina.max > 0
    data.stamina.max = Math.max(1, data.stamina.max)
    data.stamina.percentage = Math.floor(10000 * data.stamina.value / data.stamina.max) / 100

    data.freeStatPointsAvailable = data.freeStatPoints.unallocated > 0;

    data.displayStats = Object.keys(CONFIG.MYTT.stats)
      .filter(k => k !== 'luc')
      .map((key) => {
        return {
          ...data.stats[key],
          key: key,
          breakdownText: data.stats[key].breakdown
            .map((b) => `${b.source}: ${b.value}`)
            .join(', '),
        };
      });
  }

  sheetItemData(data) {
    // const data = context.data;
    // for (let i of context.items) {
    //     if (!data[i.type])
    //     data[i.type] = []
    //     data[i.type].push(i)
    // }
  }

  activateListeners(html) {
    super.activateListeners(html);
    // Render the item sheet for viewing/editing prior to the editable check.
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = context.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    html.find('.inline-edit').change(this._onItemEdit.bind(this));

    html.find('.stat-add').click(this._onStatAdd.bind(this))

    html.find('.rollable.stat-roll').click(this._onStatRoll.bind(this))

    html.find('.rollable.item-roll').click(this._onItemRoll.bind(this))
  }

  /**
  * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
  * @param {Event} event   The originating click event
  * @private
  */
  async _onItemCreate(event) {
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

  async _onItemEdit(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest('.item').dataset.itemId;
    const item = this.actor.items.get(itemId);
    const field = element.dataset.field;

    return item.update({ [field]: element.value })
  }

  async _onStatAdd(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const stat = element.closest('.stat-row').dataset.stat;
    this.actor.update({ ["data.assignedStats." + stat]: this.actor.system.assignedStats[stat] + 1 })
  }

  async _onStatRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const stat = element.closest('.stat-row').dataset.stat;
    const cardData = {
      user: game.user._id,
      speaker: ChatMessage.getSpeaker(),
      owner: this.actor.id,
      stat: CONFIG.MYTT.stats[stat],
    }
    const r = await RollHelper.statRoll(this.actor.getRollData(), stat)
    const results = await r.evaluate();
    cardData.roll = results;
    cardData.content = await renderTemplate(CONFIG.MYTT.templates.statRollCard, cardData);
    return ChatMessage.create(cardData);
  }

  async _onItemRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest('li.item').dataset["itemId"];
    const item = this.actor.items.get(itemId);
    const target = game.user.targets.values().next()?.value;
    item.roll({ target });
  }
}