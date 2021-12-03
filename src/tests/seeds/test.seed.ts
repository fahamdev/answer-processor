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
    ],
  };

  const tests = await testRepository.find();
  if (!tests.length) {
    const insertData = async (testItem: Partial<Test>) => {
      const test = new Test();
      test.examId = testItem.examId;
      test.numberOfQuestions = testItem.numberOfQuestions;
      const savedTest = await testRepository.save(test);

      // if (ansData[savedTest.examId]) {
      //   ansData[savedTest.examId].forEach(async (ansItem: Partial<Answer>) => {
      //     const ans = new Answer();
      //     ans.question = ansItem.question;
      //     ans.answer = ansItem.answer;
      //     // ans.test = test;
      //     // console.log(ans);
      //     try {
      //       await answerRepository.save(ans);
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   });
      // }
    };
    await Promise.all(await testData.map(insertData));
    console.log('Tests table seeded successfully');
  }
};

export default seedTests;
