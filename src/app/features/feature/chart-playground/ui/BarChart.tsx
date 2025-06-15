import type { EChartsOption } from 'echarts/types/dist/shared';
import ReactEcharts from 'echarts-for-react';
import { forwardRef, useMemo } from 'react';

import type { EditableTableRow } from '@/app/features/component/table';

import type { BarTableEntity } from '../model';

interface Props {
  dataSource: EditableTableRow<BarTableEntity>[];
}

function BarChart(
  { dataSource }: Props,
  ref: React.ForwardedRef<ReactEcharts>,
) {
  const formattedOptions = useMemo<EChartsOption>(
    () => ({
      grid: {
        bottom: '10%',
        containLabel: true,
        left: '3%',
        right: '3%',
        top: '5%',
      },
      legend: {
        bottom: 0,
        itemWidth: 16,
      },
      series: dataSource.map((record, _, array) => ({
        barGap: '12%',
        barWidth: record.stackId ? '7.5%' : '18%',
        data: [
          record.monday,
          record.tuesday,
          record.wednesday,
          record.thursday,
          record.friday,
          record.saturday,
          record.sunday,
        ],
        emphasis: {
          focus: 'series',
        },
        markLine: record?.emphasis
          ? {
              data: [[{ type: 'min' }, { type: 'max' }]],
              lineStyle: {
                type: 'dashed',
              },
            }
          : undefined,
        name: record.name,
        stack: array?.find(item => item.id === record.stackId)?.name,
        type: 'bar',
      })),
      toolbox: {
        feature: {
          brush: {
            show: false,
          },
          dataView: {
            show: false,
          },
          dataZoom: {
            yAxisIndex: 'none',
          },
          magicType: {
            type: ['line', 'bar'],
          },
          restore: {
            show: false,
          },
          saveAsImage: {},
        },
        show: true,
      },
      tooltip: {
        axisPointer: {
          type: 'shadow',
        },
        trigger: 'axis',
      },
      xAxis: [
        {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          type: 'category',
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
    }),
    [dataSource],
  );

  const option: EChartsOption = {
    grid: {
      bottom: '3%',
      containLabel: true,
      left: '3%',
      right: '3%',
    },
    legend: {
      itemWidth: 16,
    },
    series: [
      {
        data: [320, 332, 301, 334, 390, 330, 320],
        emphasis: {
          focus: 'series',
        },
        name: 'Direct',
        type: 'bar',
      },
      {
        data: [120, 132, 101, 134, 90, 230, 210],
        emphasis: {
          focus: 'series',
        },
        name: 'Email',
        stack: 'Ad',
        type: 'bar',
      },
      {
        data: [220, 182, 191, 234, 290, 330, 310],
        emphasis: {
          focus: 'series',
        },
        name: 'Union Ads',
        stack: 'Ad',
        type: 'bar',
      },
      {
        data: [150, 232, 201, 154, 190, 330, 410],
        emphasis: {
          focus: 'series',
        },
        name: 'Video Ads',
        stack: 'Ad',
        type: 'bar',
      },
      {
        data: [862, 1018, 964, 1026, 1679, 1600, 1570],
        emphasis: {
          focus: 'series',
        },
        markLine: {
          data: [[{ type: 'min' }, { type: 'max' }]],
          lineStyle: {
            type: 'dashed',
          },
        },
        name: 'Search Engine',
        type: 'bar',
      },
      {
        barWidth: 5,
        data: [620, 732, 701, 734, 1090, 1130, 1120],
        emphasis: {
          focus: 'series',
        },
        name: 'Baidu',
        stack: 'Search Engine',
        type: 'bar',
      },
      {
        data: [120, 132, 101, 134, 290, 230, 220],
        emphasis: {
          focus: 'series',
        },
        name: 'Google',
        stack: 'Search Engine',
        type: 'bar',
      },
      {
        data: [60, 72, 71, 74, 190, 130, 110],
        emphasis: {
          focus: 'series',
        },
        name: 'Bing',
        stack: 'Search Engine',
        type: 'bar',
      },
      {
        data: [62, 82, 91, 84, 109, 110, 120],
        emphasis: {
          focus: 'series',
        },
        name: 'Others',
        stack: 'Search Engine',
        type: 'bar',
      },
    ],
    tooltip: {
      axisPointer: {
        type: 'shadow',
      },
      trigger: 'axis',
    },
    xAxis: [
      {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        type: 'category',
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
  };

  return (
    <ReactEcharts
      className="h-full"
      option={formattedOptions ?? option}
      ref={ref}
    />
  );
}

export default forwardRef(BarChart);
