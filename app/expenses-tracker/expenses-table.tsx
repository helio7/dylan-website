import { PaymentDetailMode } from '../api/expenses/route';
import styles from './index.module.css'
import { Expense, ExpenseSortingCriteria, SortingCriteria } from "./page";


function getDisplayTextFromPaymentDetailsMode(mode: PaymentDetailMode) {
  const { AUTO, EXPIRES, ON_SITE, ON_DEMAND } = PaymentDetailMode;
  console.log('Mode', mode);
  switch (mode) {
    case AUTO:
      return 'Auto';
    case EXPIRES:
      return 'Expires';
    case ON_SITE:
      return 'On site';
    case ON_DEMAND:
      return '-';
    default:
      return '???';
  }
}

export default function ExpensesTable({
  total,
  expenses,
  toggleSortDirection,
  sortingCriteria,
}: {
  total: number,
  expenses: Expense[],
  toggleSortDirection: (criteria: ExpenseSortingCriteria) => void,
  sortingCriteria: SortingCriteria,
}) {
  const auxArray = [];
  if (expenses) {
    for (const expense of expenses) {
      auxArray.push(expense);
      auxArray.push(expense);
      auxArray.push(expense);
      auxArray.push(expense);
      auxArray.push(expense);
      auxArray.push(expense);
    }
  }

  const { criteria } = sortingCriteria;

  const { NAME, TOTAL_COST, PERCENT_FROM_THE_TOTAL, PAYMENT_MONTH_DAY } = ExpenseSortingCriteria;

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '224px 112px 112px 112px 224px 224px',
          gridTemplateRows: '56px',
          gap: '4px',
          backgroundColor: 'orange',
          padding: '4px',
          border: '1px solid black',
          marginBottom: '10px',
          borderRadius: '5px',
        }}>
          <div className={styles['grid-item']} style={{
            cursor: 'pointer',
            backgroundColor: criteria === NAME ? '#FFC90E' : undefined,
          }} onClick={() => toggleSortDirection(NAME)}>Name</div>
          <div className={styles['grid-item']}>Base cost</div>
          <div className={styles['grid-item']}>Taxes (%)</div>
          <div className={styles['grid-item']} style={{
            cursor: 'pointer',
            backgroundColor: [TOTAL_COST, PERCENT_FROM_THE_TOTAL].includes(criteria) ? '#FFC90E' : undefined,
          }} onClick={() => toggleSortDirection(TOTAL_COST)}>Total cost</div>
          <div className={styles['grid-item']} style={{
            cursor: 'pointer',
            backgroundColor: [TOTAL_COST, PERCENT_FROM_THE_TOTAL].includes(criteria) ? '#FFC90E' : undefined,
          }} onClick={() => toggleSortDirection(PERCENT_FROM_THE_TOTAL)}>Percent from the total</div>
          <div className={styles['grid-item']} style={{
            cursor: 'pointer',
            backgroundColor: criteria === PAYMENT_MONTH_DAY ? '#FFC90E' : undefined,
          }} onClick={() => toggleSortDirection(PAYMENT_MONTH_DAY)}>Payment month day</div>
        </div>
        <div style={{
          backgroundColor: 'yellow',
          display: 'flex',      
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '224px 112px 112px 112px 224px 224px',
            gap: '4px',
            backgroundColor: 'orange',
            padding: '4px',
            border: '1px solid black',
            borderRadius: '5px',
          }}>
            {
              auxArray.map((expense, index) => {
                const rest = index % 6;
                let element;
                switch (rest) {
                  case 0:
                    element = <div className={styles['grid-item']}>{expense.displayName}</div>
                    break;
                  case 1:
                    element = <div className={styles['grid-item']}>{expense.baseCost}</div>
                    break;
                  case 2:
                    element = <div className={styles['grid-item']}>{expense.taxesPercent}</div>;
                    break;
                  case 3:
                    element = <div className={styles['grid-item']}>{(expense.baseCost * (1 + expense.taxesPercent / 100)).toFixed(2).replace(/\.?0*$/,'')}</div>;
                    break;
                  case 4:
                    element = <div className={styles['grid-item']}>{((expense.baseCost * (1 + expense.taxesPercent / 100) / total) * 100).toFixed(3).replace(/\.?0*$/,'')}</div>;
                    break;
                  case 5:
                    element = <div className={styles['grid-item']}>{getDisplayTextFromPaymentDetailsMode(expense.paymentDetails.mode)}: {expense.paymentDetails.monthDay}</div>;
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
      <span>Total: {total}</span>
    </div>
  ); 
}
