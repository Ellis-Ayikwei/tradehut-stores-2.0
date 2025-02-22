// import { useState, useCallback, useEffect } from 'react';
// import { useWebSocket } from './useWebSocket';
// import axiosInstance from '../helper/axiosInstance';

// export function useBidding(productId: string) {
//   const [currentBid, setCurrentBid] = useState<number>(0);
//   const [bidHistory, setBidHistory] = useState<BidHistory[]>([]);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const ws = useWebSocket(`ws://api/bidding/${productId}`);

//   useEffect(() => {
//     if (ws) {
//       ws.onmessage = (event) => {
//         const data = JSON.parse(event.data);
//         if (data.type === 'newBid') {
//           setCurrentBid(data.amount);
//           setBidHistory(prev => [data.bid, ...prev]);
//         }
//       };
//     }
//   }, [ws, productId]);

//   const placeBid = useCallback(async (amount: number) => {
//     setIsProcessing(true);
//     setError(null);
//     try {
//       const response = await axiosInstance.post(`/api/products/${productId}/bid`, {
//         amount
//       });
//       setCurrentBid(response.data.currentBid);
//       setBidHistory(prev => [response.data.bid, ...prev]);
//       return true;
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to place bid');
//       return false;
//     } finally {
//       setIsProcessing(false);
//     }
//   }, [productId]);

//   return {
//     currentBid,
//     bidHistory,
//     isProcessing,
//     error,
//     placeBid
//   };
// }
