import Link from "next/link";

export default function Page() {
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
      }}>Dylan Haffner&apos;s website.</h1>
      <Link href="/smite-prometheus">
        <span>SMITE PROMETHEUS project</span>
      </Link>
      <Link href="/expenses-tracker">
        <span>Expenses Tracker</span>
      </Link>
    </main>
  );
}
