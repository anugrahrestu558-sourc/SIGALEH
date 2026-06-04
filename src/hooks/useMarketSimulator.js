import { useEffect, useRef, useState } from "react";

/**
 * REALTIME MARKET SIMULATOR
 * - random walk pricing
 * - trend bias
 * - volatility control
 */
function useMarketSimulator(basePrice = 30000, speed = 2000) {
  const [data, setData] = useState(generateInitialData(basePrice));

  const priceRef = useRef(basePrice);
  const stepRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      stepRef.current += 1;

      const newPrice = generateNextPrice(priceRef.current);

      priceRef.current = newPrice;

      setData((prev) => {
        const next = [
          ...prev,
          {
            day: `T${stepRef.current}`,
            actual: Math.round(newPrice),
            prediction: Math.round(newPrice * (1 + (Math.random() - 0.5) * 0.01)),
          },
        ];

        // keep last 30 points only (biar ringan)
        return next.slice(-30);
      });
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  return data;
}

/**
 * =========================
 * PRICE ENGINE (CORE LOGIC)
 * =========================
 */
function generateNextPrice(current) {
  const volatility = 0.02; // 2%
  const trendBias = 0.0005; // sedikit naik jangka panjang

  const randomShock = (Math.random() - 0.5) * volatility;
  const trend = trendBias;

  const change = current * (randomShock + trend);

  return Math.max(1000, current + change);
}

/**
 * INITIAL DATA
 */
function generateInitialData(base) {
  const arr = [];

  let price = base;

  for (let i = 10; i > 0; i--) {
    price = price + (Math.random() - 0.5) * base * 0.02;

    arr.push({
      day: `T-${i}`,
      actual: Math.round(price),
      prediction: Math.round(price * 1.002),
    });
  }

  return arr;
}

export default useMarketSimulator;