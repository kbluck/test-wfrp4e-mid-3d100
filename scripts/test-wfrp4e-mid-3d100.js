import TestWFRP from "../../../systems/wfrp4e/modules/system/rolls/test-wfrp4e.js";

console.log('Test-Mid-3d100 | Script loaded');

Hooks.on("init", function() {

console.log('Test-Mid-3d100 | Hooking init');

  game.wfrp4e.rolls.TestWFRP.prototype.rollDices = async function() {
    if (isNaN(this.preData.roll)) {
console.log('Test-Mid-3d100 | Rolling 3d100');

      // Roll 1d100 three times, and use the middle value as the roll.
      let roll = Promise.all([
        new Roll("1d100").roll(),
        new Roll("1d100").roll(),
        new Roll("1d100").roll()
      ]).sort(function(a, b){return a.total - b.total})[1];

      await this._showDiceSoNice(roll, this.data.context.rollMode || "roll", this.data.context.speaker);
      this.result.roll = roll.total;
    }
    else
      this.result.roll = this.preData.roll;
  };
});
