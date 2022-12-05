import Highcharts, { SeriesColumnOptions, SeriesOhlcOptions } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import indicators from 'highcharts/indicators/indicators';
import { useEffect, useRef, useState } from 'react';
import { getCandleByDays } from '../../api';

indicators(Highcharts);

Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
    rangeSelectorZoom: '',
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
    selected: 1,
    buttons: [
      {
        text: '일봉',
      },
      { text: '주봉' },
      {
        text: '월봉',
      },
      { text: '1분봉' },
      { text: '5분봉' },
      { text: '10분봉' },
      {
        text: '+',
      },
      {
        text: '-',
        events: {
          click: function (e) {
            console.log(Highcharts.charts[0]?.xAxis[0].setExtremes(0, 0));
            return false;
          },
        },
      },
    ],
  },
  xAxis: {
    events: {
      setExtremes: function (e) {
        console.log(e);
      },
    },
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

  useEffect(() => {
    getCandleByDays('KRW-BTC', 200).then((candles) => {
      const ohlc: SeriesOhlcOptions['data'] = [];
      const volume: SeriesColumnOptions['data'] = [];

      candles.forEach((candle, index) => {
        if (chartComponentRef.current && index === 100) {
          chartComponentRef.current.chart.xAxis[0].setExtremes(
            Date.parse(candle.candle_date_time_kst),
            Date.parse(candles[0].candle_date_time_kst),
          );
        }
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
          color: candle.opening_price < candle.trade_price ? '#c84a31' : '#1976d2',
        });
      });

      setOptions({
        series: [
          {
            type: 'candlestick',
            name: '비트코인',
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
  }, []);

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
