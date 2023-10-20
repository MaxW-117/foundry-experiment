export class ItemBase {
  static type = 'item';


  /**
   * Augment the basic actor data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
  */
  static prepareData(actorData) {
    if (actorData.type !== this.type) return;
    this.prepData(actorData)
  }

  static prepData(actorData) {
   
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
  static getRollData(actorData) {
    if (actorData.type !== this.type) return;
    this.rollData(actorData);
  }

  static rollData(actorData) {

  }
}