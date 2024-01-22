class Hashmap {
  constructor() {
    this.buckets = [];
    this.capacity = 16;
    this.loadFactor = 0.75;
  }

  hash(input) {
    // Hash the input text
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < input.length; i++) {
      hashCode = primeNumber * hashCode + input.charCodeAt(i);
    }

    hashCode %= this.capacity;
    return hashCode;
  }

  set(key, value) {
    // Set key:value inside hashmap array
    const index = this.hash(key);

    this.buckets[index] = { [key]: value };

    // Check if capacity requires increasing
    const numberOfKeys = this.length();

    if (numberOfKeys / this.capacity >= this.loadFactor) {
      this.capacity *= 2;
    }
  }

  get(key) {
    // Get value of key
    const index = this.hash(key);
    if (this.buckets[index]) {
      return this.buckets[index][key];
    }
    return null;
  }

  has(key) {
    // Check if key is in hashmap
    const index = this.hash(key);
    if (this.buckets[index] == undefined) {
      return false;
    }
    if (Object.keys(this.buckets[index]) == key) {
      return true;
    }
    return false;
  }

  remove(key) {
    // Remove key from hashmap
    const index = this.hash(key);
    if (this.has(key)) {
      this.buckets[index] = undefined;
      return true;
    }
    return false;
  }

  length() {
    // Return number of stored keys
    let length = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        length += 1;
      }
    }
    return length;
  }

  clear() {
    // Clear all entries in hashmap
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = undefined;
    }
  }

  keys() {
    const keysList = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) keysList.push(...Object.keys(this.buckets[i]));
    }

    return keysList;
  }

  values() {
    const valuesList = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        const key = Object.keys(this.buckets[i]);
        valuesList.push(this.buckets[i][key]);
      }
    }
    return valuesList;
  }

  entries() {
    const entriesArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        const concatArray = [];
        const key = Object.keys(this.buckets[i]);
        const value = this.buckets[i][key];
        concatArray.push(...key);
        concatArray.push(value);
        entriesArray.push(concatArray);
      }
    }

    return entriesArray;
  }
}
