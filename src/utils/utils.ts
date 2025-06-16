import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Params = {
    symbol: string;
    resolution:
    | "1"
    | "2"
    | "5"
    | "15"
    | "30"
    | "60"
    | "120"
    | "240"
    | "360"
    | "720"
    | "D"
    | "1D"
    | "W"
    | "1W"
    | "M"
    | "1M";
    from: number;
    to: number;
};

export const useTokenHistory = (params: Params) => {
    const { data, error, isLoading, dataUpdatedAt } = useQuery({
        queryKey: ["TokenPriceHistory", params],
        queryFn: () => getTokenHistoryData(params),
        refetchInterval: 1000,
    });
    return { data, error, isLoading, dataUpdatedAt };
};

export const getTokenHistoryData = async (params: Params) => {
    //console.log("🚀 ~ getTokenHistoryData ~ params:", params)
    try {
        const currentParams = {
            ...params,
            from: Math.floor(Date.now() / 1000) - 3600 * 24,
            to: Math.floor(Date.now() / 1000),
        };

        //console.log("🚀 ~ getTokenHistoryData ~ currentParams:", currentParams)
        const res = await axios.get(
            `https://benchmarks.pyth.network/v1/shims/tradingview/history`,
            { params: currentParams },
        );
        const { data } = res;
        //console.log("🚀 ~ getTokenHistoryData ~ data:", data)

        const ohlc = data.t.map((t: number, index: number) => ({
            open: data.o[index],
            high: data.h[index],
            low: data.l[index],
            close: data.c[index],
            time: t,
        }));
        // console.log("🚀 ~ ohlc ~ ohlc:", ohlc[ohlc.length - 1]);

        return ohlc;
    } catch {
        return [];
    }
};