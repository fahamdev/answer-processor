// import { getRepository } from 'typeorm';
// import { Answer } from '../entities/answer.entity';

// const seedAnswers = async () => {
//   const answerRepository = getRepository(Answer);
//   const answerData: Partial<Answer>[] = [
//     {

//     },
//     {
//       examId: 'EX202002',
//       numberOfQuestions: 17,
//     },
//     {
//       examId: 'EX202003',
//       numberOfQuestions: 20,
//     },
//     {
//       examId: 'EX202004',
//       numberOfQuestions: 12,
//     },
//   ];

//   const tests = await testRepository.find();
//   if (!tests.length) {
//     const insertData = async (item: Partial<Test>) => {
//       const test = new Test();
//       test.examId = item.examId;
//       test.numberOfQuestions = item.numberOfQuestions;
//       await testRepository.save(test);
//       return test;
//     };
//     await Promise.all(await testData.map(insertData));
//     console.log('Tests table seeded successfully');
//   }
// };

// export default seedTests;
