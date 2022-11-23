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
        this.#_value = Math.floor(Math.random() * 101) % 6 + 1;
    }

    setValue(value){
        this.#_value=value;
    }

}



class Hand {
    #held_dice = []; //vector

    constructor() {
        for (let i = 0; i < 5; i++) {
            var die = new Dice({ position: i });
            this.#held_dice.push(die);
        }
    }

    roll_selected_dice(array_of_selected_dice_ints){
        array_of_selected_dice_ints.forEach(index =>{
            this.#held_dice[index].roll();
        });
        // for(selected_die_int of array_of_selected_dice_ints){
        //     this.#held_dice[selected_die_int].roll();
        // }
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
        let kind = row == 3?

        for(i in arry_dice_value_counts){

        }

        return false;
    }

    find_playable_rows(hand){
        let arry_sorted_dice = hand.sort_dice();
        let arry_playable_rows = []; //{row: 1, score: 1} array of objects containing the row and calculated score
        let arry_dice_value_counts = Array(6).fill(0);

        let score=0;
        let total_dice_value=0;

        console.log("Sorted Dice: ", arry_sorted_dice);

        for(const die of arry_sorted_dice){
            let die_value = die.value;
            // console.log("Die Value: ", die)
            total_dice_value+=die_value;
            arry_dice_value_counts[die_value-1]++;
        }


        for(let i = 0; i < this.#scores.length; i++){
            if(this.#scores[i] != 0)
                continue;

            if(0 <= i && i < 6){
                score = arry_dice_value_counts[i] * (i+1);
            } else if(5 < i && i < 8){
                if(calc_of_a_kind_score(i, arry_dice_value_counts))
                    score = total_dice_value;
            } else if(i == 8){
                score = calc_full_house_score(i, arry_dice_value_counts);
            } else if(8 < i && i < 11){
                score = calc_straight_score(i, arry_dice_value_counts);
            } else if(i == 11){
                score = total_dice_value;
            } else {
                score = calc_yahtzee_score();
            }
            
            if(score > 0)
                arry_playable_rows.push({row: i, score: score});
            
        }

        return arry_playable_rows;
        console.log(arry_dice_value_counts);
    }
}


function test_find_playable_rows(){
    var game = new Game();
    var hand = new Hand();
    
    hand.get_held_die(0).setValue(6);
    hand.get_held_die(1).setValue(6);
    hand.get_held_die(2).setValue(6);
    hand.get_held_die(3).setValue(2);
    hand.get_held_die(4).setValue(1);
    
    hand.show();

    game.find_playable_rows(hand);
    
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