var elDiceOne        = document.getElementById('dice1');
var elDiceTwo        = document.getElementById('dice2');
var elDiceThree      = document.getElementById('dice3');
var elDiceFour       = document.getElementById('dice4');
var elDiceFive       = document.getElementById('dice5');

var elComeOut        = document.getElementById('roll');

elDiceOne.onclick    = function(){select_dice('d1');};
elDiceTwo.onclick    = function(){select_dice('d2');};
elDiceThree.onclick  = function(){select_dice('d3');};
elDiceFour.onclick   = function(){select_dice('d4');};
elDiceFive.onclick   = function(){select_dice('d5');};

elComeOut.onclick    = function(){roll_button_clicked();};

var game             = new Game();
var hand             = new Hand();
var selected_dice    = [false,false,false,false,false];

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