export class UtilsObject {
  static findPropertyDifferences(
    obj1: Record<string, any>,
    obj2: Record<string, any>,
  ) {
    const differences: Record<string, any> = {};
    for (const key in obj1) {
      if (obj2.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
        differences[key] = [obj1[key], obj2[key]];
      }
    }
    return differences;
  }
}
