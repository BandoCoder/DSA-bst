class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    (this.key = key),
      (this.value = value),
      (this.parent = parent),
      (this.left = null),
      (this.right = null);
  }

  // Services
  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }
  find(key) {
    if (this.key == key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error("Key Error");
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key Error");
    }
  }

  //helpers
  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  _isValidBST(node, min, max) {
    if (node === null) {
      return true;
    }
    if ((max !== null && node.val > max) || (min !== null && node.val < min)) {
      return false;
    }

    if (
      !this._isValidBST(node.left, min, node.val) ||
      !this._isValidBST(node.right, node.val, max)
    ) {
      return false;
    }
    return true;
  }

  validate(node) {
    return this._isValidBST(node, null, null);
  }

  maxHeight(node) {
    if (!node) return 0;
    let leftHeight = this.maxHeight(node.left);
    let rightHeight = this.maxHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  minHeight(node) {
    if (!node) return 0;
    let leftHeight = this.minHeight(node.left);
    let rightHeight = this.minHeight(node.right);

    return Math.min(leftHeight, rightHeight) + 1;
  }

  isBalanced(node) {
    if (typeof node === "undefined") {
      return undefined;
    }
    return this.maxHeight(node) - this.minHeight(node) >= 1;
  }

  nthLargest(node, k) {
    let result = null;
    let count = 0;

    while (node !== null) {
      if (node.right === null) {
        count++;
        if (count === k) {
          return (result = node);
        }
        node = node.left;
      } else {
        const successor = node.right;
        while (successor.left !== null && successor.left !== node) {
          successor = successor.left;

          if (successor.left === null) {
            successor.left = node;
            node = node.right;
          } else {
            successor.left = null;
            count++;
            if (count === k) {
              return (result = node);
            }
            node = node.left;
          }
        }
      }
      return result;
    }
  }
}

function main1() {
  //Create BST
  const BST = new BinarySearchTree();

  // Insert
  BST.insert(3);
  BST.insert(1);
  BST.insert(4);
  BST.insert(6);
  BST.insert(9);
  BST.insert(2);
  BST.insert(5);
  BST.insert(7);

  console.log(BST.maxHeight(BST));
  console.log(BST.validate(BST));
  console.log(BST.nthLargest(BST, 3));
  console.log(BST.isBalanced(BST));
  // console.log(BST);
}

main1();

function main2() {
  const BST2 = new BinarySearchTree();

  BST2.insert("E");
  BST2.insert("A");
  BST2.insert("S");
  BST2.insert("Y");
  BST2.insert("Q");
  BST2.insert("U");
  BST2.insert("E");
  BST2.insert("S");
  BST2.insert("T");
  BST2.insert("I");
  BST2.insert("O");
  BST2.insert("N");

  console.log(BST2.maxHeight(BST2));
  console.log(BST2.validate(BST2));
  console.log(BST2.isBalanced(BST2));
  // console.log(BST2);
}

main2();

/* What does this function do and what is the runtime 
function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}

This adds up all the values within a given search tree.
It calls itself twice within the function recursively,
This makes the runtime quadratic O(n^2).

*/
