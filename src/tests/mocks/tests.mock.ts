export const mockTestsService = {
  findAll: jest.fn(),
  FindOne: jest.fn(),
  findOneByExamId: jest.fn(),
  findAnswer: jest.fn(),
};

export const TestStub = {
  id: 1,
  examId: 'EX202001',
  numberOfQuestions: 10,
  answers: [
    {
      id: 1,
      question: '1',
      answer: 'A',
    },
    {
      id: 2,
      question: '9',
      answer: 'D',
    },
    {
      id: 3,
      question: '10',
      answer: 'A',
    },
    {
      id: 4,
      question: '8',
      answer: 'A',
    },
    {
      id: 5,
      question: '2',
      answer: 'C',
    },
    {
      id: 6,
      question: '3',
      answer: 'C',
    },
    {
      id: 7,
      question: '4',
      answer: 'A',
    },
    {
      id: 8,
      question: '5',
      answer: 'B',
    },
    {
      id: 9,
      question: '6',
      answer: 'B',
    },
    {
      id: 10,
      question: '7',
      answer: 'C',
    },
  ],
};
