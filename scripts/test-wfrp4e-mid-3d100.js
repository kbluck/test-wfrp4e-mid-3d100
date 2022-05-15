/* ----------------------------------------------------- */
/*  Install new RoleDices() method for WFRP4e Test rolls */
/* ----------------------------------------------------- */
Hooks.on("init", function() {

  console.log("Test-Mid-3d100 | Replacing TestWFRP.rollDices() method");

  game.wfrp4e.rolls.TestWFRP.prototype.rollDices = async function() {
    // If no prior roll exists in the preData...
    if (isNaN(this.preData.roll)) {

      // Roll 1d100 three times asyncronously. Await all three in parallel.
      await Promise.all([
        new Roll("1d100").evaluate({"async": true}),
        new Roll("1d100").evaluate({"async": true}),
        new Roll("1d100").evaluate({"async": true})
      ]);

      console.debug(`Test-Mid-3d100 | 3 d100 rolled: [ ${rolls[0].total}, ${rolls[1].total}, ${rolls[2].total} ]`);

      // Use the middle value as the final roll.
      let roll = rolls.sort((a, b) => a.total - b.total)[1];
      console.debug(`Test-Mid-3d100 | Selected middle result: [ ${roll.total} ]`);

      // Show the roll on screen.
      await this._showDiceSoNice(roll, this.data.context.rollMode || "roll", this.data.context.speaker);

      // Set the roll total result in the Test object.
      this.result.roll = roll.total;
    }

    // A prior roll was provided in the preData.
    else {
      this.result.roll = this.preData.roll;
    }
  };
});
