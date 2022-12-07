var elScoreOnes            = document.getElementById('ones');
var elScoreTwos            = document.getElementById('twos');
var elScoreThrees          = document.getElementById('threes');
var elScoreFours           = document.getElementById('fours');
var elScoreFives           = document.getElementById('fives');
var elScoreSixes           = document.getElementById('sixes');
var elScoreThreeKind       = document.getElementById('threeKind');
var elScoreFourKind        = document.getElementById('fourKind');
var elScoreFullHouse       = document.getElementById('fullHouse');
var elScoreSmallStraight   = document.getElementById('smallStaight');
var elScoreLargeStraight   = document.getElementById('largeStraight');
var elScoreChance          = document.getElementById('chance');
var elScoreYahtzee         = document.getElementById('yahtzee');

var elDiceOne              = document.getElementById('dice1');
var elDiceTwo              = document.getElementById('dice2');
var elDiceThree            = document.getElementById('dice3');
var elDiceFour             = document.getElementById('dice4');
var elDiceFive             = document.getElementById('dice5');

var play_combo_button      = document.getElementById('play_combo_button');
var elComeOut              = document.getElementById('roll');

elDiceOne.onclick          = function(){select_dice('d1');};
elDiceTwo.onclick          = function(){select_dice('d2');};
elDiceThree.onclick        = function(){select_dice('d3');};
elDiceFour.onclick         = function(){select_dice('d4');};
elDiceFive.onclick         = function(){select_dice('d5');};
      
elComeOut.onclick          = function(){roll_button_clicked();};
play_combo_button.onclick  = function(){play_combonation();};
      
var game                   = new Game();
var hand                   = new Hand();
var selected_dice          = [true,true,true,true,true];
init_dice();

function init_dice(){
    roll_button_clicked();
    // roll_button_clicked();
}

function play_combonation(){

    var valid_combos = game.find_playable_rows(hand);
    
    if(valid_combos.one.valid){
        elScoreOnes.innerHTML = (" " +  valid_combos.one.score)
    }
    if(valid_combos.two.valid){
        elScoreTwos.innerHTML = (" " +  valid_combos.two.score)
    }
    if(valid_combos.three.valid){
        elScoreThrees.innerHTML = (" " +  valid_combos.three.score)
    }
    if(valid_combos.four.valid){
        elScoreFours.innerHTML = (" " +  valid_combos.four.score)
    }
    if(valid_combos.five.valid){
        elScoreFives.innerHTML = (" " +  valid_combos.five.score)
    }
    if(valid_combos.six.valid){
        elScoreSixes.innerHTML = (" " +  valid_combos.six.score)
    }
    if(valid_combos.threeKind.valid){
        elScoreThreeKind.innerHTML = (" " +  valid_combos.threeKind.score)
    }
    if(valid_combos.fourKind.valid){
        elScoreFourKind.innerHTML = (" " +  valid_combos.fourKind.score)
    }
    if(valid_combos.smallStraight.valid){
        elScoreSmallStraight.innerHTML = (" " +  valid_combos.smallStraight.score)
    }
    if(valid_combos.largeStaight.valid){
        elScoreLargeStraight.innerHTML = (" " +  valid_combos.largeStaight.score)
    }
    if(valid_combos.fullHouse.valid){
        elScoreFullHouse.innerHTML = (" " +  valid_combos.fullHouse.score)
    }
    if(valid_combos.chance.valid){
        elScoreChance.innerHTML = (" " +  valid_combos.chance.score)
    }
    if(valid_combos.yahtzee.valid){
        elScoreYahtzee.innerHTML = (" " +  valid_combos.yahtzee.score)
    }
}

function roll_button_clicked(){

    console.log("Roll Button Clicked")
    
    var updated_dice;

    updated_dice = hand.roll_selected_dice(selected_dice);

    for(updated_die of updated_dice){
        switch(updated_die.index){
            case 0:
                elDiceOne.classList.toggle("dice_selected");
                elDiceOne.classList.remove('show-' + updated_die.originalValue);
                elDiceOne.classList.add('show-' + updated_die.newValue);
            break;
            case 1:
                elDiceTwo.classList.toggle("dice_selected");
                elDiceTwo.classList.remove('show-' + updated_die.originalValue);
                elDiceTwo.classList.add('show-' + updated_die.newValue);
            break;
            case 2:
                elDiceThree.classList.toggle("dice_selected");
                elDiceThree.classList.remove('show-' + updated_die.originalValue);
                elDiceThree.classList.add('show-' + updated_die.newValue);
            break;
            case 3:
                elDiceFour.classList.toggle("dice_selected");
                elDiceFour.classList.remove('show-' + updated_die.originalValue);
                elDiceFour.classList.add('show-' + updated_die.newValue);
            break;
            case 4:
                elDiceFive.classList.toggle("dice_selected");
                elDiceFive.classList.remove('show-' + updated_die.originalValue);
                elDiceFive.classList.add('show-' + updated_die.newValue);
            break;
        }
    }
    selected_dice    = [false,false,false,false,false];
    return false;
}

function select_dice(selected_die){
    switch(selected_die){
        case 'd1':
            elDiceOne.classList.toggle("dice_selected");
            selected_dice[0] = !(selected_dice[0]);
        break;
        case 'd2':
            elDiceTwo.classList.toggle("dice_selected");
            selected_dice[1] = !(selected_dice[1]);
        break;
        case 'd3':
            elDiceThree.classList.toggle("dice_selected");
            selected_dice[2] = !(selected_dice[2]);
        break;
        case 'd4':
            elDiceFour.classList.toggle("dice_selected");
            selected_dice[3] = !(selected_dice[3]);
        break;
        case 'd5':
            elDiceFive.classList.toggle("dice_selected");
            selected_dice[4] = !(selected_dice[4]);
        break;
    }
}