/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
    if (!this.root.left || !this.root.right) return 1;
    let queue = [this.root];
    let minDepth = 0;

    while (queue.length > 0) {
      minDepth++;
      let level = queue.length;
      for (let i = 0; i < level; i++) {
        let node = queue.shift();

        if (!node.left && !node.right) {
          return minDepth;
        }

        if (node.right !== null) {
          queue.push(node.right);
        }
        if (node.left !== null) {
          queue.push(node.left);
        }
      }
    }
    return minDepth;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;
    if (!this.root.left || !this.root.right) return 1;

    let queue = [this.root];
    let maxDepth = 0;

    while (queue.length > 0) {
      maxDepth++;
      let level = queue.length;
      for (let i = 0; i < level; i++) {
        let node = queue.shift();

        if (node.right !== null) {
          queue.push(node.right);
        }
        if (node.left !== null) {
          queue.push(node.left);
        }
      }
    }
    return maxDepth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   *The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;

    function maxSumHelper(node) {
      if (node === null) return 0;
      const leftSum = maxSumHelper(node.left);
      const rightSum = maxSumHelper(node.right);
      result = Math.max(result, node.val + leftSum + rightSum);
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    maxSumHelper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let nodeStack = [this.root];
    let nextLowest = Infinity;
    while (nodeStack.length) {
      let currVal = nodeStack.pop();
      if (currVal.val > lowerBound && currVal.val < nextLowest) {
        nextLowest = currVal.val;
      }
      if (currVal.left) {
        nodeStack.push(currVal.left);
      }
      if (currVal.right) {
        nodeStack.push(currVal.right);
      }
    }
    return nextLowest === Infinity ? null : nextLowest;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root) return 0;
    if (!this.root.left || !this.root.right) return 1;

    let queue = [this.root];

    while (queue.length > 0) {
      let level = queue.length;
      // check if cousins
      if (this.cousinCheck(node1.val, node2.val, queue)) {
        return true;
      }

      // else go to next level
      for (let i = 0; i < level; i++) {
        let node = queue.shift();

        if (node.right !== null) {
          queue.push(node.right);
        }
        if (node.left !== null) {
          queue.push(node.left);
        }
      }
    }

    return false;
  }

  cousinCheck(node1, node2, queue) {
    let tempArr = [];

    for (let node of queue) {
      tempArr.push(node.val);
    }

    if (tempArr.indexOf(node1) !== -1 && tempArr.indexOf(node2) !== -1) {
      return true;
    }
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    console.log(tree);
    return JSON.stringify(tree);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(treeString) {
    let jsonedStr = JSON.parse(treeString);
    let tree = new BinaryTree(jsonedStr.root);
    console.log(tree);
    // let nodeStack = []
    // let nodeQueue = [treeString]
    // while (nodeQueue.length)
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {}
}

// let node6 = new BinaryTreeNode(1);
// let node5 = new BinaryTreeNode(1);
// let node4 = new BinaryTreeNode(2);
// let node3 = new BinaryTreeNode(3, node4, node6);
// let node2 = new BinaryTreeNode(5, node3, node5);
// let node1 = new BinaryTreeNode(5);
// let root = new BinaryTreeNode(6, node1, node2);
// largeTree = new BinaryTree(root);

// console.log(largeTree.minDepth());
// console.log(largeTree.maxDepth());
// console.log(largeTree.maxSum());
// console.log(largeTree.nextLarger(-10));

let n7 = new BinaryTreeNode(7);
let n6 = new BinaryTreeNode(6);
let n5 = new BinaryTreeNode(5);
let n4 = new BinaryTreeNode(4);
let n3 = new BinaryTreeNode(3, n6, n7);
let n2 = new BinaryTreeNode(2, n4, n5);
let root = new BinaryTreeNode(1, n2, n3);
let tree = new BinaryTree(root);

let binTreeString = BinaryTree.serialize(tree);
console.log(binTreeString);
console.log("***********");
BinaryTree.deserialize(binTreeString);

module.exports = { BinaryTree, BinaryTreeNode };
