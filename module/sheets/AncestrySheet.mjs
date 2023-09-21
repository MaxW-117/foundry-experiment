export class AncestrySheet {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    static prepareSheetData(context) {
        if (context.item.type !== 'ancestry') return;
        context.item.displayStats = Object.keys(context.data.system.stats)
            .filter((key => context.data.system.stats[key] || 0 < 1))
            .map((key) => {
                return {
                    key: key,
                    name: CONFIG.MYTT.stats[key]?.name || 'Free',
                    description: CONFIG.MYTT.stats[key]?.description || 'Points that may be freely allocated',
                    value: context.data.system.stats[key] || 0,
                };
            });
    }

}