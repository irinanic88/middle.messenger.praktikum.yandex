import { faker } from '@faker-js/faker';


type Message = {
  messageId: string;
  senderId: string;
  text: string;
  timestamp: string;
};


export function generateContacts(count = 5) {
  const possibleTags = ['literature', 'philosophy', 'technology', 'science', 'art', 'music'];

  const contacts: {
    avatar: string;
    chatName:string;
    name: string;
    userName: string;
    tags: string[],
  }[] = [];

  for (let i = 0; i < count; i++) {
    const tagsCount = faker.number.int({ min: 1, max: 3 });
    const tags = faker.helpers.uniqueArray(possibleTags, tagsCount);

    contacts.push({
      avatar: '/icons/cat_icon_2.png',
      chatName: faker.company.catchPhrase(),
      name: faker.person.fullName(),
      userName: faker.internet.userName(),
      tags: tags,
    });
  }

  return contacts;
}

export function generateMessages(count = 20) {
  const senderAvatars: Record<string, string> = {
    u1: '/icons/cat_icon_1.png',
    u2: '/icons/cat_icon_2.png',
  };

  const senderIds = ['u1', 'u2'];

  return Array.from({ length: count }).map((_, index) => {
    const senderId = senderIds[index % 2];
    return {
      messageId: `m${String(index + 1).padStart(3, '0')}`,
      senderId,
      avatar: senderAvatars[senderId],
      text: faker.lorem.sentence(),
    };
  });
}


