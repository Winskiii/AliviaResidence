import React, { useState, useMemo } from "react";
import { Calculator, TrendingDown } from "lucide-react";
import { calculateMonthlyInstallment, calculateDP, calculateTotalPayment } from "../../utils/calculateKPR";
import { formatRupiah } from "../../utils/formatCurrency";
import { units } from "../../data/units";

const KPRCalculator = ({ defaultPrice = 490000000 }) => {
  const [values, setValues] = useState({
    price: defaultPrice,
    dp: 20,
    tenor: 15,
    rate: 7.5,
  });

  const result = useMemo(() => {
    const monthly = calculateMonthlyInstallment(values.price, values.dp, values.tenor, values.rate);
    const dpAmount = calculateDP(values.price, values.dp);
    const total = calculateTotalPayment(monthly, values.tenor);
    const totalInterest = total - (values.price - dpAmount);
    return { monthly, dpAmount, total, totalInterest };
  }, [values]);

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: Number(value) }));
  };

  const sliderConfigs = [
    { label: "Harga Rumah", field: "price", min: 300000000, max: 900000000, step: 5000000, format: formatRupiah },
    { label: "Uang Muka (DP)", field: "dp", min: 10, max: 50, step: 1, format: (v) => `${v}%` },
    { label: "Tenor KPR", field: "tenor", min: 5, max: 30, step: 1, format: (v) => `${v} Tahun` },
    { label: "Suku Bunga", field: "rate", min: 4, max: 15, step: 0.25, format: (v) => `${v}%` },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-primary-light p-6">
        <div className="flex items-center gap-3 text-white">
          <div className="p-2 bg-white/20 rounded-xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Simulasi KPR</h3>
            <p className="text-white/80 text-sm">Estimasi cicilan bulanan Anda</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Pilih unit cepat */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Pilih Tipe Unit
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {units.map((unit) => (
              <button
                key={unit.id}
                onClick={() => handleChange("price", unit.price)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border-2 transition-all ${
                  values.price === unit.price
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 text-gray-600 hover:border-primary/50"
                }`}
              >
                {unit.shortName}
                <div className="text-xs opacity-75 mt-0.5">{unit.priceDisplay.replace("Rp ", "")}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        {sliderConfigs.map(({ label, field, min, max, step, format }) => (
          <div key={field}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-semibold text-gray-700">{label}</label>
              <span className="text-sm font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-lg">
                {format(values[field])}
              </span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={values[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{format(min)}</span>
              <span>{format(max)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Result */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-t border-gray-100 p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Uang Muka (DP)</p>
            <p className="text-lg font-bold text-gray-800">{formatRupiah(result.dpAmount)}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Total Pinjaman</p>
            <p className="text-lg font-bold text-gray-800">
              {formatRupiah(values.price - result.dpAmount)}
            </p>
          </div>
        </div>

        <div className="bg-primary rounded-xl p-4 text-center text-white">
          <p className="text-sm opacity-80 mb-1">Estimasi Cicilan per Bulan</p>
          <p className="text-3xl font-bold">{formatRupiah(result.monthly)}</p>
          <p className="text-xs opacity-60 mt-1">
            Selama {values.tenor} tahun ({values.tenor * 12} bulan)
          </p>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          * Simulasi bersifat estimasi. Hubungi kami untuk konsultasi KPR gratis.
        </p>
      </div>
    </div>
  );
};

export default KPRCalculator;
