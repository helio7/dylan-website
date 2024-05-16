"use client";

import Link from "next/link";
import { useEffect, useState } from 'react';
import GodsTable from "./gods-table";
import { generateSortingCallback } from "./logic";
import { SortingCriteria } from "./types";

export default function HuntersPage() {
  const [hunters, setHunters] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState({
    criteria: 'name',
    direction: 'asc',
  } as {
    criteria: SortingCriteria,
    direction: 'asc' | 'desc',
  });
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

  function toggleSortDirection(criteria: SortingCriteria) {
    if (sortingCriteria.criteria === criteria) {
      if (sortingCriteria.direction === 'asc') {
        setSortingCriteria({ criteria, direction: 'desc' });
      } else {
        setSortingCriteria({ criteria, direction: 'asc' });
      }
      setHunters([...hunters].reverse());
    } else {
      let direction: 'asc' | 'desc' = 'asc';
      if (['attack_speed', 'damage', 'dps', 'cc_tier', 'attack_speed_buff_tier'].includes(criteria)) direction = 'desc';
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
        columns={[
          { key: 'icon', title: 'Icon', width: 56, sortable: false },
          { key: 'name', title: 'Name', width: 150, sortable: true },
          { key: 'attack_speed', title: 'Attack Speed', width: 112, sortable: true },
          { key: 'damage', title: 'Damage', width: 100, sortable: true },
          { key: 'dps', title: 'DPS', width: 100, sortable: true },
          { key: 'cc_tier', title: 'Crowd Control Tier', width: 100, sortable: true },
          { key: 'attack_speed_buff_tier', title: 'Attack Speed Buff Tier', width: 100, sortable: true },
        ]}
      />
    </main>
  );
}
