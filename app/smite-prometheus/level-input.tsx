import Image from 'next/image';
import styles from './index.module.css';

export default function LevelInput({
  level,
  increaseLevel,
  decreaseLevel,
  backgroundColor,
  itemBackgroundColor,
  leftOffset,
}: {
  level: number,
  increaseLevel: () => void,
  decreaseLevel: () => void,
  backgroundColor: string,
  itemBackgroundColor: string,
  leftOffset: number,
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: `${leftOffset}px`,
      padding: '5px',
    }}>
      <span style={{
        marginBottom: '5px',
      }}>LVL</span>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '32px',
        gridTemplateRows: '32px 28px 32px',
        gap: '4px',
        backgroundColor,
        padding: '4px',
        border: '1px solid black',
        borderRadius: '5px',
      }}>
        <Image
          src={`/ui/up_arrow${level === 20 ? '_disabled' : ''}.png`}
          alt='Up Arrow'
          width={32}
          height={32}
          style={level === 20 ? { cursor: 'default' } : { cursor: 'pointer' }}
          onClick={level === 20 ? () => {} : increaseLevel}
        />
        <div className={styles['grid-item']} style={{ backgroundColor: itemBackgroundColor }}>{level}</div>
        <Image
          src={`/ui/down_arrow${level === 1 ? '_disabled' : ''}.png`}
          alt='Down Arrow'
          width={32}
          height={32}
          style={level === 1 ? { cursor: 'default' } : { cursor: 'pointer' }}
          onClick={level === 1 ? () => {} : decreaseLevel}
        />
      </div>
    </div>
  );
}
