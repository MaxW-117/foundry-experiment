export const sum = (a,b) => a+b;

export function extrapolateStatMultiplier(statName, value) {
  if (statName === 'str' || statName === 'dex') {
    return 1 + value / 10;
  }
  return 1;
}

Array.prototype.sum = function (key = undefined) {
  var total = 0;
  for (var i = 0; i < this.length; i++) {
    if (key) 
      total += this[i][key];
    else
      total += this[i];
  }
  return total;
};