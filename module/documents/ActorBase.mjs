export class ActorBase {
  static type = 'actor';

  static prepareDerivedData(actorData) {
    if (actorData.type !== this.type) return;
    this.derivedData(actorData)
  }

  static derivedData(actorData) {
   
  }

  static prepareCharacterData(actorData) {
    if (actorData.type !== this.type) return;
    this.characterData(actorData);
  }

  static characterData(actorData) {

  }

  static prepareRollData(actorData) {
    if (actorData.type !== this.type) return;
    this.rollData(actorData);
  }

  static rollData(actorData) {

  }
}