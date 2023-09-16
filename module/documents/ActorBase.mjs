export class ActorBase {
  static type = 'actor';


  /**
   * Augment the basic actor data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
  */
  static prepareDerivedData(actorData) {
    if (actorData.type !== this.type) return;
    this.derivedData(actorData)
  }

  static derivedData(actorData) {
   
  }

  // static prepareCharacterData(actorData) {
  //   if (actorData.type !== this.type) return;
  //   this.characterData(actorData);
  // }

  // static characterData(actorData) {

  // }

  /**
   * Override getRollData() that's supplied to rolls.
  */
  static prepareRollData(actorData) {
    if (actorData.type !== this.type) return;
    this.rollData(actorData);
  }

  static rollData(actorData) {

  }

  // Retrieve the data structure from the base sheet. You can inspect or log
  // the context variable to see the structure, but some key properties for
  // sheets are the actor object, the data object, whether or not it's
  // editable, the items array, and the effects array.
  static prepareSheetData(context) {
    if (context.actor.type !== this.type) return;
    this.sheetData(context);
  }

  static sheetData(context) {

  }
}