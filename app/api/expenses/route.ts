export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
  try {
    const expenses = [
      {
        codename: 'freenance', displayName: 'Freenance',
        baseCost: 10000, taxesPercent: 0,
        paymentDetails: { mode: 'auto', monthDay: 2 },
      },
      {
        codename: 'youtube_premium', displayName: 'YouTube Premium',
        baseCost: 869, taxesPercent: 38.42,
        paymentDetails: { mode: 'auto', monthDay: 2 },
      },
      {
        codename: 'spotify', displayName: 'Spotify',
        baseCost: 1299, taxesPercent: 38.65,
        paymentDetails: { mode: 'auto', monthDay: 3 },
      },
      {
        codename: 'brackets', displayName: 'Brackets',
        baseCost: 33000, taxesPercent: 0,
        paymentDetails: { mode: 'on_site', monthDay: 9 },
      },
      {
        codename: 'iibb', displayName: 'IIBB',
        baseCost: 13263, taxesPercent: 0,
        paymentDetails: { mode: 'expires', monthDay: 18 },
      },
      {
        codename: 'atlas', displayName: 'Atlas',
        baseCost: 32690, taxesPercent: 55.53,
        paymentDetails: { mode: 'auto', monthDay: 19 },
      },
      {
        codename: 'monotributo', displayName: 'Monotributo',
        baseCost: 33173.61, taxesPercent: 0,
        paymentDetails: { mode: 'auto', monthDay: 20 },
      },
      {
        codename: 'claro_datos', displayName: 'Claro Datos',
        baseCost: 11025, taxesPercent: 0,
        paymentDetails: { mode: 'expires', monthDay: 23 },
      },
      {
        codename: 'icloud_plus', displayName: 'iCloud+',
        baseCost: 924.66, taxesPercent: 35.5,
        paymentDetails: { mode: 'auto', monthDay: 24 },
      },
      {
        codename: 'departamento', displayName: 'Departamento',
        baseCost: 0, taxesPercent: 0,
        paymentDetails: { mode: 'expires', monthDay: 5 },
      },
      {
        codename: 'wifi_ip_red', displayName: 'Wi-Fi IP-RED',
        baseCost: 6000, taxesPercent: 0,
        paymentDetails: { mode: 'expires', monthDay: 10 },
      },
      {
        codename: 'epe', displayName: 'EPE',
        baseCost: 21799.43, taxesPercent: 0,
        paymentDetails: { mode: 'auto', monthDay: 15 },
      },
      {
        codename: 'wifi_claro', displayName: 'Wi-Fi Claro',
        baseCost: 3461.33, taxesPercent: 0,
        paymentDetails: { mode: 'expires', monthDay: 19 },
      },
      {
        codename: 'recarga_sube', displayName: 'Recarga SUBE',
        baseCost: 0, taxesPercent: 0,
        paymentDetails: { mode: 'on_demand' },
      },
      {
        codename: 'recarga_celular', displayName: 'Recarga Celular',
        baseCost: 0, taxesPercent: 0,
        paymentDetails: { mode: 'on_demand' },
      },
      {
        codename: 'transferencias_3ros', displayName: 'Transferencias 3ros',
        baseCost: 0, taxesPercent: 0,
        paymentDetails: { mode: 'on_demand' },
      },
      {
        codename: 'mascotas_del_oeste', displayName: 'Mascotas Del Oeste',
        baseCost: 14000, taxesPercent: 0,
        paymentDetails: { mode: 'on_demand' },
      },
      {
        codename: 'extracciones', displayName: 'Extracciones',
        baseCost: 0, taxesPercent: 0,
        paymentDetails: { mode: 'on_demand' },
      },
      {
        codename: 'uber', displayName: 'Uber',
        baseCost: 0, taxesPercent: 0,
        paymentDetails: { mode: 'on_demand' },
      },
      {
        codename: 'comision_bancos', displayName: 'Comisión bancos',
        baseCost: 1300, taxesPercent: 0,
        paymentDetails: { mode: 'on_demand' },
      },
    ]
      .sort((a: any, b: any) => {
        // Alphabetically
        return a.displayName.localeCompare(b.displayName);
      });

    return Response.json({
      success: true,
      expenses,
      total: expenses
        .reduce((total, expense) => total + expense.baseCost * (1 + expense.taxesPercent / 100), 0),
    });
  } catch (e) {
    console.error(e);
    return Response.json({ success: false });
  }

}
