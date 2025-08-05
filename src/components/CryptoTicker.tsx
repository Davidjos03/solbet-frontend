import { useEffect, useState } from 'react';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

const CryptoTicker = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);

  // Popular memecoins to display
  const cryptoIds = [
    'dogecoin',
    'bonk',
    'dogwifhat',
    'floki',
    'shiba-inu',
    'pepe',
    'doge',
    'baby-doge-coin'
  ];

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoIds.join(',')}&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch crypto data');
        }
        
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        // Fallback data in case API fails
        setCryptoData([
          {
            id: 'dogecoin',
            symbol: 'doge',
            name: 'Dogecoin',
            image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
            current_price: 0.12,
            market_cap: 12400000000,
            price_change_percentage_24h: 2.34
          },
          {
            id: 'bonk',
            symbol: 'bonk',
            name: 'Bonk',
            image: 'https://assets.coingecko.com/coins/images/28600/large/bonk.jpg',
            current_price: 0.000023,
            market_cap: 2300000000,
            price_change_percentage_24h: 12.45
          },
          {
            id: 'dogwifhat',
            symbol: 'wif',
            name: 'dogwifhat',
            image: 'https://assets.coingecko.com/coins/images/35085/large/wif.jpg',
            current_price: 2.34,
            market_cap: 3400000000,
            price_change_percentage_24h: -3.21
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchCryptoData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(1)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(1)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(1)}M`;
    } else {
      return `$${marketCap.toLocaleString()}`;
    }
  };



  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-12 bg-[#] border-b border-[#2E3E5A] z-[7] flex items-center justify-center">
        <div className="text-white text-sm">Loading crypto data...</div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-12 bg-[#0C122C] border-b border-[#2E3E5A] z-[7] overflow-hidden">
      <div className="flex items-center h-full animate-scroll-x">
        {cryptoData.map((crypto, index) => (
          <div
            key={crypto.id}
            className={`flex items-center gap-3 px-6 py-2 min-w-max ${
              index === 0 ? 'bg-yellow-500/20' : ''
            }`}
          >
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-6 h-6 rounded-full"
            />
            <div className="flex items-center gap-2 text-white">
              <span className="font-semibold text-sm">{crypto.name}</span>
              <span className="text-xs text-gray-300">
                {formatMarketCap(crypto.market_cap)}
              </span>
              <span
                className={`text-xs font-medium ${
                  crypto.price_change_percentage_24h >= 0
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
        {/* Duplicate items for seamless scrolling */}
        {cryptoData.map((crypto) => (
          <div
            key={`${crypto.id}-duplicate`}
            className="flex items-center gap-3 px-6 py-2 min-w-max"
          >
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-6 h-6 rounded-full"
            />
            <div className="flex items-center gap-2 text-white">
              <span className="font-semibold text-sm">{crypto.name}</span>
              <span className="text-xs text-gray-300">
                {formatMarketCap(crypto.market_cap)}
              </span>
              <span
                className={`text-xs font-medium ${
                  crypto.price_change_percentage_24h >= 0
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoTicker; 