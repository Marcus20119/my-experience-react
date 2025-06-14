import { faker } from '@faker-js/faker/locale/en';

import type { IncomeTableEntity, UserTableEntity } from './types';

export const mockUserData: UserTableEntity[] = Array(120)
  .fill(null)
  .map(() => ({
    address: faker.location.streetAddress(),
    bio: faker.person.bio(),
    city: faker.location.city(),
    gender: faker.person.gender(),
    id: faker.string.uuid(),
    job: faker.person.jobTitle(),
    nationality: faker.location.country(),
    phoneNumber: faker.phone.number(),
    user: {
      email: faker.internet.email(),
      name: faker.internet.userName(),
    },
    vehicle: faker.vehicle.vehicle(),
    zodiacSign: faker.person.zodiacSign(),
  }));

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const mockIncomeTable: IncomeTableEntity[] = months.map(month => {
  const weeks = Array(4)
    .fill(null)
    .map((_, index) => {
      const entertainment = Number(
        faker.finance.amount({
          dec: 0,
          max: 1000,
          min: 200,
        }),
      );

      const food = Number(
        faker.finance.amount({
          dec: 0,
          max: 3000,
          min: 1800,
        }),
      );

      const freelance = Number(
        faker.finance.amount({
          dec: 0,
          max: 5000,
          min: 3000,
        }),
      );

      const fuel = Number(
        faker.finance.amount({
          dec: 0,
          max: 1000,
          min: 0,
        }),
      );

      const grocery = Number(
        faker.finance.amount({
          dec: 0,
          max: 1000,
          min: 0,
        }),
      );

      const pharmacy = Number(
        faker.finance.amount({
          dec: 0,
          max: 1000,
          min: 0,
        }),
      );

      const rental = Number(
        faker.finance.amount({
          dec: 0,
          max: 3500,
          min: 2500,
        }),
      );

      const salary = Number(
        faker.finance.amount({
          dec: 0,
          max: 10000,
          min: 5000,
        }),
      );

      const otherExpense = Number(
        faker.finance.amount({
          dec: 0,
          max: 1000,
          min: 0,
        }),
      );

      const otherIncome = Number(
        faker.finance.amount({
          dec: 0,
          max: 1000,
          min: 0,
        }),
      );

      return {
        entertainment,
        food,
        freelance,
        fuel,
        grocery,
        id: faker.string.uuid(),
        name: `Week ${index + 1}`,
        note: `This is note for Week ${index + 1}`,
        otherExpense,
        otherIncome,
        pharmacy,
        rental,
        salary,
        totalExpense:
          rental +
          food +
          grocery +
          pharmacy +
          fuel +
          entertainment +
          otherExpense,
        totalIncome: salary + freelance + otherIncome,
        type: 'week',
      } as IncomeTableEntity;
    });

  return {
    children: weeks,
    entertainment: weeks.reduce((acc, week) => acc + week.entertainment, 0),
    food: weeks.reduce((acc, week) => acc + week.food, 0),
    freelance: weeks.reduce((acc, week) => acc + week.freelance, 0),
    fuel: weeks.reduce((acc, week) => acc + week.fuel, 0),
    grocery: weeks.reduce((acc, week) => acc + week.grocery, 0),
    id: faker.string.uuid(),
    name: month,
    note: `This is note for ${month}`,
    otherExpense: weeks.reduce((acc, week) => acc + week.otherExpense, 0),
    otherIncome: weeks.reduce((acc, week) => acc + week.otherIncome, 0),
    pharmacy: weeks.reduce((acc, week) => acc + week.pharmacy, 0),
    rental: weeks.reduce((acc, week) => acc + week.rental, 0),
    salary: weeks.reduce((acc, week) => acc + week.salary, 0),
    totalExpense: weeks.reduce((acc, week) => acc + week.totalExpense, 0),
    totalIncome: weeks.reduce((acc, week) => acc + week.totalIncome, 0),
    type: 'month',
  };
});
