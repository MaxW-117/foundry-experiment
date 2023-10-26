import { Ancestry } from "./ancestry/ancestry.data.mjs";
import { MyttItem } from "./item.mjs";
import { Weapon } from "./weapon/weapon.data.mjs";

//Provide a type string to class object mapping to keep our code clean
const itemMapping = {
  ancestry: Ancestry,
  weapon: Weapon,
};

export const MyttItemProxy = new Proxy(function () {}, {
  //Will intercept calls to the "new" operator
  construct: function (target, args) {
    const [data] = args;

    //Handle missing mapping entries
    if (!itemMapping.hasOwnProperty(data.type))
      throw new Error("Unsupported Entity type for create(): " + data.type);

    //Return the appropriate, actual object from the right class
    return new itemMapping[data.type](...args);
  },

  //Property access on this weird, dirty proxy object
  get: function (target, prop, receiver) {
    switch (prop) {
      case "create":
      case "createDocuments":
        //Calling the class' create() static function
        return function (data, options) {
          if (data.constructor === Array) {
            //Array of data, this happens when creating Items imported from a compendium
            return data.map(i => NumeneraItem.create(i, options));
          }

          if (!itemMapping.hasOwnProperty(data.type))
            throw new Error("Unsupported Entity type for create(): " + data.type);

          return itemMapping[data.type].create(data, options);
        };

      case Symbol.hasInstance:
        //Applying the "instanceof" operator on the instance object
        return function (instance) {
          return Object.values(itemMapping).some(i => instance instanceof i);
        };

      default:
        //Just forward any requested properties to the base Item class
        return MyttItem[prop];
    }
  },
});
