class Dice {

    // DATA MEMBERS
    // #_position;     //int
    #_value;        //int
    // #_is_playable;  //bool

    // MEMBER FUNCTIONS

    constructor({ position }) {
        // this.#_position     = position;
        this.#_value = Math.floor(Math.random() * 101) % 6 + 1;
        // this.#_is_playable  = true;
        console.log("New Dice value: ", this.#_value);
    }

    get value() {
        return this.#_value;
    }

    get_value(){
        return this.#_value;
    }

    roll() {
        var value = Math.floor(Math.random() * 101) % 6 + 1;
        this.#_value = value;
        return value;
    }

    setValue(value){
        this.#_value=value;
    }

}



class Hand {
    #held_dice = []; //vector
    #roll_count = 0;

    constructor() {
        for (let i = 0; i < 5; i++) {
            var die = new Dice({ position: i });
            this.#held_dice.push(die);
        }
        this.#roll_count = 0;
    }

    get_roll_count(){
        return this.#roll_count;
    }

    roll_selected_dice(array_of_selected_dice){
        this.#roll_count++;
        var selected_dice_ints = [];
        var newValue = 0;
        var originalValue = 0;
        var index_value_obj;
        for(var index = 0; index < array_of_selected_dice.length; index++){
            if(array_of_selected_dice[index]){
                originalValue = this.#held_dice[index].get_value();
                newValue = this.#held_dice[index].roll();
                index_value_obj = {index: index, originalValue: originalValue, newValue: newValue};
                selected_dice_ints.push(index_value_obj);
            }
        }
      return selected_dice_ints;
    }

    get_held_die(int_die){
        return this.#held_dice[int_die];
    }

    //Only called when selection is made. Returns a new array of sorted dice
    sort_dice(){
        let i,j,min;
        let sorted_dice = this.#held_dice;

        for(i = 0; i<4; i++){
            min = i;
            for(j=i+1; j<5; j++){
                if(sorted_dice[j].value < sorted_dice[min].value){
                    min = j;
                }
            }

            if(min != i){
                [sorted_dice[min], sorted_dice[i]] = [sorted_dice[i], sorted_dice[min]] 
            }
        }
        return sorted_dice;
    }

    show(){
       this.#held_dice.forEach(die => {
        console.log(die.value)
       });
       console.log('\n');
    }


}

/**
int ONES = 0;
int TWOS = 1;
int THREES = 2;
int FOURS = 3;
int FIVES = 4;
int SIXES = 5;
int THREE_OF_KIND = 6;
int FOUR_OF_KIND = 7;
int FULL_HOUSE = 8;
int SMALL_STRAIGHT = 9;
int LARGE_STRAIGHT = 10;
int CHANCE = 11;
int YAHTZEE = 12;
 */

class Game {
    #scores;
    #rows_played_count;

    constructor(){
        this.#scores = Array(13).fill(0);
        this.#rows_played_count = 0;
    }

    calc_of_a_kind_score(row, arry_dice_value_counts){
        let kind = row == 6? 3:4;
        // console.log("In calc_of_a_kind_score", {row: row, kind: kind, arry: arry_dice_value_counts})
        for(let i of arry_dice_value_counts){
            if(i == kind){
                // console.log("i == kind", {i: i, kind: kind})
                return true;
            }
        }
        
        return false;
    }

    //Modifies passed in valid_rows
    find_valid_rows(valid_rows, arry_dice_value_counts){

        let straightCount = 0;
        let dice_value_count = 0;

        for(let i = 0; i<arry_dice_value_counts.length; i++){
            dice_value_count = arry_dice_value_counts[i];
            switch(i){
                case 0:
                    valid_rows.one = dice_value_count > 0? {valid:true, score:(dice_value_count*(i+1))} : {valid:false, score:0};
                break;
                case 1:
                    valid_rows.two =  dice_value_count > 0? {valid:true, score:(dice_value_count*(i+1))} : {valid:false, score:0};
                break;
                case 2:
                    valid_rows.three = dice_value_count > 0? {valid:true, score:(dice_value_count*(i+1))} : {valid:false, score:0};
                break;
                case 3:
                    valid_rows.four = dice_value_count > 0? {valid:true, score:(dice_value_count*(i+1))} : {valid:false, score:0};
                break;
                case 4:
                    valid_rows.five = dice_value_count > 0? {valid:true, score:(dice_value_count*(i+1))} : {valid:false, score:0};
                    
                break;
                case 5:
                    valid_rows.six = dice_value_count > 0? {valid:true, score:(dice_value_count*(i+1))} : {valid:false, score:0};
                break;
            }
            switch(dice_value_count){
                case 1:
                    straightCount++;
                break;
                case 2:
                    valid_rows.twoKind.valid = true;
                break;
                case 3:
                    valid_rows.threeKind.valid = true;
                break;
                case 4:
                    valid_rows.fourKind.valid = true;
                break;
                case 5:
                    valid_rows.yahtzee.valid = true;
                    valid_rows.yahtzee.score = 50;
                break;
            }
        }
        if(straightCount >= 4){
            valid_rows.smallStraight.valid = true;
            valid_rows.smallStraight.score = 30;
        } else if(straightCount == 5){
            valid_rows.largeStaight.valid = true;
            valid_rows.largeStaight.score = 40 ;
        }
        if(valid_rows.twoKind.valid && valid_rows.threeKind.valid){
            valid_rows.fullHouse.valid = true;
            valid_rows.fullHouse.score = 25;
        }

        return valid_rows;

    }

    find_playable_rows(hand){
        let arry_sorted_dice = hand.sort_dice();
        let arry_dice_value_counts = Array(6).fill(0);

        let total_dice_value=0;

        for(const die of arry_sorted_dice){

            let die_value = die.value;
            
            total_dice_value+=die_value;
            arry_dice_value_counts[die_value-1]++;
        }

        let valid_rows = {
            one:{valid:false, score:0},
            two:{valid:false, score:0},
            three:{valid:false, score:0},
            four:{valid:false, score:0},
            five:{valid:false, score:0},
            six:{valid:false, score:0},
            twoKind: {valid:false, score:0},
            threeKind:{valid:false, score:total_dice_value},
            fourKind:{valid:false, score:total_dice_value},
            smallStraight:{valid:false, score:0},
            largeStaight:{valid:false, score:0},
            yahtzee:{valid:false, score:0},
            fullHouse:{valid:false, score:0}
        }

        this.find_valid_rows(valid_rows, arry_dice_value_counts);

        return valid_rows;
    }
}


function test_find_playable_rows(){
    var game = new Game();
    var hand = new Hand();
    
    hand.get_held_die(0).setValue(1);
    hand.get_held_die(1).setValue(2);
    hand.get_held_die(2).setValue(3);
    hand.get_held_die(3).setValue(4);
    hand.get_held_die(4).setValue(5);
    
    hand.show();

    var playable_rows = game.find_playable_rows(hand);
    console.log(playable_rows);


}

function test_sort_dice(){

    var test = new Hand();
    
    test.get_held_die(0).setValue(6);
    test.get_held_die(1).setValue(6);
    test.get_held_die(2).setValue(6);
    test.get_held_die(3).setValue(2);
    test.get_held_die(4).setValue(1);
    console.log("presort ",test);
    
    test.show();

    let p = test.sort_dice();
    
    console.log(p);
}

function test_roll_selected_dice(){

    var test = new Hand();
    test.get_held_die(0).setValue(6);
    test.get_held_die(1).setValue(6);
    test.get_held_die(2).setValue(6);
    test.get_held_die(3).setValue(6);
    test.get_held_die(4).setValue(6);
    
    test.show();
    arry = [0,2,4];
    test.roll_selected_dice(arry);
    
    test.show();
}

test_find_playable_rows();
// test_sort_dice();
// test_roll_selected_dice();