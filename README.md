## Running the app

```bash
# Database
$ docker-compose up

# API
$ yarn start:dev
```

## Test

```bash
# unit tests
$ yarn test
```

## Suggested Changes in Architecture

I think the a better Architecture would be to implement a new module named Examinee with a many to many relationship with Tests. Whenever a CSV is uploaded, the results of each student for the exams will ba calculated and stored in the joining table of Examinees and Tests.

In current design, every time the CSVs are being downloaded. the result(average score, percentile rank) are being calculated. But if the score of each examinee for each exam is stored in db while uploading the CSV, the calculations will become less intensive.
