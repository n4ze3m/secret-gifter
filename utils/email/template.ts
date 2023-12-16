export const TEMPLATE = `<html>
<head>
  <title>Secret Santa</title>
</head>
<body style="background-color: #f2f2f2; color: #144941; font-family: 'Comic Sans MS', sans-serif;">
  <div style="background-color: #cc4125; padding: 20px; border-radius: 10px;">
    <h1 style="font-size: 32px; color: #fff; text-align: center;">Secret Santa!</h1>
  </div>
  <div style="margin: 20px; background-color: #fff; padding: 20px; border: 5px solid #cc4125; border-radius: 10px;">
    <p style="font-size: 18px;">Ho ho ho! 'Tis the season for giving. As part of this year's Secret Santa, you are Santa to <span style="color: #cc4125; font-weight: 700;">{{recipient_name}}</span> this year.</p>
    <p style="font-size: 18px;">The 🎅🏻 <span style="color: green; font-weight: 700;">budget</span> for this gift exchange is <b style="font-size: 24px;">{{budget}}</b> and we will be celebrating together on <span style="color: #cc4125; font-weight: 700;">{{event_date}}</span>.</p>
    <p style="font-size: 18px;">Please keep the identity of your recipient a secret until the big reveal! Get creative, thoughtful, or even humorous with your gift within the set budget. Most importantly, embrace the holiday spirit of joy and giving!</p>
  </div>
  <p style="font-size: 20px; color: #144941; text-align: center;">🎄 Merry Christmas! 🎄 <br>Secret Gifter 🎁</p>
</body>
</html>
`;

export const htmlTemplate = (
  recipient_name: string,
  budget: string,
  event_date: string
) => {
  return TEMPLATE.replace("{{recipient_name}}", recipient_name)
    .replace("{{budget}}", budget)
    .replace("{{event_date}}", event_date);
};
