export class ActorBase {
  static type = 'actor';

  // Data modifications in this step occur before processing embedded
  // documents or derived data.
  static prepareBaseData(actorData) {
    if (actorData.type !== this.type) return;
    this.baseData(actorData)
  }

  static baseData(actorData) {
    
  }

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

  /**
   * Override getRollData() that's supplied to rolls.
  */
  static prepareRollData(actorData) {
    if (actorData.type !== this.type) return;
    this.rollData(actorData);
  }

  static rollData(actorData) {

  }
}