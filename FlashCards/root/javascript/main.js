class VocabList{
    vocabList;
    index;
    term;

    constructor(){
        this.vocabList = new Array();
        this.index = 0;
    }

    getList(){
        //returns a list of objects (Vocabs)
        return this.vocabList;
    }
    
    addVocabObj(vocabObj){
        //adds a Vocab to end of Study Set
        this.vocabList.push(vocabObj);
    }
    
    undoAdd(){
        //removes from the back of the list
        this.vocabList.pop();
    }

    getIndex(){
        //This returns the built in counter of the class
        return this.index;
    }

    increaseIndex(){
        //Advances once in the index which corresponds to active cards
        this.index++;
    }

    decreaseIndex(){
        //Reverses once in the index which corresponds to active cards
        this.index--;
    }

    getCurr(){
        //returns an Object (Vocab) at the current index position
        return this.getList()[this.getIndex()]
    }

    getNext(){
        //Returns the next Card
        this.increaseIndex()
        return this.getList()[this.getIndex()]
    }

    getPrev(){
        //Returns the previous Card
        this.decreaseIndex()
        return this.getList()[this.getIndex()]
    }

    objIntoList(){
        //Logs the list of objects to the console.
        let createdList = Array.from(this)
        console.log("Object into List:")
        console.log(createdList)
    }

    getListOfTerms(){
        //Creates and return a list of only the vocab terms
        console.log("GET LIST OF TERMS")
        let listLength = this.vocabList.length
        let listOfTerms = new Array(listLength)

        for (let i = 0; i < listLength; i++) {
            let term = this.getList()[i].getTerm()

            console.log(term)
            listOfTerms.push(term)
        }
        return listOfTerms
    }

    termDoesExist(termToSearch){
        //Searches for a given term and logs whether or not it was found
        let result = this.getListOfTerms().findIndex(x=>x===termToSearch);    
        if (!(result === -1)){
            console.log("It exists!!")
        } else {
            console.log("Does NOT exist!")
        }
    }
}

class Vocab{
    isTerm;
    term;
    definition;

    constructor(term, definition){
        this.term = term;
        this.definition = definition;
        this.isTerm = true;
    }

    getTerm(){
        //returns vocab term
        return this.term;
    }

    setTerm(term){
        //change current term to anything
        this.term = term;
    }

    getDefinition(){
        //returns the vocab defnition 
        return this.definition;
    }

    setDefinition(definition){
        //returns vocab defnition
        this.definition = definition;
    }

    getIsTerm(){
        //returns boolean which indicates which side of card is showing
        return this.isTerm;
    }

    setIsTerm(state = true){
        //By default, this function will set isTerm? to true
        //When parameter is provided will update it to what is expected
        this.isTerm = state
        return this.isTerm;
    }

    alternateIsTerm(){
        //flips the boolean of isTerm true becomes false
        //false becomes true
        this.isTerm = !this.isTerm
        return this.isTerm;
    }
}

class ChangeColor{
    colors;
    index;

    constructor(selector, colorList){
        this.colors = colorList
        this.index = 0
        this.selector = selector
    }

    getColorList(){
        return this.colors
    }

    getColor(){
        return this.colors[this.index]
    }

    nextColor(){
        if (this.index++ == this.getColorList().length){
            this.index = 0
        }
        return this.getColor()
    }

    changeColor(){
        console.log("this is the selector:")
        console.log(this.selector)
        document.querySelector(this.selector).style.color = this.nextColor();
    }
}

/////////////////////////////////////////////////
// ......... START SETUP STUDY SETS .......... //
/////////////////////////////////////////////////

//SET UP THE PORTUGUESE STUDY SET
const portuguese = new VocabList()

const word1 = new Vocab("Hi", "Ola")
const word2 = new Vocab("To Run", "Correr")
const word3 = new Vocab("To Sit", "Sentar")
const word4 = new Vocab("Water Bottle", "Garrafa")
const word5 = new Vocab("Table", "Mesa")

portuguese.addVocabObj(word1)
portuguese.addVocabObj(word2)
portuguese.addVocabObj(word3)
portuguese.addVocabObj(word4)
portuguese.addVocabObj(word5)

//SET UP THE SPANISH STUDY SET
const spanish = new VocabList()

const term1 = new Vocab("Hello", "Hola")
const term2 = new Vocab("To read", "Leer")
const term3 = new Vocab("To feel", "sentir")
const term4 = new Vocab("Keys", "Llaves")
const term5 = new Vocab("House", "Casa")

spanish.addVocabObj(term1)
spanish.addVocabObj(term2)
spanish.addVocabObj(term3)
spanish.addVocabObj(term4)
spanish.addVocabObj(term5)

//SET UP THE ENGLISHVOCAB STUDY SET
const englishVocab = new VocabList()

const thing1 = new Vocab("Quintessential", "Representing the most perfect or typical example of a quality or class.")
const thing2 = new Vocab("Gregarious", "(of a person) fond of company; sociable.")
const thing3 = new Vocab("Magnanimous", "generous or forgiving, especially toward a rival or less powerful person.")
const thing4 = new Vocab("Tactful", "having or showing tact.")
const thing5 = new Vocab("Splendid", "magnificent; very impressive.")

englishVocab.addVocabObj(thing1)
englishVocab.addVocabObj(thing2)
englishVocab.addVocabObj(thing3)
englishVocab.addVocabObj(thing4)
englishVocab.addVocabObj(thing5)
/////////////////////////////////////////////////
// ............END SETUP STUDY SETS .......... //
/////////////////////////////////////////////////

//USE THE DOM (DOCUMENT OBJECT):
let content = document.getElementById("card-content")

//SET UP SEMI-GLOBAL VARIABLES
let vocabListClass;
let searchTerm = "Quintessential"
let colors = ["blue", "red", "white", "yellow", "purple", "green", "black", "orange"]
const colorSet = new ChangeColor("#color-btn", colors)
const colorSet1 = new ChangeColor("#card-content", colors)
const fibonacciList = []

function prepareStudySet(studySet){
    /* 
    prepareStudySet() takes one parameter from the onclick buttons
    studySet cooresponds to a pre-made class
    prepareStudySet calls initStudySet which will update on screen information
    */
    console.log("STUDY SET IN USE: ", studySet)

    if (studySet === "portugueseSet"){
        vocabListClass = portuguese
    } else if (studySet === "spanishSet"){
        vocabListClass = spanish
    } else if (studySet === "englishVocab") {
        vocabListClass = englishVocab
    }

    initStudySet()
}

function initStudySet(){
    /* 
    initStudySet() updates on screen information with the term
    initStudySet() calls termDoesExist() which confirm that a possibly
    necessary term is included.
    */
    content.textContent = vocabListClass.getCurr().getTerm()
    vocabListClass.termDoesExist(searchTerm)
    vocabListClass.objIntoList()
}

function isNotOutOfRangeLower(){
    /* 
    isNotOutOfRangeLower() inhibits user from index out of Range error
    specifically on the LOWER end of the range.
    Displays alert if you reach lower end of range
    */
    if (vocabListClass.getIndex() === 0 ) {
        console.log("false")
        alert("You cannot continue clicking back!")
        return false
    } else {
        console.log("true")
        return true
    }
}

function isNotOutOfRangeUpper(){
    /* 
    isNotOutOfRangeUpper() inhibits user from index out of Range error
    specifically on the UPPER end of the range.
    Displays alert if you reach upper end of range
    */
    if (vocabListClass.getIndex() === vocabListClass.getList().length - 1) {
        console.log("false")
        alert("You've reached the end of your list!")
        return false
    } else {
        console.log("true")
        return true
    }
}

function nextCard(){
    /* 
    nextCard() has error handeling for when no study set is selected
    updates content to next Vocab and displays term.
    Displays alert if no studySet is selected
    Updates isTerm boolean to know what side of card is showing.
    */
    try {
        if (isNotOutOfRangeUpper()){
            content.textContent = vocabListClass.getNext().getTerm()
            vocabListClass.getCurr().setIsTerm()
        }
    } catch(err){
        errorMessage = "ERROR: NO STUDY SET SELECTED - PREVCARD"
        console.log(errorMessage)
        alert(errorMessage)
    }
}

function prevCard(){
    /* 
    prevCard() has error handeling for when no study set is selected
    updates content to previous Vocab and displays term.
    Displays alert if no studySet is selected
    Updates isTerm boolean to know what side of card is showing.
    */
    try {
        if (isNotOutOfRangeLower()){
            content.textContent = vocabListClass.getPrev().getTerm()
            vocabListClass.getCurr().setIsTerm()
        }
    } catch(err){
        errorMessage = "ERROR: NO STUDY SET SELECTED - PREVCARD"
        console.log(errorMessage)
        alert(errorMessage)
    }
}

function flipCard(){
    /* 
    prevCard() has error handeling for when no study set is selected
    displays term when definition is showing and vise-versa
    Displays alert if no studySet is selected
    Updates isTerm boolean to know what side of card is showing.
    */
    try {
        if (vocabListClass.getCurr().getIsTerm()){
            content.textContent = vocabListClass.getList()[vocabListClass.getIndex()].getDefinition()
            vocabListClass.getCurr().alternateIsTerm()
        } else {
            content.textContent = vocabListClass.getList()[vocabListClass.getIndex()].getTerm()
            vocabListClass.getCurr().alternateIsTerm()
        }
    } catch(err) {
        errorMessage = "ERROR: NO STUDY SET SELECTED - PREVCARD"
        console.log(errorMessage)
        alert(errorMessage)
    }
}

function arrayTest(){
    //Uses many of the ES6 Native Array ES6 functions
    basicArray = Array.of(42)
    if (basicArray[0] === 42){
        console.log("Meaning of Life in Array: 42 is 0 index")
    }
}

function changeColor1(){
    colorSet.changeColor()
    colorSet1.changeColor()
}

function fibonacci(num) {
    // Returns fibonacci sequence using recursion
    if(num < 2) {
        return num;
    }
    else {
        return fibonacci(num-1) + fibonacci(num - 2);
    }
}

function fibonacciToList(){
    for (let i = 1; i < 13; i++) {
        let fibonacciSequence = fibonacci(i)
        fibonacciList.push(fibonacciSequence)
    }
    return fibonacciList
}

arrayTest()
console.log()

fibonacciToList()
fibonacciList.push(fibonacciList[fibonacciList.findIndex(x=>x>2)])
fibonacciList.push(fibonacciList[fibonacciList.findIndex(x=>x>5)])
fibonacciList.push(fibonacciList[fibonacciList.findIndex(x=>x>13)])

console.log("Output Fibonacci Using ES6 Find Index", fibonacciToList())