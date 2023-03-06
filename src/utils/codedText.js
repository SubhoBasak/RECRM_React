export function genderCodedText(c) {
  switch (c) {
    case 1:
      return "Male";
    case 2:
      return "Female";
    default:
      return "Other";
  }
}

export function sourceCodedText(c) {
  switch (c) {
    case 1:
      return "Direct";
    case 2:
      return "Agent";
    case 3:
      return "Website";
    case 4:
      return "Social Media";
    case 5:
      return "TV & Newspaper";
    default:
      return "Other";
  }
}
