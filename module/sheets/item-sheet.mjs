import { AncestrySheet } from "../documents/AncestrySheet.mjs";

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class SystemItemSheet extends ItemSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["mytt", "sheet", "item"],
      width: 520,
      height: 580,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  /** @override */
  get template() {
    const path = "systems/mytt/templates/item";
    // Return a single sheet for all item types.
    // return `${path}/item-sheet.html`;

    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.html`.
    return `${path}/${this.item.data.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    Handlebars.registerHelper("debug", function(optionalValue) {
      console.log("Current Context");
      console.log("====================");
      console.log(this);
      if (optionalValue) {
          console.log("Value");
          console.log("====================");
          console.log(optionalValue);
      }
    });

    Handlebars.registerHelper("findAttribute", function(attKey, options) {
      return options.fn({ attribute: CONFIG.MYTT.stats[attKey] })
    });
    // Retrieve base data structure.
    const context = super.getData();

    // Use a safe clone of the item data for further operations.
    const itemData = context.item.data;

    AncestrySheet.prepareSheetData(context);

    // Retrieve the roll data for TinyMCE editors.
    context.rollData = {};
    let actor = this.object?.parent ?? null;
    if (actor) {
      context.rollData = actor.getRollData();
    }

    // Add the actor's data to context.data for easier access, as well as flags.
    context.data = itemData.data;
    context.flags = itemData.flags;

    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Roll handlers, click handlers, etc. would go here.
  }
}
