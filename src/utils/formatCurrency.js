/**
 * Format angka ke format Rupiah Indonesia
 * @param {number} amount - Jumlah dalam Rupiah
 * @param {boolean} short - Jika true, tampilkan format singkat (Jt/M)
 * @returns {string} Formatted currency string
 */
export function formatRupiah(amount, short = false) {
  if (short) {
    if (amount >= 1000000000) {
      return `Rp ${(amount / 1000000000).toFixed(1)} M`;
    }
    if (amount >= 1000000) {
      return `Rp ${(amount / 1000000).toFixed(0)} Jt`;
    }
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format angka dengan separator ribuan
 * @param {number} num - Angka yang akan diformat
 * @returns {string} Angka dengan separator
 */
export function formatNumber(num) {
  return new Intl.NumberFormat("id-ID").format(num);
}
