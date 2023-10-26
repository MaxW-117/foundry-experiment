import { MyttItemSheet } from '../item-sheet.mjs'

export class AncestrySheet extends MyttItemSheet {
  getData() {
    const context = super.getData();
    context.item.system.displayStats = Object.keys(context.item.system.stats)
      .filter((key => context.item.system.stats[key] || 0 < 1))
      .map((key) => {
          return {
              key: key,
              name: CONFIG.MYTT.stats[key]?.name || 'Free',
              description: CONFIG.MYTT.stats[key]?.description || 'Points that may be freely allocated',
              value: context.item.system.stats[key] || 0,
          };
      });
    return context;
  }


  activateListeners(html) {
    super.activateListeners(html);
  }

}