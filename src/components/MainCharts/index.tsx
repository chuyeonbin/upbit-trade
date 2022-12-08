import Highcharts, { SeriesColumnOptions, SeriesOhlcOptions } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import indicators from 'highcharts/indicators/indicators';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { changeCandleData } from '../../store/modules/coin';
import { CandleType } from '../../types';

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
  rangeSelector: {
    allButtonsEnabled: true,
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
  const dispatch = useDispatch();
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [options, setOptions] = useState<Highcharts.Options>(initialOptions);
  const code = useAppSelector((state) => state.coin.selectedCoin.code);
  const candles = useAppSelector((state) => state.coin.candles);

  const handleClick = (type: CandleType) => (e: Event) => {
    dispatch(changeCandleData({ type }));
    return false;
  };

  useEffect(() => {
    setOptions({
      rangeSelector: {
        buttons: [
          {
            text: '일봉',
            events: {
              click: handleClick('days'),
            },
          },
          {
            text: '주봉',
            events: {
              click: handleClick('weeks'),
            },
          },
          {
            text: '월봉',
            events: {
              click: handleClick('months'),
            },
          },
          {
            text: '1분봉',
            events: {
              click: handleClick('1minutes'),
            },
          },
          {
            text: '5분봉',
            events: {
              click: handleClick('5minutes'),
            },
          },
          {
            text: '10분봉',
            events: {
              click: handleClick('10minutes'),
            },
          },
        ],
      },
    });
  }, []);

  useEffect(() => {
    if (candles.datas.length > 0) {
      const ohlc: SeriesOhlcOptions['data'] = [];
      const volume: SeriesColumnOptions['data'] = [];
      if (chartComponentRef.current) {
        chartComponentRef.current.chart.xAxis[0].setExtremes(
          Date.parse(candles.datas[candles.datas.length - 50].dateTimeKst),
          Date.parse(candles.datas[candles.datas.length - 1].dateTimeKst),
        );
        candles.datas.forEach((candle) => {
          ohlc.push([
            Date.parse(candle.dateTimeKst),
            candle.openingPrice,
            candle.highPrice,
            candle.lowPrice,
            candle.tradePrice,
          ]);

          volume.push({
            x: Date.parse(candle.dateTimeKst),
            y: candle.accTradeVolume,
            color: candle.openingPrice <= candle.tradePrice ? '#c84a31' : '#1976d2',
          });
        });

        setOptions({
          series: [
            {
              type: 'candlestick',
              name: code,
              id: 'aapl',
              data: ohlc,
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
              data: volume,
              yAxis: 1,
            },
          ],
        });
      }
    }
  }, [candles]);

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
