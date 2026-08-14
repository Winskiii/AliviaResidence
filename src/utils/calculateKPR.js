/**
 * Menghitung cicilan KPR bulanan menggunakan metode anuitas
 * @param {number} price - Harga rumah (Rupiah)
 * @param {number} dpPercent - Persentase DP (0-100)
 * @param {number} tenorYears - Tenor KPR (tahun)
 * @param {number} annualRate - Suku bunga tahunan (persen)
 * @returns {number} Cicilan per bulan (Rupiah)
 */
export function calculateMonthlyInstallment(price, dpPercent, tenorYears, annualRate) {
  const dpAmount = price * (dpPercent / 100);
  const loanAmount = price - dpAmount;
  const monthlyRate = annualRate / 100 / 12;
  const months = tenorYears * 12;

  if (monthlyRate === 0) {
    return Math.round(loanAmount / months);
  }

  const installment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return Math.round(installment);
}

/**
 * Menghitung jumlah DP
 * @param {number} price - Harga rumah
 * @param {number} dpPercent - Persentase DP
 * @returns {number} Jumlah DP
 */
export function calculateDP(price, dpPercent) {
  return Math.round(price * (dpPercent / 100));
}

/**
 * Menghitung total yang harus dibayar selama tenor
 * @param {number} monthly - Cicilan bulanan
 * @param {number} tenorYears - Tenor (tahun)
 * @returns {number} Total pembayaran
 */
export function calculateTotalPayment(monthly, tenorYears) {
  return monthly * tenorYears * 12;
}
