/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) return 0;
    const nodeStack = [this.root];
    let total = 0;
    while (nodeStack.length) {
      const currVal = nodeStack.pop();
      total += currVal.val;
      for (let child of currVal.children) {
        nodeStack.push(child);
      }
    }
    return total;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;
    const nodeStack = [this.root];
    let count = 0;
    while (nodeStack.length) {
      const currVal = nodeStack.pop();
      if (currVal.val % 2 === 0) {
        count++;
      }
      for (let child of currVal.children) {
        nodeStack.push(child);
      }
    }
    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound = 0) {
    if (!this.root) return 0;
    const nodeStack = [this.root];
    let greaterThan = 0;
    while (nodeStack.length) {
      const currVal = nodeStack.pop();
      if (lowerBound < currVal.val) {
        greaterThan++;
      }
      for (let child of currVal.children) {
        nodeStack.push(child);
      }
    }

    return greaterThan;
  }
}

let n = new TreeNode(1);
let n2 = new TreeNode(2);
let n3 = new TreeNode(3);
let n4 = new TreeNode(4);
let n5 = new TreeNode(5);
let n6 = new TreeNode(6);
let n7 = new TreeNode(7);
let n8 = new TreeNode(8);

n.children = [n2, n3, n4];

n4.children.push(n5, n6);
n6.children.push(n7);
n7.children.push(n8);

largeTree = new Tree(n);
tree8 = new Tree();

console.log(largeTree.sumValues());
console.log(largeTree.countEvens());
console.log(largeTree.numGreater(8));
console.log(tree8.numGreater(0));

module.exports = { Tree, TreeNode };
