/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class MyttActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["mytt", "sheet", "actor"],
      template: "systems/mytt/templates/actor/actor-sheet.html",
      width: 600,
      height: 600,
      tabs: [
        { navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "actions" },
        { navSelector: ".action-tabs", contentSelector: ".action-body", initial: "weapons" },
      ]
    });
  }

  /** @override */
  get template() {
    return `systems/mytt/templates/actor/actor-${this.actor.type}-sheet.html`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = super.getData();

    const actorData = this.actor.toObject(false);
    
    context.rollData = context.actor.getRollData();
    context.system = actorData.system;
    context.flags = actorData.flags;
    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
  }

}
