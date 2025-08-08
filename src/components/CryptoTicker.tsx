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

  // Major cryptocurrencies to display
  const cryptoIds = [
    'bitcoin',
    'ethereum',
    'ripple',
    'tether',
    'binancecoin',
    'solana',
    'usd-coin'
  ];

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoIds.join(',')}&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en`
        );
        
        if (response.ok) {
          const data = await response.json();
          setCryptoData(data);
        }
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        // Fallback data in case API fails
        setCryptoData([
          {
            id: 'bitcoin',
            symbol: 'btc',
            name: 'Bitcoin',
            image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
            current_price: 45000,
            market_cap: 850000000000,
            price_change_percentage_24h: 2.5
          },
          {
            id: 'ethereum',
            symbol: 'eth',
            name: 'Ethereum',
            image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
            current_price: 2800,
            market_cap: 340000000000,
            price_change_percentage_24h: 1.8
          },
          {
            id: 'ripple',
            symbol: 'xrp',
            name: 'XRP',
            image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
            current_price: 0.55,
            market_cap: 30000000000,
            price_change_percentage_24h: -0.5
          },
          {
            id: 'tether',
            symbol: 'usdt',
            name: 'Tether',
            image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
            current_price: 1.00,
            market_cap: 95000000000,
            price_change_percentage_24h: 0.01
          },
          {
            id: 'binancecoin',
            symbol: 'bnb',
            name: 'BNB',
            image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
            current_price: 320,
            market_cap: 48000000000,
            price_change_percentage_24h: 3.2
          },
          {
            id: 'solana',
            symbol: 'sol',
            name: 'Solana',
            image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
            current_price: 95,
            market_cap: 42000000000,
            price_change_percentage_24h: 5.8
          },
          {
            id: 'usd-coin',
            symbol: 'usdc',
            name: 'USDC',
            image: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
            current_price: 1.00,
            market_cap: 32000000000,
            price_change_percentage_24h: 0.02
          }
        ]);
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

  return (
    <div className="fixed top-0 left-0 w-full h-12 bg-[#0C122C] border-b border-[#2E3E5A] z-[7] overflow-hidden">
      <div className="flex items-center h-full animate-scroll-x">
        {cryptoData.map((crypto) => (
          <div
            key={crypto.id}
            className={`flex items-center gap-3 px-6 py-2 min-w-max ${
              crypto.symbol === 'xrp' ? 'bg-yellow-500/20' : ''
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