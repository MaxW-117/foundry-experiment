export function registerHandlebarsHelpers() {
  Handlebars.registerHelper("debug", function(optionalValue) {
    console.log("Current Context");
    console.log("====================");
    console.log(this);
    if (optionalValue) {
        console.log("Value");
        console.log("====================");
        console.log(optionalValue);
    }
  });

  Handlebars.registerHelper("findAttribute", function(attKey, options) {
    return options.fn({ attribute: CONFIG.MYTT.stats[attKey] });
  });

  Handlebars.registerHelper("gmOnly", function(options) {
    if (game.user.isGM) {
      return `<span class="gm-only">${options.fn(this)}</span>`;
    }
  });

  Handlebars.registerHelper('concat', function() {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });
  
  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });
  
}

