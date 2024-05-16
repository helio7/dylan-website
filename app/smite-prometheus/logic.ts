import { SortedHunter } from "./types";

export const VALUE_BY_RANK: { [key: string]: number } = { D: 0, C: 1, B: 2, A: 3, S: 4 };

export function generateSortingCallback(
  criteria: string,
  direction: 'asc' | 'desc',
  level: number,
): (a: SortedHunter, b: SortedHunter) => number {
  switch (criteria) {
    case 'name':
      return (a: SortedHunter, b: SortedHunter) => {
        if (direction === 'asc') return a.name.localeCompare(b.name);
        else return b.name.localeCompare(a.name);
      }
    case 'attack_speed':
      return (a: SortedHunter, b: SortedHunter) => {
        const aAttackSpeed = calculateAttackSpeed(a, level);
        const bAttackSpeed = calculateAttackSpeed(b, level);
        if (direction === 'asc') return aAttackSpeed - bAttackSpeed;
        else return bAttackSpeed - aAttackSpeed;
      };
    case 'damage':
      return (a: SortedHunter, b: SortedHunter) => {
        const aDamage = a.damage + a.damage_per_level * level;
        const bDamage = b.damage + b.damage_per_level * level;
        if (direction === 'asc') return aDamage - bDamage;
        else return bDamage - aDamage;
      };
    case 'dps':
      return (a: SortedHunter, b: SortedHunter) => {
        const aDps = (a.damage + a.damage_per_level * level) * (a.attack_speed + a.attack_speed_per_level * level / 100);
        const bDps = (b.damage + b.damage_per_level * level) * (b.attack_speed + b.attack_speed_per_level * level / 100);
        if (direction === 'asc') return aDps - bDps;
        else return bDps - aDps;
      };
    case 'attack_speed_buff_tier':
      return (a: SortedHunter, b: SortedHunter) => {
        const aValue = VALUE_BY_RANK[a.attack_speed_buff_tier];
        const bValue = VALUE_BY_RANK[b.attack_speed_buff_tier];
        if (direction === 'asc') return aValue - bValue;
        else return bValue - aValue;
      };
    default:
      throw new Error('Invalid sorting criteria');
  }
}

export function calculateAttackSpeed(hunter: SortedHunter, level: number) {
  const { attack_speed, attack_speed_per_level } = hunter;
  return attack_speed + attack_speed * attack_speed_per_level * level / 100;
}
