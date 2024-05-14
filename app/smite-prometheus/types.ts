export type AttackSpeedBuffTier = 'S' | 'A' | 'B' | 'C' | 'D';

export interface SortedHunter {
  codename: string;
  name: string;
  attack_speed: number;
  attack_speed_per_level: number;
  damage: number;
  damage_per_level: number;
  attack_speed_buff_tier: AttackSpeedBuffTier;
}

export type SortingCriteria = 'name' | 'attack_speed' | 'damage' | 'dps' | 'attack_speed_buff_tier';
