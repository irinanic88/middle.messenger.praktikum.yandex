import { v4 as uuid } from 'uuid';

import { MessagesDictType, UserType } from './src/types/api.types';

export const userMock: UserType = {
  avatar: '/icons/cat_icon_1.png',
  contacts: [
    {
      avatar: '/icons/cat_icon_2.png',
      chatId: 'chat-1a2b3c4d-0001',
      chatName: 'Гении продуктивности',
      name: 'Михаил Гиперответственный',
      tags: ['работа', 'душнила'],
      userName: 'workaholic_mike',
    },
    {
      avatar: '/icons/cat_icon_2.png',
      chatId: 'chat-1a2b3c4d-0002',
      chatName: 'Мемологи-аналитики',
      name: 'Анастасия Ржунемогу',
      tags: ['поржать'],
      userName: 'memer_nastia',
    },
    {
      avatar: '/icons/cat_icon_2.png',
      chatId: 'chat-1a2b3c4d-0003',
      chatName: 'Семейная опера',
      name: 'Тётя Галя',
      tags: ['семья'],
      userName: 'aunt_galya',
    },
    {
      avatar: '/icons/cat_icon_2.png',
      chatId: 'chat-1a2b3c4d-0004',
      chatName: 'Свиданки и булочки',
      name: 'Серёжа Романтик',
      tags: ['тиндер'],
      userName: 'tinder_serge',
    },
    {
      avatar: '/icons/cat_icon_2.png',
      chatId: 'chat-1a2b3c4d-0005',
      chatName: 'Разбор полётов',
      name: 'Влад Занудов',
      tags: ['душнила', 'работа'],
      userName: 'vladislav_zzz',
    },
    {
      avatar: '/icons/cat_icon_2.png',
      chatId: 'chat-1a2b3c4d-0006',
      chatName: 'Хто ты вообще?',
      name: 'Таинственный Хомяк',
      tags: ['кто_это'],
      userName: 'unknown_hamster',
    },
    {
      avatar: '/icons/cat_icon_2.png',
      chatId: 'chat-1a2b3c4d-0007',
      chatName: 'Юмор из 2007',
      name: 'Славик Шутканул',
      tags: ['поржать', 'семья'],
      userName: 'slavik_mem',
    },
    {
      avatar: '/icons/cat_icon_2.png',
      chatId: 'chat-1a2b3c4d-0008',
      chatName: 'Котики и дедлайны',
      name: 'Катя ВсёУспею',
      tags: ['работа', 'семья'],
      userName: 'katya_rush',
    },
  ],
  display_name: 'Шутник и весельчак',
  email: 'igor.veselkin@example.com',
  first_name: 'Игорь',
  id: 'main-user-id',
  login: 'funny_igor',
  password: 'мега_Cекрет123',
  phone: '+79111234567',
  second_name: 'Весёлкин',
};

export const messagesDictMock: MessagesDictType = {
  'chat-1a2b3c4d-0001': [
    {
      chatId: 'chat-1a2b3c4d-0001', messageId: uuid(), senderId: 'main-user-id', text: 'Привет! Давай повыжимаем максимум продуктивности сегодня?',
    },
    {
      chatId: 'chat-1a2b3c4d-0001', messageId: uuid(), senderId: 'chat-1a2b3c4d-0001', text: 'Я уже сделал список дел, никаких отвлечений!',
    },
    {
      chatId: 'chat-1a2b3c4d-0001', messageId: uuid(), senderId: 'main-user-id', text: 'Отлично, давай держать фокус и не сдаваться.',
    },
    {
      chatId: 'chat-1a2b3c4d-0001', messageId: uuid(), senderId: 'chat-1a2b3c4d-0001', text: 'Да, продуктивность — наше всё!',
    },
    {
      chatId: 'chat-1a2b3c4d-0001', messageId: uuid(), senderId: 'main-user-id', text: 'Пока я не закончу — не отдохну.',
    },
  ],
  'chat-1a2b3c4d-0002': [
    {
      chatId: 'chat-1a2b3c4d-0002', messageId: uuid(), senderId: 'main-user-id', text: 'Ты видел новый мем про аналитиков?',
    },
    {
      chatId: 'chat-1a2b3c4d-0002', messageId: uuid(), senderId: 'chat-1a2b3c4d-0002', text: 'Да, поржал от души, особенно про отчёты на 300 страниц!',
    },
    {
      chatId: 'chat-1a2b3c4d-0002', messageId: uuid(), senderId: 'main-user-id', text: 'Ха-ха, аналитика — это весело!',
    },
    {
      chatId: 'chat-1a2b3c4d-0002', messageId: uuid(), senderId: 'chat-1a2b3c4d-0002', text: 'Без шуток, надо больше мемов в отчётах.',
    },
    {
      chatId: 'chat-1a2b3c4d-0002', messageId: uuid(), senderId: 'main-user-id', text: 'Договорились, мемы спасут мир!',
    },
  ],
  'chat-1a2b3c4d-0003': [
    {
      chatId: 'chat-1a2b3c4d-0003', messageId: uuid(), senderId: 'main-user-id', text: 'Как прошла семейная встреча?',
    },
    {
      chatId: 'chat-1a2b3c4d-0003', messageId: uuid(), senderId: 'chat-1a2b3c4d-0003', text: 'Отлично! Все собрались, даже дядя Вася пришёл.',
    },
    {
      chatId: 'chat-1a2b3c4d-0003', messageId: uuid(), senderId: 'main-user-id', text: 'Замечательно, семейные моменты бесценны.',
    },
    {
      chatId: 'chat-1a2b3c4d-0003', messageId: uuid(), senderId: 'chat-1a2b3c4d-0003', text: 'Согласна, давно такого веселья не было.',
    },
    {
      chatId: 'chat-1a2b3c4d-0003', messageId: uuid(), senderId: 'main-user-id', text: 'Давай не будем терять связь.',
    },
  ],
  'chat-1a2b3c4d-0004': [
    {
      chatId: 'chat-1a2b3c4d-0004', messageId: uuid(), senderId: 'main-user-id', text: 'Как твои свидания?',
    },
    {
      chatId: 'chat-1a2b3c4d-0004', messageId: uuid(), senderId: 'chat-1a2b3c4d-0004', text: 'Все отлично, скоро расскажу подробности!',
    },
    {
      chatId: 'chat-1a2b3c4d-0004', messageId: uuid(), senderId: 'main-user-id', text: 'Жду с нетерпением, интрига интригует.',
    },
    {
      chatId: 'chat-1a2b3c4d-0004', messageId: uuid(), senderId: 'chat-1a2b3c4d-0004', text: 'Обязательно будет весело и романтично.',
    },
    {
      chatId: 'chat-1a2b3c4d-0004', messageId: uuid(), senderId: 'main-user-id', text: 'Спасибо, что делишься!',
    },
  ],
  'chat-1a2b3c4d-0005': [
    {
      chatId: 'chat-1a2b3c4d-0005', messageId: uuid(), senderId: 'main-user-id', text: 'Разбор полётов по работе сегодня?',
    },
    {
      chatId: 'chat-1a2b3c4d-0005', messageId: uuid(), senderId: 'chat-1a2b3c4d-0005', text: 'Да, много вопросов и задач, готов обсудить.',
    },
    {
      chatId: 'chat-1a2b3c4d-0005', messageId: uuid(), senderId: 'main-user-id', text: 'Отлично, вместе быстрее решим всё.',
    },
    {
      chatId: 'chat-1a2b3c4d-0005', messageId: uuid(), senderId: 'chat-1a2b3c4d-0005', text: 'Согласен, команда — наша сила.',
    },
    {
      chatId: 'chat-1a2b3c4d-0005', messageId: uuid(), senderId: 'main-user-id', text: 'Держим темп и не сдаёмся!',
    },
  ],
  'chat-1a2b3c4d-0006': [
    {
      chatId: 'chat-1a2b3c4d-0006', messageId: uuid(), senderId: 'main-user-id', text: 'Кто ты вообще? Расскажи о себе!',
    },
    {
      chatId: 'chat-1a2b3c4d-0006', messageId: uuid(), senderId: 'chat-1a2b3c4d-0006', text: 'Я таинственный хомяк, который знает всё.',
    },
    {
      chatId: 'chat-1a2b3c4d-0006', messageId: uuid(), senderId: 'main-user-id', text: 'Интригующе! Люблю загадки.',
    },
    {
      chatId: 'chat-1a2b3c4d-0006', messageId: uuid(), senderId: 'chat-1a2b3c4d-0006', text: 'Тогда тебе понравится моя тайна.',
    },
    {
      chatId: 'chat-1a2b3c4d-0006', messageId: uuid(), senderId: 'main-user-id', text: 'Жду раскрытия секретов!',
    },
  ],
  'chat-1a2b3c4d-0007': [
    {
      chatId: 'chat-1a2b3c4d-0007', messageId: uuid(), senderId: 'main-user-id', text: 'Слушай, помнишь мем про бабушку?',
    },
    {
      chatId: 'chat-1a2b3c4d-0007', messageId: uuid(), senderId: 'chat-1a2b3c4d-0007', text: 'Конечно, до сих пор ржу!',
    },
    {
      chatId: 'chat-1a2b3c4d-0007', messageId: uuid(), senderId: 'main-user-id', text: 'Юмор из 2007 — наше всё.',
    },
    {
      chatId: 'chat-1a2b3c4d-0007', messageId: uuid(), senderId: 'chat-1a2b3c4d-0007', text: 'Поржем ещё, обещаю!',
    },
    {
      chatId: 'chat-1a2b3c4d-0007', messageId: uuid(), senderId: 'main-user-id', text: 'Отлично, жду новых мемов.',
    },
  ],
  'chat-1a2b3c4d-0008': [
    {
      chatId: 'chat-1a2b3c4d-0008', messageId: uuid(), senderId: 'main-user-id', text: 'Как совмещаешь дедлайны и котиков?',
    },
    {
      chatId: 'chat-1a2b3c4d-0008', messageId: uuid(), senderId: 'chat-1a2b3c4d-0008', text: 'Очень сложно, но котики помогают расслабиться.',
    },
    {
      chatId: 'chat-1a2b3c4d-0008', messageId: uuid(), senderId: 'main-user-id', text: 'Это точно! Котики — лучшие антистресс.',
    },
    {
      chatId: 'chat-1a2b3c4d-0008', messageId: uuid(), senderId: 'chat-1a2b3c4d-0008', text: 'Вот именно, с ними работа идёт легче.',
    },
    {
      chatId: 'chat-1a2b3c4d-0008', messageId: uuid(), senderId: 'main-user-id', text: 'Нужно чаще устраивать перерывы с пушистиками.',
    },
  ],
};

