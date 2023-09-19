export class ActorBase {
  static type = 'actor';

  // Data modifications in this step occur before processing embedded
  // documents or derived data.
  static prepareBaseData(context) {
    if (context.type !== this.type) return;
    this.baseData(context)
  }

  static baseData(context) {
    
  }

  /**
   * Augment the basic actor data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
  */
  static prepareDerivedData(context) {
    if (context.type !== this.type) return;
    this.derivedData(context)
  }

  static derivedData(context) {
   
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