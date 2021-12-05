import { BadRequestException } from '@nestjs/common';
import { File } from '../entities/file.entity';

export const csvFileFilter = (req, file, callback) => {
  if (!file.mimetype.includes('csv')) {
    return callback(new BadRequestException('Only CSV files allowed'), false);
  }
  callback(null, true);
};

export const CSVHeaders = [
  'examId',
  'examDate',
  'candidateEmail',
  'candidateName',
  'questionNumber',
  'answer',
];

export const calculatePercentRank = (
  arr: Array<number>,
  value: number,
): string => {
  const arrCopy = [...arr];
  arrCopy.sort((a, b) => a - b);
  console.log(arrCopy);

  const index = arrCopy.indexOf(value);
  console.log(index);
  const length = arrCopy.length;
  const result = index / (length - 1);
  return result.toFixed(2);
};

export const getScore = (
  data: Array<File>,
  numberOfQuestions: number,
): string => {
  return (
    (data.map((item) => item.isCorrect).reduce((a, b) => +a + +b, 0) * 100) /
    numberOfQuestions
  ).toFixed(2);
};
