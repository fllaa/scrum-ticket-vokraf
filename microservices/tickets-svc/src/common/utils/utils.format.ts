export class UtilsFormat {
  static templateText(text: string, data: string[]) {
    // Check if the number of placeholders matches the data length
    if (text.split(/\$\d+/).length - 1 !== data.length) {
      throw new Error("Number of placeholders doesn't match data length");
    }

    // Use a loop for efficient replacement
    for (let i = 0; i < data.length; i++) {
      const placeholder = `$${i + 1}`; // Construct placeholder dynamically
      text = text.replace(placeholder, data[i]);
    }

    return text;
  }
}
