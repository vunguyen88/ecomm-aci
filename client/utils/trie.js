function TrieNode(letter) {
    // set up node properties
    this.letter = letter;
    this.prevLetter = null;
    // an object for the following letters
    this.nextLetters = {}; 
    // check whether letter is last of word
    this.isComplete = false; 
    //methods
    this.getWord = getWord;
  
    // iterates through nodes to get word prediction
    function getWord() {
        var node = this;
        var wordLetters = [];
        while (node.prevLetter) {
            wordLetters.unshift(node.letter);
            // set the previous letter as node
            node = node.prevLetter; 
        }
        return wordLetters.join("");
    }
}
  
function Trie() {
    // properties
    this.root = new TrieNode(null);
  
    // method to insert new word in trie
    this.insert = insert;
    // method to check if word exists
    this.contains = contains; 
    // method to find words similar with previous letters
    this.find = find; // 
  
    // insert new word in Trie
    function insert(word) {
        var node = this.root; 
        for (let i = 0; i < word.length; i++) {
            const current_letter = word[i];
            if (!node.nextLetters[current_letter]) {
            // if letter not in next letters then make it node
            node.nextLetters[current_letter] = new TrieNode(current_letter); 
            // if letter not in next letters then add it as a child node
            node.nextLetters[current_letter].prevLetter = node;
            }
            // reset node to current letter & continue iteration
            node = node.nextLetters[current_letter]; 
    
            // check whether whole word is inserted
            if (i === word.length - 1) {
            node.isComplete = true;
            }
        }
    }
  
    // check if word exists
    function contains(word) {
        // set first node to root node
        var node = this.root; 
        for (let i = 0; i < word.length; i++) {
            const current_letter = word[i];
            let next_node = node.nextLetters[current_letter];
            if (next_node) {
                // if letter is one of next letters set it as a next node
                node = next_node;
            } else {
                return false;
            }
        }
        return node.isComplete;
    }
  
    // find words with similar previous letters
    function find(clue_letters) {
        // set first node to root node
        var node = this.root; 
        var output = [];
        for (let i = 0; i < clue_letters.length; i++) {
            const clue_letter = clue_letters[i];
            let next_node = node.nextLetters[clue_letter];
            if (next_node) {
                // if clue letter is one of next letters then set it as next node
                node = next_node;
            } else {
                return output;
            }
        }
    
        // use the last node to find the next possible words
        findAllWords(node, output);
        console.log('output ', output)
        return output;
    }
  
    // function that finds next possible words
    function findAllWords(node, arr) {
        if (node.isComplete) {
            // check if node is end node then get all words and add them to array
            arr.unshift(node.getWord());
        }
    
        // otherwise recursively call the next nodes
        for (var next_letter in node.nextLetters) {
            findAllWords(node.nextLetters[next_letter], arr);
        }
    }
}
  
  export default Trie;
  