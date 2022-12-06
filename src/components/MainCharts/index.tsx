import Highcharts, { SeriesColumnOptions, SeriesOhlcOptions } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import indicators from 'highcharts/indicators/indicators';
import { useEffect, useRef, useState } from 'react';
import { getCandleByDays, getCandleByMinutes } from '../../api';
import { useAppSelector } from '../../store/store';

indicators(Highcharts);

Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
    rangeSelectorZoom: '',
  },
  time: {
    useUTC: false,
  },
});
const initialOptions: Highcharts.Options = {
  chart: {
    width: 990,
    height: 450,
  },
  lang: {
    thousandsSep: ',',
  },
  accessibility: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  navigator: {
    enabled: false,
  },
  scrollbar: {
    enabled: false,
  },
  rangeSelector: {
    inputEnabled: false,
  },
  yAxis: [
    {
      labels: {
        align: 'right',
        x: -3,
        formatter: function () {
          return Highcharts.numberFormat(Number(this.value), 0, '', ',');
        },
      },
      height: '80%',
      lineWidth: 2,
      crosshair: {
        snap: false,
      },
    },
    {
      labels: {
        align: 'right',
        x: -3,
      },
      top: '80%',
      height: '20%',
      offset: 0,
      lineWidth: 2,
    },
  ],
  plotOptions: {
    candlestick: {
      color: '#1976d2',
      upColor: '#c84a31',
    },
    sma: {
      linkedTo: 'aapl',
      lineWidth: 0.8,
      zIndex: 1,
      marker: {
        enabled: false,
      },
      enableMouseTracking: false,
    },
  },
  tooltip: {
    style: {
      fontSize: '10px',
    },
    backgroundColor: 'rgba(255,255,255, 0.8)',
    borderWidth: 0,
    shadow: false,
  },
};

export default function MainCharts() {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [options, setOptions] = useState<Highcharts.Options>(initialOptions);
  const code = useAppSelector((state) => state.coin.selectedCoin.code);

  useEffect(() => {
    getCandleByMinutes(code, 1, 200).then((candles) => {
      const ohlc: SeriesOhlcOptions['data'] = [];
      const volume: SeriesColumnOptions['data'] = [];

      if (chartComponentRef.current) {
        chartComponentRef.current.chart.xAxis[0].setExtremes(
          Date.parse(candles[80].candle_date_time_kst),
          Date.parse(candles[0].candle_date_time_kst),
        );
      }

      candles.forEach((candle) => {
        ohlc.push([
          Date.parse(candle.candle_date_time_kst),
          candle.opening_price,
          candle.high_price,
          candle.low_price,
          candle.trade_price,
        ]);

        volume.push({
          x: Date.parse(candle.candle_date_time_kst),
          y: Math.round(candle.candle_acc_trade_volume),
          color: candle.opening_price <= candle.trade_price ? '#c84a31' : '#1976d2',
        });
      });

      setOptions({
        rangeSelector: {
          buttons: [
            { text: '일봉' },
            { text: '주봉' },
            { text: '월봉' },
            { text: '1분봉' },
            { text: '5분봉' },
            { text: '10분봉' },
          ],
        },
        series: [
          {
            type: 'candlestick',
            name: code,
            id: 'aapl',
            data: ohlc.reverse(),
          },
          {
            type: 'sma',
            params: {
              period: 15,
            },
            color: 'red',
          },
          {
            type: 'sma',
            params: {
              period: 50,
            },
            color: 'lightGreen',
          },
          {
            type: 'column',
            name: 'Volume',
            data: volume.reverse(),
            yAxis: 1,
          },
        ],
      });
    });
  }, [code]);

  return (
    <div>
      <HighchartsReact
        ref={chartComponentRef}
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    </div>
  );
}
