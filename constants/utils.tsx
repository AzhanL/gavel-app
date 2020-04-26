// Capitalize first letter only of word
export const capitalizeFirstLetters = (value: string, delimeter: string = ' '): string => {
  // Split the string on the delimeter
  let split_string = value.split(delimeter)
  // Return value
  let return_val = ""

  // Capitalize right after the delimeter
  split_string.forEach((part, i) => {
    // Lower case everything
    let new_part = part.toLowerCase().trim()
    // Capitalize the first letter and add the word
    return_val += new_part.charAt(0).toUpperCase() + new_part.slice(1)

    // Add the necessary delimeter between and reconstructed
    if (split_string.length > 1 && (i+1) <= split_string.length) {
      return_val += delimeter
    }
  })

  return return_val
}

// Returns a fullname in format "FirstName LastName" from "LastName, FirstName"
export const fullname = (comma_seperated_name: string, reverse=false) => {
  let split_name = comma_seperated_name.split(",");
  if (reverse) {
    split_name = split_name.reverse()
  }
  let full_name = "";
  split_name.forEach(namePart => {
    full_name += (capitalizeFirstLetters(namePart));
  });
  if (full_name.trim() === "") {
    return "Not Available";
  } else return full_name.trim();
};

export const firstName = (comma_seperated_name: string) => {
  let split_name_length: number = comma_seperated_name.split(',').length;
  let split_name = comma_seperated_name.split(',');
  return split_name[0] == '' ? split_name[split_name_length] : split_name[0];
}