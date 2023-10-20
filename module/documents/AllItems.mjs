import { Weapon } from "./Weapon.mjs";

export class AllItems {
  static rollItem(item, options) {
    switch (item.type) {
      case 'weapon':
        Weapon.roll(item, options);
        break;
    
      default:
        console.error('Unrecognized type ' + item.type)
        break;
    }
  }
}