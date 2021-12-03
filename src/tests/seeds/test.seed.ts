import { getRepository } from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { Test } from '../entities/test.entity';

const seedTests = async () => {
  const testRepository = getRepository(Test);
  const answerRepository = getRepository(Answer);

  const testData: Partial<Test>[] = [
    {
      examId: 'EX202001',
      numberOfQuestions: 10,
    },
    {
      examId: 'EX202002',
      numberOfQuestions: 17,
    },
    {
      examId: 'EX202003',
      numberOfQuestions: 20,
    },
    {
      examId: 'EX202004',
      numberOfQuestions: 12,
    },
  ];

  const ansData = {
    EX202001: [
      {
        question: 1,
        answer: 'A',
      },
      {
        question: 2,
        answer: 'C',
      },
      {
        question: 3,
        answer: 'C',
      },
      {
        question: 4,
        answer: 'A',
      },
      {
        question: 5,
        answer: 'B',
      },
      {
        question: 6,
        answer: 'B',
      },
      {
        question: 7,
        answer: 'C',
      },
      {
        question: 8,
        answer: 'A',
      },
      {
        question: 9,
        answer: 'D',
      },
      {
        question: 10,
        answer: 'A',
      },
    ],
    EX202002: [
      {
        question: 1,
        answer: 'B',
      },
      {
        question: 2,
        answer: 'D',
      },
      {
        question: 3,
        answer: 'C',
      },
      {
        question: 4,
        answer: 'C',
      },
      {
        question: 5,
        answer: 'A',
      },
      {
        question: 6,
        answer: 'D',
      },
      {
        question: 7,
        answer: 'E',
      },
      {
        question: 8,
        answer: 'E',
      },
      {
        question: 9,
        answer: 'C',
      },
      {
        question: 10,
        answer: 'A',
      },
      {
        question: 11,
        answer: 'E',
      },
      {
        question: 12,
        answer: 'C',
      },
      {
        question: 13,
        answer: 'D',
      },
      {
        question: 14,
        answer: 'E',
      },
      {
        question: 15,
        answer: 'A',
      },
      {
        question: 16,
        answer: 'B',
      },
      {
        question: 17,
        answer: 'D',
      },
    ],
    EX202003: [
      {
        question: 1,
        answer: 'B',
      },
      {
        question: 2,
        answer: 'C',
      },
      {
        question: 3,
        answer: 'E',
      },
      {
        question: 4,
        answer: 'E',
      },
      {
        question: 5,
        answer: 'A',
      },
      {
        question: 6,
        answer: 'C',
      },
      {
        question: 7,
        answer: 'D',
      },
      {
        question: 8,
        answer: 'E',
      },
      {
        question: 9,
        answer: 'A',
      },
      {
        question: 10,
        answer: 'A',
      },
      {
        question: 11,
        answer: 'E',
      },
      {
        question: 12,
        answer: 'C',
      },
      {
        question: 13,
        answer: 'B',
      },
      {
        question: 14,
        answer: 'A',
      },
      {
        question: 15,
        answer: 'B',
      },
      {
        question: 16,
        answer: 'C',
      },
      {
        question: 17,
        answer: 'A',
      },
      {
        question: 18,
        answer: 'B',
      },
      {
        question: 19,
        answer: 'B',
      },
      {
        question: 20,
        answer: 'D',
      },
    ],
    EX202004: [
      {
        question: 1,
        answer: 'E',
      },
      {
        question: 2,
        answer: 'A',
      },
      {
        question: 3,
        answer: 'C',
      },
      {
        question: 4,
        answer: 'D',
      },
      {
        question: 5,
        answer: 'E',
      },
      {
        question: 6,
        answer: 'A',
      },
      {
        question: 7,
        answer: 'A',
      },
      {
        question: 8,
        answer: 'E',
      },
      {
        question: 9,
        answer: 'C',
      },
      {
        question: 10,
        answer: 'B',
      },
      {
        question: 11,
        answer: 'A',
      },
      {
        question: 12,
        answer: 'B',
      },
    ],
  };

  const tests = await testRepository.find();
  if (!tests.length) {
    const insertData = async (testItem: Partial<Test>) => {
      const test = new Test();
      test.examId = testItem.examId;
      test.numberOfQuestions = testItem.numberOfQuestions;
      const savedTest = await testRepository.save(test);

      if (ansData[savedTest.examId]) {
        ansData[savedTest.examId].forEach(async (ansItem: Partial<Answer>) => {
          const ans = new Answer();
          ans.question = ansItem.question;
          ans.answer = ansItem.answer;
          ans.test = savedTest;
          try {
            await answerRepository.save(ans);
          } catch (error) {
            console.log(error);
          }
        });
      }
    };
    await Promise.all(await testData.map(insertData));

    console.log('Tests table seeded successfully');
  }
};

export default seedTests;
