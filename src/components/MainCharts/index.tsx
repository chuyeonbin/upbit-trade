import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import indicators from 'highcharts/indicators/indicators';

indicators(Highcharts);

Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
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
    height: 20,
  },
  rangeSelector: {
    selected: 1,
    inputEnabled: false,
    buttons: [
      { type: 'day', count: 1, text: '일봉' },
      { type: 'week', count: 1, text: '주봉' },
      { type: 'month', count: 1, text: '월봉' },
      { type: 'minute', count: 1, text: '1분봉' },
      { type: 'minute', count: 1, text: '5분봉' },
      { type: 'minute', count: 1, text: '10분봉' },
    ],
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
  series: [],
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
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={initialOptions}
      />
    </div>
  );
}
