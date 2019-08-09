class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      count++;
    }

    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let currentVampire1 = this;
    let currentVampire2 = vampire;
    let commonAncestor = null;
    let potentialAncestor = null;

    if (currentVampire1.creator === null) {
      return currentVampire1;
    }

    if (currentVampire2.creator === null) {
      return currentVampire2;
    }

    if (currentVampire1.numberOfVampiresFromOriginal < currentVampire2.numberOfVampiresFromOriginal) {
      potentialAncestor = currentVampire2;
    }

    if (currentVampire1.numberOfVampiresFromOriginal > currentVampire2.numberOfVampiresFromOriginal) {
      potentialAncestor = currentVampire1;
    }

    while (currentVampire1.numberOfVampiresFromOriginal !== currentVampire2.numberOfVampiresFromOriginal) {
      if (currentVampire1.numberOfVampiresFromOriginal < currentVampire2.numberOfVampiresFromOriginal) {
        currentVampire1 = currentVampire1.creator;
      } else  {
        currentVampire2 = currentVampire2.creator;
      }
    }

    if (currentVampire1.numberOfVampiresFromOriginal === currentVampire2.numberOfVampiresFromOriginal) {
      if (currentVampire1.name === currentVampire2.name) {
        return potentialAncestor;
      } else if (currentVampire1.creator === currentVampire2.creator) {
        return currentVampire1.creator;
      } else {
        while (currentVampire1.creator !== currentVampire2.creator) {
          currentVampire1 = currentVampire1.creator;
          currentVampire2 = currentVampire2.creator;
        }
        return currentVampire1.creator;
      }
    }

    if (currentVampire1.creator === currentVampire2.creator) {
      commonAncestor = currentVampire1.creator;
    }

    return commonAncestor;
  }
}

module.exports = Vampire;

