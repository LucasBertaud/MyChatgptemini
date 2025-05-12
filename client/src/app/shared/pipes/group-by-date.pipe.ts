import { Pipe, PipeTransform } from '@angular/core';
import DateDiff from 'date-diff';
import { DateKeyEnum } from '../enums/date-key.enum';

@Pipe({
  name: 'groupByDate',
  standalone: true,
})
export class GroupByDatePipe implements PipeTransform {
  transform(items: any[], key: DateKeyEnum): GroupByDateType[] {
    if (!items || items.length === 0) return [];

    const groups: GroupByDateType[] = [];

    for (const item of items) {
      const itemDate = new Date(item[key]);
      const diffNameAndPower = this.getDateDiffNameAndPower(itemDate);

      const findGroup = groups.find((g) => g.name === diffNameAndPower.name);
      if (!findGroup) {
        groups.push({
          power: diffNameAndPower.power,
          name: diffNameAndPower.name,
          value: [item],
        });
      } else {
        findGroup.value.push(item);
      }
    }

    groups.sort((a, b) => a.power - b.power);
    return groups;
  }

  private getDateDiffNameAndPower(date: Date): { name: string; power: number } {
    let name = '';
    let power = 0;
    const now = new Date();
    const diff = new DateDiff(now, date);
    const yearsDiff = Math.floor(diff.years());
    const monthsDiff = Math.floor(diff.months());
    const daysDiff = Math.floor(diff.days());

    if (yearsDiff > 0) {
      name = date.getFullYear().toString();
      const powerYears = yearsDiff / 10000;
      power = 5 + powerYears;
    } else if (monthsDiff > 0) {
      name = date.toLocaleString('default', { month: 'long' });
      const powerMonths = monthsDiff / 10000;
      power = 4 + powerMonths;
    } else if (daysDiff === 0) {
      name = "aujourd'hui";
      power = 0;
    } else if (daysDiff === 1) {
      name = 'hier';
      power = 1;
    } else if (daysDiff <= 7) {
      name = '7 jours précédents';
      power = 2;
    } else if (daysDiff <= 30) {
      name = '30 jours précédents';
      power = 3;
    }

    return { name, power };
  }
}

type GroupByDateType = {
  power: number;
  name: string;
  value: any[];
};
