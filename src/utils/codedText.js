export function genderCodedText(c) {
  switch (Number.parseInt(c)) {
    case 1:
      return "Male";
    case 2:
      return "Female";
    case 3:
      return "Other";
    default:
      return "Not mentioned";
  }
}

export function sourceCodedText(c) {
  switch (Number.parseInt(c)) {
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
    case 6:
      return "Other";
    default:
      return "Not mentioned";
  }
}

export function categoryCodedText(c) {
  switch (Number.parseInt(c)) {
    case 1:
      return "Residential";
    case 2:
      return "Commercial";
    case 3:
      return "Other";
    default:
      return "Not mentioned";
  }
}

export function mediumCodedText(c) {
  switch (Number.parseInt(c)) {
    case 1:
      return "Voice Call";
    case 2:
      return "SMS";
    case 3:
      return "Email";
    case 4:
      return "WhatsApp";
    case 5:
      return "Facebok";
    case 6:
      return "Instagram";
    case 7:
      return "LinkedIn";
    case 8:
      return "Other";
    default:
      return "Not mentioned";
  }
}
