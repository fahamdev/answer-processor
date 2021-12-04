import { BadRequestException } from '@nestjs/common';

export const csvFileFilter = (req, file, callback) => {
  if (!file.mimetype.includes('csv')) {
    return callback(new BadRequestException('Only CSV files allowed'), false);
  }
  callback(null, true);
};
