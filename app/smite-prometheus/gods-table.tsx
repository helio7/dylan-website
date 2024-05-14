import Image from "next/image";
import styles from './index.module.css'
import LevelInput from "./level-input";
import { SortingCriteria } from "./page";
import { SortedHunter } from "./types";

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
}: {
  gods: SortedHunter[],
  toggleSortDirection: (criteria: 'name' | 'attack_speed' | 'damage' | 'dps' | 'attack_speed_buff_tier') => void,
  level: number,
  increaseLevel: () => void,
  decreaseLevel: () => void,
  sortingCriteria: SortingCriteria,
  backgroundColor: string,
  itemsBackgroundColor: string,
  selectedBackgroundColor: string,
}) {
  const auxArray = [];
  if (gods) {
    for (const god of gods) {
      auxArray.push(god);
      auxArray.push(god);
      auxArray.push(god);
      auxArray.push(god);
      auxArray.push(god);
      auxArray.push(god);
    }
  }

  const { criteria } = sortingCriteria;

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
    }}>
      <div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '56px 200px 112px 112px 112px 112px',
          gridTemplateRows: '56px',
          gap: '4px',
          backgroundColor,
          padding: '4px',
          border: '1px solid black',
          marginBottom: '10px',
          borderRadius: '5px',
        }}>
          <div className={styles['grid-item']} style={{
            backgroundColor: itemsBackgroundColor,
          }}>Icon</div>
          <div className={styles['grid-item']} style={{
            cursor: 'pointer',
            backgroundColor: criteria === 'name' ? selectedBackgroundColor : itemsBackgroundColor,
          }} onClick={() => toggleSortDirection('name')} >Name</div>
          <div className={styles['grid-item']} style={{
            cursor: 'pointer',
            backgroundColor: criteria === 'attack_speed' ? selectedBackgroundColor : itemsBackgroundColor,
          }} onClick={() => toggleSortDirection('attack_speed')}>Attack speed</div>
          <div className={styles['grid-item']} style={{
            cursor: 'pointer',
            backgroundColor: criteria === 'damage' ? selectedBackgroundColor : itemsBackgroundColor,
          }} onClick={() => toggleSortDirection('damage')}>Damage</div>
          <div className={styles['grid-item']} style={{
            cursor: 'pointer',
            backgroundColor: criteria === 'dps' ? selectedBackgroundColor : itemsBackgroundColor,
          }} onClick={() => toggleSortDirection('dps')}>DPS</div>
          <div className={styles['grid-item']} style={{
            cursor: 'pointer',
            backgroundColor: criteria === 'attack_speed_buff_tier' ? selectedBackgroundColor : itemsBackgroundColor,
          }} onClick={() => toggleSortDirection('attack_speed_buff_tier')}>Attack Speed Buff Tier</div>
        </div>
        <div style={{
          display: 'flex',      
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '56px 200px 112px 112px 112px 112px',
            gridTemplateRows: '56px 56px',
            gap: '4px',
            backgroundColor,
            padding: '4px',
            border: '1px solid black',
            borderRadius: '5px',
          }}>
            {
              auxArray.map((god, index) => {
                const rest = index % 6;
                let element;
                switch (rest) {
                  case 0:
                    element = <div className={styles['grid-item']} style={{ backgroundColor: itemsBackgroundColor }}>
                      <Image
                        src={`/gods_icons/${god.codename}.png`}
                        alt={`${god.name}'s profile picture`}
                        width={54}
                        height={54}
                        key={index}
                      />
                    </div>;
                    break;
                  case 1:
                    element = <div className={styles['grid-item']} style={{ backgroundColor: itemsBackgroundColor }}>{god.name}</div>
                    break;
                  case 2:
                    element = <div className={styles['grid-item']} style={{ backgroundColor: itemsBackgroundColor }}>{(god.attack_speed + god.attack_speed_per_level * level / 100).toFixed(3).replace(/\.?0*$/,'')}</div>;
                    break;
                  case 3:
                    element = <div className={styles['grid-item']} style={{ backgroundColor: itemsBackgroundColor }}>{(god.damage + god.damage_per_level * level).toFixed(3).replace(/\.?0*$/,'')}</div>;
                    break;
                  case 4:
                    element = <div className={styles['grid-item']} style={{ backgroundColor: itemsBackgroundColor }}>{((god.damage + god.damage_per_level * level) * (god.attack_speed + god.attack_speed_per_level * level / 100)).toFixed(3).replace(/\.?0*$/,'')}</div>;
                    break;
                  case 5:
                    element = <div className={styles['grid-item']} style={{ backgroundColor: itemsBackgroundColor }}>{god.attack_speed_buff_tier}</div>;
                    break;
                  default:
                    break;
                }
                return element;
              })
            }
          </div>
        </div>
      </div>
      <LevelInput level={level} increaseLevel={increaseLevel} decreaseLevel={decreaseLevel} backgroundColor={backgroundColor} itemBackgroundColor={itemsBackgroundColor} />
    </div>
  ); 
}
