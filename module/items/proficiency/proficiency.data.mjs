import { failuresNeededToLevel } from "../../helpers/balancing-controls.mjs";
import { MyttItem } from "../item.mjs";

export class Proficiency extends MyttItem {
  /*{
    name,
    key: name,
    level: 1,
    progress: 0,
  }*/
  // constructor() {
  //   super(...arguments);
  // }

    // ============================= PREP DATA ==================================
    prepareData() {
      super.prepareData();
      this.system.rank = Proficiency.getRankName(this.system.level);
      this.system.progressNeededTotal = failuresNeededToLevel(this.system.level, this.system.specificity);
      this.system.progressRemaining = this.system.progressNeededTotal - this.system.progress;
    }
    // ============================= ROLL DATA ==================================

    /** @override */
    getRollData() {
      const rollData = super.getRollData()

      return rollData
    }

    // ============================= PRIVATE ==============================

    static getRankName(level) {
      let name = "";
      const proficiency = Math.floor(level / 5);
      const tier = level % 4;
      switch (proficiency) {
        case 0:
          name = "Untrained";
          break;
        case 1:
          name = "Trained";
          break;
        case 2:
          name = "Expert";
          break;
        case 3:
          name = "Master";
          break;
        case 4:
          name = "Legendary";
          break;
        default:
          name = "Unknown";
          break;
    }
    switch (tier) {
      case 0:
        name = "Early " + name;
        break;
      case 1:
        name = "Mid " + name;
        break;
      case 2:
        name = "Late " + name;
        break;
      case 3:
        name = "Peak " + name;
        break;
      default:
        name = "Unknown" + name;
        break;
    }
    return name;
  }
}