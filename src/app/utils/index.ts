export const payload = {
    "e": "aggTrade",  // Event type
    "E": 123456789,   // Event time
    "s": "BNBBTC",    // Symbol
    "a": 12345,       // Aggregate trade ID
    "p": "0.001",     // Price
    "q": "100",       // Quantity
    "f": 100,         // First trade ID
    "l": 105,         // Last trade ID
    "T": 123456785,   // Trade time
    "m": true,        // Is the buyer the market maker?
    "M": true         // Ignore
} as const

export type TradeData = typeof payload;
export type TAttributes = keyof typeof payload;
export type TValues = typeof payload[TAttributes];
  
export const getSymbolValue = (value: TAttributes): string => {
  switch (value) {
    case "e":
      return "EventType"
    case "E":
      return "EventTime"
    case "s":
      return "Symbol"
    case "a":
      return "AggregateTID"
    case "p":
      return "Price"
    case "q":
      return "Quantity"
    case "f":
      return "FirstTID"
    case "l":
      return "LastTID"
    case "T":
      return "TradeTime"
    case "m":
      return "buyer"
    case "M":
      return "Ignore"
  }
}

export const getKeyFromSymbol = (value: string): string => {
  switch (value) {
    case "EventType":
      return "e"
    case "EventTime":
      return "E"
    case "Symbol":
      return "s"
    case "AggregateTID":
      return "a"
    case "Price":
      return "p"
    case "Quantity":
      return "q"
    case "FirstTID":
      return "f"
    case "LastTID":
      return "l"
    case "TradeTime":
      return "T"
    case "buyer":
      return "m"
    case "Ignore":
      return "M"
  }
  return ""
}
  
export const WS_URL = "wss://stream.binance.com:9443/ws/bnbbtc@trade"