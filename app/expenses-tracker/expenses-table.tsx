import { Expense, PaymentDetailMode } from '../interfaces';
import styles from './index.module.css'
import { ExpenseSortingCriteria, SortingCriteria } from "./page";

function getDisplayTextFromPaymentDetailsMode(mode: string) {
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
  backgroundColor,
  itemsBackgroundColor,
  selectedBackgroundColor,
}: {
  total: number,
  expenses: Expense[],
  toggleSortDirection: (criteria: ExpenseSortingCriteria) => void,
  sortingCriteria: SortingCriteria,
  backgroundColor: string,
  itemsBackgroundColor: string,
  selectedBackgroundColor: string,
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

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '224px 112px 112px 112px 224px 224px',
          gridTemplateRows: '56px',
          gap: '4px',
          backgroundColor,
          padding: '4px',
          border: '1px solid black',
          marginBottom: '10px',
          borderRadius: '5px',
        }}>
          <div className={styles['grid-item']} style={{
            cursor: 'pointer',
            backgroundColor: criteria === 'name'? selectedBackgroundColor : itemsBackgroundColor,
          }} onClick={() => toggleSortDirection('name')}>Name</div>
          <div className={styles['grid-item']} style={{
            backgroundColor: itemsBackgroundColor,
          }}>Base cost</div>
          <div className={styles['grid-item']} style={{
            backgroundColor: itemsBackgroundColor,
          }}>Taxes (%)</div>
          <div className={styles['grid-item']} style={{
            cursor: 'pointer',
            backgroundColor: ['total_cost', 'percent_from_the_total'].includes(criteria) ? selectedBackgroundColor : itemsBackgroundColor,
          }} onClick={() => toggleSortDirection('total_cost')}>Total cost</div>
          <div className={styles['grid-item']} style={{
            cursor: 'pointer',
            backgroundColor: ['total_cost', 'percent_from_the_total'].includes(criteria) ? selectedBackgroundColor : itemsBackgroundColor,
          }} onClick={() => toggleSortDirection('percent_from_the_total')}>Percent from the total</div>
          <div className={styles['grid-item']} style={{
            cursor: 'pointer',
            backgroundColor: criteria === 'payment_month_day' ? selectedBackgroundColor : itemsBackgroundColor,
          }} onClick={() => toggleSortDirection('payment_month_day')}>Payment month day</div>
        </div>
        <div style={{
          display: 'flex',      
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '224px 112px 112px 112px 224px 224px',
            gap: '4px',
            backgroundColor,
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
                    element = <div className={styles['grid-item']} style={{ backgroundColor: itemsBackgroundColor }}>{expense.displayName}</div>
                    break;
                  case 1:
                    element = <div className={styles['grid-item']} style={{ backgroundColor: itemsBackgroundColor }}>{expense.baseCost}</div>
                    break;
                  case 2:
                    element = <div className={styles['grid-item']} style={{ backgroundColor: itemsBackgroundColor }}>{expense.taxesPercent}</div>;
                    break;
                  case 3:
                    element = <div className={styles['grid-item']} style={{ backgroundColor: itemsBackgroundColor }}>{(expense.baseCost * (1 + expense.taxesPercent / 100)).toFixed(2).replace(/\.?0*$/,'')}</div>;
                    break;
                  case 4:
                    element = <div className={styles['grid-item']} style={{ backgroundColor: itemsBackgroundColor }}>{((expense.baseCost * (1 + expense.taxesPercent / 100) / total) * 100).toFixed(3).replace(/\.?0*$/,'')}</div>;
                    break;
                  case 5:
                    element = <div className={styles['grid-item']} style={{ backgroundColor: itemsBackgroundColor }}>{getDisplayTextFromPaymentDetailsMode(expense.paymentDetails.mode)}: {expense.paymentDetails.monthDay}</div>;
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
      <div style={{
        backgroundColor,
        border: '1px solid black',
        borderRadius: '5px',
        margin: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px',
        width: '122px',
      }}>
        <div style={{
          backgroundColor: itemsBackgroundColor,
          border: '1px solid black',
          borderRadius: '5px',
          padding: '5px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <span style={{
            textAlign: 'center',
          }}>Total: {total.toFixed(3).replace(/\.?0*$/,'')}</span>
        </div>
      </div>
    </div>
  ); 
}
