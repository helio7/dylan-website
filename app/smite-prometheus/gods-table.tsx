import Image from "next/image";
import styles from './index.module.css'
import LevelInput from "./level-input";
import { SortedHunter, SortingCriteria } from "./types";
import { calculateAttackSpeed } from "./logic";

export default function GodsTable({
  gods,
  toggleSortDirection,
  level,
  increaseLevel,
  decreaseLevel,
  sortingCriteria,
  backgroundColor,
  itemsBackgroundColor,
  selectedBackgroundColor,
  columns,
}: {
  gods: SortedHunter[],
  toggleSortDirection: (criteria: 'name' | 'attack_speed' | 'damage' | 'dps' | 'attack_speed_buff_tier') => void,
  level: number,
  increaseLevel: () => void,
  decreaseLevel: () => void,
  sortingCriteria: {
    criteria: SortingCriteria,
    direction: 'asc' | 'desc',
  },
  backgroundColor: string,
  itemsBackgroundColor: string,
  selectedBackgroundColor: string,
  columns: {
    key: 'icon' | 'name' | 'attack_speed' | 'damage' | 'dps' | 'attack_speed_buff_tier',
    title: string,
    width: number,
    sortable: boolean,
  }[],
}) {
  const cells = [];
  if (gods) {
    for (const god of gods) {
      for (let i = 0; i < columns.length; i++) {
        let element;
        switch (columns[i].key) {
          case 'icon':
            element = <div className={styles['grid-item']} style={{ backgroundColor: itemsBackgroundColor }}>
              <Image
                src={`/gods_icons/${god.codename}.png`}
                alt={`${god.name}'s profile picture`}
                width={54}
                height={54}
                key={i}
              />
            </div>;
            break;
          case 'name':
            element = <div className={styles['grid-item']} style={{ backgroundColor: itemsBackgroundColor }}>{god.name}</div>;
            break;
          case 'attack_speed':
            element = <div className={styles['grid-item']} style={{ backgroundColor: itemsBackgroundColor }}>{(calculateAttackSpeed(god, level)).toFixed(3).replace(/\.?0*$/,'')}</div>;
            break;
          case 'damage':
            element = <div className={styles['grid-item']} style={{ backgroundColor: itemsBackgroundColor }}>{(god.damage + god.damage_per_level * level).toFixed(3).replace(/\.?0*$/,'')}</div>;
            break;
          case 'dps':
            element = <div className={styles['grid-item']} style={{ backgroundColor: itemsBackgroundColor }}>{((god.damage + god.damage_per_level * level) * (god.attack_speed + god.attack_speed_per_level * level / 100)).toFixed(3).replace(/\.?0*$/,'')}</div>;
            break;
          case 'attack_speed_buff_tier':
            element = <div
              className={`${styles['grid-item']} ${styles['tooltip']}`}
              style={{ backgroundColor: itemsBackgroundColor }}
            >
              {god.grade_tiers.attack_speed.grade}
              <span className={styles['tooltiptext']}>{god.grade_tiers.attack_speed.explanation}</span>
            </div>;
            break;
          default:
            break;
        }
        cells.push(element);
      }
    }
  }

  const { criteria } = sortingCriteria;

  let levelInputElementLeftOffset = 1 + columns.length * 5;
  for (const column of columns) levelInputElementLeftOffset += column.width;

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
    }}>
      <div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `${columns.map(({ width }) => `${width}px`).join(' ')}`,
          gridTemplateRows: '56px',
          gap: '4px',
          backgroundColor,
          padding: '4px',
          border: '1px solid black',
          marginBottom: '10px',
          borderRadius: '5px',
        }}>
          {columns.map(({ key, title, sortable }) => (
            <div
              key={key}
              className={styles['grid-item']}
              style={{
                cursor: sortable ? 'pointer' : undefined,
                backgroundColor: sortable ? (criteria === key ? selectedBackgroundColor : itemsBackgroundColor) : itemsBackgroundColor,
              }}
              onClick={sortable && key !== 'icon' ? () => toggleSortDirection(key) : undefined}
            >
              {title}
            </div>
          ))}
        </div>
        <div style={{
          display: 'flex',      
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `${columns.map(({ width }) => `${width}px`).join(' ')}`,
            gridTemplateRows: '56px 56px',
            gap: '4px',
            backgroundColor,
            padding: '4px',
            border: '1px solid black',
            borderRadius: '5px',
          }}>
            { cells.map(element => element) }
          </div>
        </div>
      </div>
      <LevelInput
        level={level} increaseLevel={increaseLevel} decreaseLevel={decreaseLevel}
        backgroundColor={backgroundColor} itemBackgroundColor={itemsBackgroundColor}
        leftOffset={levelInputElementLeftOffset}
      />
    </div>
  ); 
}
