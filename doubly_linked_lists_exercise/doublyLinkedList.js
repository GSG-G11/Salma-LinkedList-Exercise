function Node(val) {
  this.val = val;
  this.next = null;
  this.prev = null;
}

function DoublyLinkedList(array = []) {
  this.head = null;
  this.tail = null;
  this.length = 0;

  if (Array.isArray(array)) {
    array.forEach((el) => {
      this.push(el);
    });
  }
}

DoublyLinkedList.prototype.push = function (val) {
  let newNode = new Node(val);
  if (this.head) {
    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
  } else {
    this.head = newNode;
    this.tail = newNode;
  }
  this.length++;
  return this;
};

DoublyLinkedList.prototype.unshift = function (val) {
  let newNode = new Node(val);
  if (this.length === 0) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    let temp = this.head;
    newNode.next = temp;
    this.head = newNode;
  }
  this.length++;
  return this;
};

DoublyLinkedList.prototype.insert = function (index, val) {
  if (index > this.length) return undefined;
  let newNode = new Node(val);
  if (this.length === 0 && index === 0) {
    this.head = newNode;
    this.tail = newNode;
    return this;
  }
  let currentNode = this.head;
  let currentIndex = 0;
  while (currentNode.next) {
    if (index - currentIndex === 1) {
      let temp = currentNode.next;
      temp.prev = newNode;
      currentNode.next = newNode;
      newNode.next = temp;
      break;
    } else {
      currentIndex++;
      currentNode = currentNode.next;
    }
  }
  this.length++;
  return this;
};

DoublyLinkedList.prototype.getNode = function (index) {
  if (this.length < 0 || index > this.length - 1) {
    return null;
  }
  let currentNode = this.head;
  let counter = 0;
  while (currentNode) {
    if (counter === index) {
      break;
    } else {
      counter++;
      currentNode = currentNode.next;
    }
  }
  return currentNode;
};

DoublyLinkedList.prototype.get = function (index) {
  const node = this.getNode(index);
  if (node) return node.val;
  return null;
};

DoublyLinkedList.prototype.set = function (index, val) {
  if (this.length < 0 || index > this.length - 1) return undefined;
  let currentNode = this.getNode(index);
  currentNode.val = val;
  return currentNode;
};

DoublyLinkedList.prototype.pop = function () {
  if (this.length <= 0) return undefined;
  if (this.length > 0) {
    let last = this.tail.val;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      let temp = this.tail.prev;
      this.tail.prev.next = null;
      this.tail = temp;
    }
    this.length--;
    return last;
  }
};

DoublyLinkedList.prototype.shift = function () {
  if (this.length === 0) return undefined;
  let temp = this.head;
  this.head = this.head.next;
  this.length--;
  return temp.val;
};

DoublyLinkedList.prototype.remove = function (index) {
  if (index > this.length) return undefined;
  const currentNode = this.getNode(index);
  const prevNode = currentNode.prev;
  const nextNode = currentNode.next;

  prevNode.next = currentNode.next;
  nextNode.pre = prevNode;

  this.length--;
  return currentNode;
};

DoublyLinkedList.prototype.reverse = function () {
  let temp = null;
  let current = this.head;
  this.tail = this.head;
  while (current != null) {
    temp = current.prev;
    current.prev = current.next;
    current.next = temp;
    current = current.prev;
  }
  if (temp != null) this.head = temp.prev;
};
