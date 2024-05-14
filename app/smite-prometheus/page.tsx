"use client";

import Link from "next/link";
import { useEffect, useState } from 'react';
import GodsTable from "./gods-table";
import { generateSortingCallback } from "./logic";

export interface SortingCriteria {
  criteria: 'name' | 'attack_speed' | 'damage' | 'dps' | 'attack_speed_buff_tier';
  direction: 'asc' | 'desc';
}

export default function HuntersPage() {
  const [hunters, setHunters] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState({
    criteria: 'name',
    direction: 'asc',
  } as SortingCriteria);
  const [level, setLevel] = useState(20);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DEPLOYMENT_URL}/api/hunters`)
      .then(res => res.json())
      .then(data => {
        setHunters(data.sortedHunters);
      });
  }, []);

  function recalculate(criteria: string, direction: 'asc' | 'desc', level: number) {
    setHunters([...hunters].sort(
      generateSortingCallback(criteria, direction, level),
    ));
  }

  function toggleSortDirection(criteria: 'name' | 'attack_speed' | 'damage' | 'dps' | 'attack_speed_buff_tier') {
    if (sortingCriteria.criteria === criteria) {
      if (sortingCriteria.direction === 'asc') {
        setSortingCriteria({ criteria, direction: 'desc' });
      } else {
        setSortingCriteria({ criteria, direction: 'asc' });
      }
      setHunters([...hunters].reverse());
    } else {
      let direction: 'asc' | 'desc' = 'asc';
      if (['attack_speed', 'damage', 'dps', 'attack_speed_buff_tier'].includes(criteria)) direction = 'desc';
      setSortingCriteria({ criteria, direction });
      recalculate(criteria, direction, level);
    }
  }

  function increaseLevel() {
    const newLevel = level + 1;
    setLevel(newLevel);
    const { criteria, direction } = sortingCriteria;
    recalculate(criteria, direction, newLevel);
  }

  function decreaseLevel() {
    const newLevel = level - 1;
    setLevel(newLevel);
    const { criteria, direction } = sortingCriteria;
    recalculate(criteria, direction, newLevel);
  }

  return (
    <main style={{
      backgroundColor: 'lightgray',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid black',
      paddingBottom: '20px',
    }}>
      <h1 style={{
        font: '40px bold Arial, Helvetica, sans-serif',
      }}>Hunters</h1>
      <Link href="/" style={{ marginBottom: '10px' }}>
        <span>Back</span>
      </Link>

      <GodsTable
        gods={hunters}
        toggleSortDirection={toggleSortDirection}
        increaseLevel={increaseLevel}
        decreaseLevel={decreaseLevel}
        level={level}
        sortingCriteria={sortingCriteria}
        backgroundColor="orange"
        itemsBackgroundColor="burlywood"
        selectedBackgroundColor="#FFC90E"
      />
    </main>
  );
}
