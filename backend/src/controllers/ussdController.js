export const handleUSSD = (req, res) => {
  const { text, phoneNumber } = req.body;

  let response = "";

  if (text === "") {
    response = "CON Welcome to EcoBarter!\n1. Report Waste\n2. Check Rewards";
  } else if (text === "1") {
    response = "CON Enter waste type (plastic, bottle, etc):";
  } else if (text.startsWith("1*")) {
    response = "END Thank you! Your waste has been logged.";
  } else if (text === "2") {
    response = "END You have 20 reward points.";
  } else {
    response = "END Invalid choice.";
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
};
