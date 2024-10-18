export const getAdaPrice = async () => {
    try {
      const response = await fetch('https://api.coinpaprika.com/v1/tickers/ada-cardano');
  
      if (response.ok) {
        const data = await response.json();
        const usdQuote = data.quotes.USD;
  
        return {
          rank: data.rank,
          price: Number(usdQuote.price).toFixed(2),
          marketCap: Number(usdQuote.market_cap).toLocaleString('en-US'), 
        };
      } else {
        console.error("Error fetching ADA price:", response.status);
        throw new Error("Failed to fetch ADA price");
      }
    } catch (error) {
      console.error("Error in getAdaPrice:", error);
      throw error;
    }
  };
  