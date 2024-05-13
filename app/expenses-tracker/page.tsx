"use client";

import Link from "next/link";
import ExpensesTable from "./expenses-table";
import { useState, useEffect } from 'react';
import { Expense, PaymentDetailMode } from "../interfaces";

export type ExpenseSortingCriteria = 'name' | 'total_cost' | 'percent_from_the_total' | 'payment_month_day';

export interface SortingCriteria {
  criteria: ExpenseSortingCriteria;
  direction: 'asc' | 'desc';
}

export default function ExpensesCalculator() {
  const [total, setTotal] = useState(0);
  const [expenses, setExpenses] = useState([] as Expense[]);
  const [sortingCriteria, setSortingCriteria] = useState({
    criteria: 'name',
    direction: 'asc',
  } as SortingCriteria);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DEPLOYMENT_URL}/api/expenses`)
      .then(res => res.json())
      .then(data => {
        setExpenses(data.expenses);
        setTotal(data.total);
      });
  }, []);

  function recalculate(criteria: string, direction: string) {
    let total = 0;
    for (const expense of expenses) {
      total += expense.baseCost * (1 + expense.taxesPercent / 100);
    }

    let sortingCallback;
    switch (criteria) {
      case 'name':
        sortingCallback = (a: Expense, b: Expense) => {
          if (direction === 'asc') return a.displayName.localeCompare(b.displayName);
          else return b.displayName.localeCompare(a.displayName);
        };
        break;
      case 'total_cost':
        sortingCallback = (a: Expense, b: Expense) => {
          const aTotalCost = a.baseCost * (1 + a.taxesPercent / 100);
          const bTotalCost = b.baseCost * (1 + b.taxesPercent / 100);
          if (direction === 'asc') return aTotalCost - bTotalCost;
          else return bTotalCost - aTotalCost;
        };
        break;
      case 'percent_from_the_total':
        sortingCallback = (a: Expense, b: Expense) => {
          const aPercentFromTheTotal = (a.baseCost * (1 + a.taxesPercent / 100)) / total;
          const bPercentFromTheTotal = (b.baseCost * (1 + b.taxesPercent / 100)) / total;
          if (direction === 'asc') return aPercentFromTheTotal - bPercentFromTheTotal;
          else return bPercentFromTheTotal - aPercentFromTheTotal;
        }
        break;
      case 'payment_month_day':
        sortingCallback = (a: Expense, b: Expense) => {
          if (a.paymentDetails.mode === PaymentDetailMode.ON_DEMAND) return 1;
          else if (b.paymentDetails.mode === PaymentDetailMode.ON_DEMAND) return -1;
          if (direction === 'asc') {
            return a.paymentDetails.monthDay! - b.paymentDetails.monthDay!;
          } else {
            return b.paymentDetails.monthDay! - a.paymentDetails.monthDay!;
          }
        };
        break;
      default:
        break;
    }
    setExpenses([...expenses].sort(sortingCallback));
    setTotal(total);
  }

  function toggleSortDirection(criteria: ExpenseSortingCriteria) {
    let newDirection: 'asc' | 'desc' = 'asc';
    if (sortingCriteria.criteria === criteria) {
      if (sortingCriteria.direction === 'asc') {
        setSortingCriteria({ criteria, direction: 'desc' });
        newDirection = 'desc';
      } else {
        setSortingCriteria({ criteria, direction: 'asc' });
        newDirection = 'asc';
      }
      recalculate(criteria, newDirection);
    } else {
      if (['total_cost', 'percent_from_the_total'].includes(criteria)) newDirection = 'desc';
      setSortingCriteria({ criteria, direction: newDirection });
      recalculate(criteria, newDirection);
    }
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
      }}>Expenses Tracker</h1>
      <Link href="/" style={{ marginBottom: '10px' }}>
        <span>Back</span>
      </Link>
      <ExpensesTable
        total={total}
        expenses={expenses}
        toggleSortDirection={toggleSortDirection}
        sortingCriteria={sortingCriteria}
        backgroundColor="gray"
        itemsBackgroundColor="lightgreen"
        selectedBackgroundColor="aquamarine"
      />
    </main>
  );
}
