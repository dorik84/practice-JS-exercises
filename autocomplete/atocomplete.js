class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Autocomplete {
  constructor() {
    this.root = new TrieNode();
  }

  addWord(word, node = this.root) {
    if (!word) {
      node.isEndOfWord = true;
      return;
    }
    if (!node.children.has(word[0])) {
      node.children.set(word[0], new TrieNode());
    }
    this.addWord(word.slice(1), node.children.get(word[0]));
  }

  startsWith(prefix, node = this.root) {
    if (prefix == "") {
      return true;
    }
    if (!node.children.has(prefix[0])) {
      return false;
    }
    return this.startsWith(prefix.slice(1), node.children.get(prefix[0]));
  }

  suggestWords(prefix, limit = 10) {
    const suggestions = [];

    const bfs = (prefix, word, node) => {
      if (suggestions.length >= limit) {
        return;
      }

      if (prefix === "") {
        if (node.isEndOfWord === true) {
          suggestions.push(word);
        }

        for (let [char, n] of node.children) {
          bfs("", word + char, n);
        }
      } else {
        bfs(prefix.slice(1), word + prefix[0], node.children.get(prefix[0]));
      }
    };

    bfs(prefix, "", this.root);
    return suggestions;
  }
}

const a = new Autocomplete();
a.addWord("abc");
a.addWord("abd");
a.addWord("acv");
console.log(a.startsWith("ab"));
console.log("__________");
console.log(a.suggestWords("a", 2));
