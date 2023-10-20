/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
 export const preloadHandlebarsTemplates = async function() {
  return loadTemplates([

    // Actor partials.
    "systems/mytt/templates/actor/character-parts/stats.hbs",
    "systems/mytt/templates/actor/character-parts/ancestry.hbs",
    "systems/mytt/templates/actor/character-parts/weapons-actions.hbs",
    "systems/mytt/templates/actor/character-parts/actions.hbs",
    "systems/mytt/templates/actor/parts/actor-features.html",
    "systems/mytt/templates/actor/parts/actor-items.html",
    "systems/mytt/templates/actor/parts/actor-effects.html",
    "systems/mytt/templates/cards/stat-roll.hbs",
    "systems/mytt/templates/cards/weapon-roll.hbs",
  ]);
};
