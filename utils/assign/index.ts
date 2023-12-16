type People = {
  id: number;
  name: string;
  email: string;
};

export function assignSecretSanta(people: People[]) {
  people.sort(() => Math.random() - 0.5);
  const assignments = [];
  for (let i = 0; i < people.length; i++) {
    const giver = people[i];
    let receiverIndex = i + 1;
    if (receiverIndex === people.length) {
      receiverIndex = 0;
    }
    const receiver = people[receiverIndex];
    assignments.push({
      giver: giver,
      receiver: receiver,
    });
  }

  return assignments as {
    giver: People;
    receiver: People;
  }[];
}
