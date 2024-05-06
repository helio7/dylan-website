import Image from "next/image";

export default function GodsTable({
  gods,
}: {
  gods: {
    codename: string,
    name: string,
    speed_at_level_20: number,
  }[],
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      border: '1px solid black',
      padding: '2px',
      backgroundColor: 'orange',
      width: '250px',
    }}>
      <Image
        src={`/gods_icons/'codename'.png`}
        style={{
          
        }}
        alt={`${name}'s profile picture`}
        width={56}
        height={56}
      />
      <div style={{
        width: '100%',
        textAlign: 'center',
      }}>
        <span style={{
          marginLeft: '2px',
          marginRight: '2px',
        }}></span>
      </div>
    </div>
  ); 
}
