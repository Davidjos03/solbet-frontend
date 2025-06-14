import { formatNumber } from "@/utils/chart";
import {
    createChart,
    ColorType,
    PriceLineOptions,
    CandlestickSeries,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ChartComponent(props: any) {
    const {
        data,
        colors: {
            backgroundColor = "white",
            lineColor = "#2962FF",
            textColor = "white",
            areaTopColor = "#2962FF",
            areaBottomColor = "rgba(41, 18, 255, 0.28)",
        } = {},
    } = props;
    // console.log("🚀 ~ ChartComponent ~ data:", data);
    // conat data = [{
    //   timeStamp: "",
    //   open: "",
    //   high: "",
    //   low: "",
    //   close: "",
    // }]

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chartContainerRef = useRef<any>();

    useEffect(() => {
        const handleResize = () => {
            chart.applyOptions({
                width: chartContainerRef.current.clientWidth,
            });
            chart.applyOptions({
                height: chartContainerRef.current.clientHeight,
            });
        };

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "#272c33" },
                textColor,
                attributionLogo: false,
            },
            grid: {
                vertLines: { color: "#272c33" },
                horzLines: { color: "#444" },
            },
            width: chartContainerRef.current.clientWidth,
            //height: 600
            //width: window.innerWidth,
            height: chartContainerRef.current.clientHeight,
        });
        // console.log("🚀 ~ useEffect ~ width:", chartContainerRef.current);

        const candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor: "#26a69a",
            downColor: "#ef5350",
            borderVisible: false,
            wickUpColor: "#26a69a",
            wickDownColor: "#ef5350",
        });
        const myPriceLine: PriceLineOptions = {
            price: 0,
            color: "#3179F5",
            lineWidth: 2,
            lineStyle: 2, // LineStyle.Dashed
            axisLabelVisible: true,
            title: "price",
            lineVisible: true,
            axisLabelColor: "white",
            axisLabelTextColor: "white",
        };
        const myPriceFormatter = (p: number) =>  formatNumber(p).combined + "%";
        chart.applyOptions({
            localization: {
                priceFormatter: myPriceFormatter,
            },
        });
        candlestickSeries.createPriceLine(myPriceLine);
        candlestickSeries.setData(data);
        candlestickSeries.priceScale().applyOptions({
            autoScale: true, // disables auto scaling based on visible content
        });
        chart.timeScale().fitContent();
        chart.timeScale().applyOptions({
            barSpacing: 10,
        });
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);

            chart.remove();
        };
    }, [
        data,
        backgroundColor,
        lineColor,
        textColor,
        areaTopColor,
        areaBottomColor,
        window.innerWidth,
    ]);

    return (
        <div className="border-ton-blue-900 bg-[#272c33] rounded-lg w-full h-[95%]" ref={chartContainerRef} />
    );
}
