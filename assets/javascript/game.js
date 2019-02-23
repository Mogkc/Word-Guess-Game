var choices = ["admiralty", "aground", "amidships", "starboard", 
    "ballast", "barquentine", "barrelman", "beakhead", "billethead",
    "binnacle", "boatswain", "bowline", "breakwater", "brigantine", "broadside",
    "caboose", "capsize", "carronade", "catamaran", "commodore", "compass",
    "corvette", "daggerboard", "deckhead", "dinghy", "downhaul", "dreadnought",
    "drydock", "embayed", "fantail", "fathom", "flotilla", "forestays", "frigate",
    "galley", "gangway", "gondola", "halliard", "heading", "helmsman", "hydrofoil",
    "ironclad", "jacklines", "leeward", "lifejacket", "lookout", "maritime",
    "masthead", "midshipman", "mizzenmast", "mooring", "nautical", "navigation",
    "pennant", "pontoon", "ratlines", "reaching", "roadstead", "rowlock", "rudder",
    "rummage", "sailing", "schooner", "scuttlebut", "slipway", "starboard",
    "tacking", "tonnage", "topsail", "underway", "voyage", "waterline", "waypoint",
    "weatherly", "whaleback", "windward", "yardarm"];
var allowedGuesses = 6;

function updateScreen() {
    document.getElementById("win-count").innerHTML = game.wins;
    document.getElementById("word-display").innerHTML = "";
    document.getElementById("g-remaining").innerHTML = game.guessesRemaining;
    document.getElementById("guesses").innerHTML = "";

    //Show the player what they've guessed
    game.guesses.forEach(element => {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(element);
        node.appendChild(textnode);
        document.getElementById("guesses").appendChild(node);
    });

    //Show the player how much of the word they know
    game.playerKnows.forEach(element => {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(element);
        node.appendChild(textnode);
        document.getElementById("word-display").appendChild(node);
    });
}

var game = {
    wins: 0,

    newGame: function () {
        this.guessesRemaining = allowedGuesses;
        this.guesses = [];
        this.playerKnows = [];
        this.currentWord = choices[Math.floor(Math.random() * choices.length)];
        for (let i = 0; i < this.currentWord.length; i++) {
            this.playerKnows.push('_');
        }
        updateScreen();
        console.log(this.currentWord);
    },

    newGuess: function (key) {
        //First use a flag to see the guess is new
        let keyIsNew = true;
        for (let i = 0; i < this.guesses.length; i++) {
            if (key === this.guesses[i]) {
                keyIsNew = false;
            }
        }
        //Only if the guess is new, update the game
        if (keyIsNew) {
            //Now see if the guess is in the word,
            //and reveal any correct ones
            let inWord = false;
            this.guesses.push(key);
            for (let i = 0; i < this.currentWord.length; i++) {
                if (key === this.currentWord[i]) {
                    inWord = true;
                    this.playerKnows[i] = key;
                }
            }
            if (inWord) {
                //Check if the game is finished
                let finished = true;
                for (let i = 0; i < this.playerKnows.length; i++) {
                    if (this.playerKnows[i] === '_') {
                        finished = false;
                    }
                }
                if (finished) {
                    this.wins++;
                    this.newGame();
                }
            } else {
                this.guessesRemaining--;
                if (this.guessesRemaining === 0) {
                    this.newGame();
                }
            }
        }
        updateScreen();
    }
};

game.newGame();

document.onkeyup = function (event) {
    //Make sure the guess is a lowercase letter
    if (/^[a-z]/.test(event.key)) {
        game.newGuess(event.key);
    } else {
        //If the key isn't a letter, see if they're starting the game.
        if(event.keyCode === 13) {
            document.getElementById("cover").style.zIndex = "-1";
        }
    }
};