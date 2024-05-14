import { generateSortingCallback } from "./logic";
import { AttackSpeedBuffTier, SortedHunter } from "./page";

describe('generateSortingCallback function', () => {
  const testHunter: SortedHunter = {
    codename: 'test',
    name: 'Test',
    attack_speed: 1,
    attack_speed_per_level: 1,
    damage: 1,
    damage_per_level: 1,
    attack_speed_buff_tier: 'D',
  };
  let hunters: SortedHunter[] = [];

  it('returns a callback that sorts an array of hunters correctly by name', () => {
    hunters = ['Cernunnos', 'Anhur', 'Hachiman', 'Danzaburou'].map((name) => {
      return { ...testHunter, name };
    });
    let callback = generateSortingCallback('name', 'asc', 1);
    hunters.sort(callback);
    expect(hunters.map((hunter) => hunter.name)).toEqual(['Anhur', 'Cernunnos', 'Danzaburou', 'Hachiman']);
    hunters.sort(callback);
    expect(hunters.map((hunter) => hunter.name)).toEqual(['Anhur', 'Cernunnos', 'Danzaburou', 'Hachiman']);
    callback = generateSortingCallback('name', 'desc', 1);
    hunters.sort(callback);
    expect(hunters.map((hunter) => hunter.name)).toEqual(['Hachiman', 'Danzaburou', 'Cernunnos', 'Anhur']);
    hunters.sort(callback);
    expect(hunters.map((hunter) => hunter.name)).toEqual(['Hachiman', 'Danzaburou', 'Cernunnos', 'Anhur']);
  });
  it('returns a callback that sorts an array of hunters correctly by attack speed', () => {
    hunters = [
      { codename: 'cernunnos', attack_speed: 1, attack_speed_per_level: 1.4 },
      { codename: 'anhur', attack_speed: 1, attack_speed_per_level: 1.7 },
      { codename: 'hachiman', attack_speed: 1, attack_speed_per_level: 1.3 },
      { codename: 'chernobog', attack_speed: 0.95, attack_speed_per_level: 1.7 },
    ].map((hunter) => {
      return { ...testHunter, ...hunter };
    });
    let callback = generateSortingCallback('attack_speed', 'asc', 20);
    hunters.sort(callback);
    expect(hunters.map((hunter) => hunter.codename)).toEqual(['hachiman', 'cernunnos', 'chernobog', 'anhur']);
    callback = generateSortingCallback('attack_speed', 'desc', 20);
    hunters.sort(callback);
    expect(hunters.map((hunter) => hunter.codename)).toEqual(['anhur', 'chernobog', 'cernunnos', 'hachiman']);
  });
  it('returns a callback that sorts an array of hunters correctly by damage', () => {
    hunters = [
      { codename: 'cernunnos', damage: 32, damage_per_level: 2.5 },
      { codename: 'anhur', damage: 35, damage_per_level: 2.5 },
      { codename: 'hachiman', damage: 31, damage_per_level: 2.5 },
      { codename: 'chernobog', damage: 31, damage_per_level: 2.6 },
    ].map((hunter) => {
      return { ...testHunter, ...hunter };
    });
    let callback = generateSortingCallback('damage', 'asc', 20);
    hunters.sort(callback);
    expect(hunters.map((hunter) => hunter.codename)).toEqual(['hachiman', 'cernunnos', 'chernobog', 'anhur']);
    callback = generateSortingCallback('damage', 'desc', 20);
    hunters.sort(callback);
    expect(hunters.map((hunter) => hunter.codename)).toEqual(['anhur', 'chernobog', 'cernunnos', 'hachiman']);
  });
  it('returns a callback that sorts an array of hunters correctly by DPS', () => {
    hunters = [
      { codename: 'cernunnos', damage: 32, damage_per_level: 2.5, attack_speed: 1, attack_speed_per_level: 1.4 },
      { codename: 'anhur', damage: 35, damage_per_level: 2.5, attack_speed: 1, attack_speed_per_level: 1.7 },
      { codename: 'hachiman', damage: 31, damage_per_level: 2.5, attack_speed: 1, attack_speed_per_level: 1.3 },
      { codename: 'chernobog', damage: 31, damage_per_level: 2.6, attack_speed: 0.95, attack_speed_per_level: 1.7 },
    ].map((hunter) => {
      return { ...testHunter, ...hunter };
    });
    let callback = generateSortingCallback('dps', 'asc', 20);
    hunters.sort(callback);
    expect(hunters.map((hunter) => hunter.codename)).toEqual(['hachiman', 'cernunnos', 'chernobog', 'anhur']);
    callback = generateSortingCallback('dps', 'desc', 20);
    hunters.sort(callback);
    expect(hunters.map((hunter) => hunter.codename)).toEqual(['anhur', 'chernobog', 'cernunnos', 'hachiman']);
  });
  it('returns a callback that sorts an array of hunters correctly by attack speed buff tier', () => {
    hunters = [
      { codename: 'artemis', attack_speed_buff_tier: 'S' as AttackSpeedBuffTier },
      { codename: 'anhur', attack_speed_buff_tier: 'D' as AttackSpeedBuffTier },
      { codename: 'hachiman', attack_speed_buff_tier: 'B' as AttackSpeedBuffTier },
      { codename: 'chernobog', attack_speed_buff_tier: 'A' as AttackSpeedBuffTier },
    ].map((hunter) => {
      return { ...testHunter, ...hunter };
    });
    let callback = generateSortingCallback('attack_speed_buff_tier', 'asc', 20);
    hunters.sort(callback);
    expect(hunters.map((hunter) => hunter.codename)).toEqual(['anhur', 'hachiman', 'chernobog', 'artemis']);
    callback = generateSortingCallback('attack_speed_buff_tier', 'desc', 20);
    hunters.sort(callback);
    expect(hunters.map((hunter) => hunter.codename)).toEqual(['artemis', 'chernobog', 'hachiman', 'anhur']);
  });
});
