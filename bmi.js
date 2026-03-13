"use strict";
/*******************************************************
 *     bmi.js
 *
 *     Write a small program that calculates the Body Mass Index according to parameters,
 *     given by the user. It should generate a textbased representation like the following:
 *
 *     -----------------------------------------------------
 *     Name:		         :LAST NAME:, :First name:
 *     -----------------------------------------------------
 *     Age:                  :age: Years
 *     Height:		         :size:m (i.e. 1,81m)
 *     Weight:	             :weight: kg
 *     Basal Metabolic Rate: <bmr> kcal
 *     Body Mass Index:	     <bmi>
 *     Normal Weight:        <Yes/No>
 *     Danger:		         <Yes/No>
 *     -----------------------------------------------------
 *
 *     To do so, collect data from your users. Values within :colons: are (formatted) user-inputs;
 *     values within <angle brackets> have to be calculated by your software.
 *
 *     You - 2026-03-05
 *******************************************************/

/*
 * TODO: Declare and assign all necessary constants and variables with user input.
 * Make sure, to help your users understand what they need to type in, by using clear prompt-instructions.
 */

const LINE = "-----------------------------------------------------";
let bmr, bmi, normal, danger;
let firstName, lastName, age, size, weight;
firstName = prompt("Please enter your first name");
lastName = prompt("Please enter your last name");
age = Number(prompt("Please enter your age"));
size = Number(prompt("Please enter your size(in m)").replaceAll(/[.,m]/g, ""));
weight = prompt("Please enter your weight(in kg)").replaceAll(/[kg]/g, "");
if(weight.search(/[.,]/g) != -1){
    weight = Number(weight.slice(0, weight.search(/[.,]/g))) +
        Number(weight.slice(weight.search(/[.,]/g) + 1) * 0.1 ** (weight.length - weight.search(/[.,]/g) - 1));
}else{
    weight = Number(weight);
}

/**
 * Formulas:
 *
 * BMR = A + B × weight [kg] + C × height [cm] − D × age [years]
 *      For women: A=655, B=10, C=2, D=6
 *      For men: A=66, B=14, C=5, D=7
 *
 * BMI = (10000 * weight [kg]) / height² [cm]
 *
 * Normal Weight = Any BMI between 18 and 25 (including 18 and 25).
 * Danger = Any BMI lower than 16 or 30+.
 **/

/*
 * TODO: To calculate the bmr; ask your users which calculation method they would prefer (male or female).
 * Be careful. Users make typos. Make sure that you have a valid answer before moving on.
 */

let gender;
gender = prompt("For a correct basal metabolic rate calculation please enter your gender. Press m for male or f for female");
while(gender.toLowerCase() != "m" && gender.toLowerCase() != "f"){
    prompt("You made an invalid input. Press m for male or f for female");
}
// TODO: To calculate the bmi, use the given formula with all the input you have collected.

bmi = (10000 * weight) / size**2;

if(gender == "m"){
    bmr = 66 + 14 * weight + 5 * size - 7 * age;
}else{
    bmr = 665 + 10 * weight + 2 * size - 6 * age;
}

// TODO: Once you have the bmi, determine whether or not the weight is normal and if the condition is dangerous.

if(bmi < 16 || bmi > 30){
    danger = true;
    normal = false;
}else if(bmi >  25|| bmi < 18){
    danger = false;
    normal = false;
}else {
    danger = false;
    normal = true;
}

/*
 * TODO: Create the correct output from all your data. Make sure to stick to the promised format! NO EXCEPTIONS!
 * You can use \t to add a Tab-Space. Once your program is completed, the output in the browser console should
 * look EXACTLY like the Example-Output above (with different data, of course).
 *
 *  Valid Example:
 *   -----------------------------------------------------
 *   Name:		           NEUWERSCH, Matthias
 *   -----------------------------------------------------
 *   Age:                  35 Years
 *   Height:               1,78m
 *   Weight:               77 kg
 *   Basal Metabolic Rate: 1789 kcal
 *   Body Mass Index:      24.302487059714682
 *   Normal Weight:        Yes
 *   Danger:               No
 *   -----------------------------------------------------
 */

console.log(LINE);// Logs the dashed-line.
console.log("Name:		          " + lastName.toUpperCase() + ", " + firstName);
console.log(LINE);
console.log("Age:                  " + age + " Years");
console.log("Height:               " + ((size - size % 100) / 100) + "," + size % 100 + "m");
console.log("Weight:               " + Math.round(weight) + " kg");
console.log("Basal Metabolic Rate: " + Math.round(bmr) + " kcal");
console.log("Body Mass Index:      " + bmi)
normal ? console.log("Normal Weight:        Yes") : console.log("Normal Weight:        No")
danger ? console.log("Danger:               Yes") : console.log("Danger:               No")
console.log(LINE)
/*
 * TODO: Make sure to TEST YOUR SOFTWARE! Does it work, when People are smaller than 1 meter? Or taller than 2?
 * Tip: An 18-Year old Woman, sized 160cm with 60 kg should have a BMR of 1467 kcal and a BMI of 23.4375.
 */