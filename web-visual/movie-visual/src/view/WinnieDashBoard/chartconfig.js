import * as echarts from 'echarts'

//echart图表渲染：通过chartconfig.js封装的函数初始化6大图表

/**
 * 1. 电影评分TOP20图表（柱状图）
 */
export const initTop20Chart = (data) => {
  const chartDom = document.getElementById('top20-chart')
  const myChart = echarts.init(chartDom)
  const movieNames = data.map(item => item.movieName)
  const ratings = data.map(item => item.rating)
  const voteCounts = data.map(item => item.voteCount)

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        const index = params[0].dataIndex
        return `
          <div style="fontFamily:'Comic Sans MS';padding:8px;">
            <div style="font-weight:bold;color:#6d4c41;font-size:14px;">${movieNames[index]}</div>
            <div style="color:#ff9800;margin-top:5px;">评分：${ratings[index]} 分</div>
            <div style="color:#8d6e63;margin-top:3px;">投票数：${voteCounts[index].toLocaleString()} 人</div>
          </div>
        `
      },
      backgroundColor: 'rgba(255, 250, 240, 0.95)',
      borderColor: '#ffcc80',
      borderWidth: 2,
      borderRadius: 10,
      boxShadow: '0 2px 8px rgba(255, 193, 7, 0.2)'
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '0%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: movieNames,
      axisLine: {
        lineStyle: {
          color: '#ffcc80'
        }
      },
      axisTick: {
        show: false,
        alignWithLabel: true
      },
      axisLabel: {
        color: '#6d4c41',
        fontFamily: 'Comic Sans MS',
        fontSize: 11,
        rotate: 10,
        align: 'right',
        margin: 10,
        interval: 1
      }
    },
    yAxis: {
      type: 'value',
      name: '评分',
      nameTextStyle: {
        color: '#ff9800',
        fontFamily: 'Comic Sans MS',
        fontSize: 15,
        textShadowColor: 'rgba(255, 152, 0, 0.5)',
        textShadowBlur: 3
      },
      axisLine: {
        lineStyle: {
          color: '#ffcc80'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 204, 128, 0.3)'
        }
      },
      axisLabel: {
        color: '#6d4c41',
        fontFamily: 'Comic Sans MS',
        textShadowColor: 'rgba(255, 215, 0, 0.3)',
        textShadowBlur: 2
      },
      min: 3,
      max: 4.5
    },
    series: [
      {
        name: '阴影',
        type: 'bar',
        data: ratings,
        barWidth: '40%',
        itemStyle: {
          color: 'rgba(220, 220, 220, 0.3)',
          borderRadius: [8, 8, 0, 0],
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10,
          shadowOffsetY: 6
        },
        z: 1,
        data: ratings.map((item, index) => {
          return {
            value: item,
            voteCount: voteCounts[index]
          }
        })
      },
      {
        name: '电影评分',
        type: 'bar',
        data: ratings,
        barWidth: '50%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#ffd54f' },
            { offset: 0.5, color: '#ffc107' },
            { offset: 1, color: '#ff9800' }
          ]),
          borderRadius: [8, 8, 0, 0],
          borderColor: '#ff7043',
          borderWidth: 1,
          shadowColor: 'rgba(255, 152, 0, 0.4)',
          shadowBlur: 10,
          shadowOffsetY: 5,
          animationDuration: 2000,
          animationEasingUpdate: 'quinticInOut',
          emphasis: {
            focus: 'series',
          }
        },
        label: {
          show: true,
          position: 'top',
          color: '#6d4c41',
          fontFamily: 'Comic Sans MS',
          fontSize: 12
        },
        encode: {
          tooltip: [2]
        },
        z: 2,
        data: ratings.map((item, index) => {
          return {
            value: item,
            voteCount: voteCounts[index]
          }
        })
      },
      {
        name: '高光',
        type: 'bar',
        data: ratings.map(v => v > 0 ? 0.4 : 0),
        barWidth: '30%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(255, 255, 255, 0.9)' },
            { offset: 1, color: 'rgba(255, 255, 255, 0.3)' }
          ]),
          borderRadius: [8, 8, 0, 0],
          borderWidth: 0
        },
        z: 3,
        label: { show: false }
      }
    ]
  }

  myChart.setOption(option)
  return myChart
}

/**
 * 2. 电影类型分布图表（饼图）
 */
export const initGenreChart = (data) => {
  const chartDom = document.getElementById('genre-chart')
  if (!chartDom) return null

  const myChart = echarts.init(chartDom)

  // 颜色数组
  const WINNIE_COLORS = [
    '#FFB300', '#FF9800', '#FF7043', '#F57F17', '#8B4513',
    '#FFECB3', '#FFCC80', '#FFB74D', '#FFA726', '#FB8C00',
    '#F9A825', '#E65100'
  ]

  const formattedData = Array.isArray(data)
    ? data.map((item, index) => ({
        name: item.genre || item.name,
        value: item.count || item.value
      }))
    : []

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      type: 'scroll', // 滚动图例（避免溢出）
      orient: 'vertical',
      left: 'left',
      top: 'center',
      data: formattedData.map(item => item.name),
      textStyle: {
        color: '#5D4037',
        fontFamily: "'Comic Sans MS', sans-serif"
      }
    },
    series: [{
      name: '电影类型',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['60%', '50%'],
      data: formattedData,
      color: WINNIE_COLORS,
      itemStyle: {
        borderColor: '#FFF3E0',
        borderWidth: 2,
        borderRadius: 8
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  }

  myChart.setOption(option)

  setTimeout(() => {
    const legendItems = chartDom.querySelectorAll('.ec-legend-item')
    legendItems.forEach((item, index) => {
      const icon = item.querySelector('.ec-legend-icon')
      if (icon) {
        icon.style.backgroundColor = WINNIE_COLORS[index % WINNIE_COLORS.length]
        icon.style.border = '5px solid #FFF3E0'
        icon.style.borderRadius = '5px'
      }
    })
  }, 100)

  return myChart
}

/**
 * 3. 用户年龄分布图表（柱状图）
 */
export const initUserChart = (data) => {
  const chartDom = document.getElementById('user-chart')
  const myChart = echarts.init(chartDom)

  const ageGroups = data.map(item => item.ageGroup)
  const userCounts = data.map(item => item.userCount)

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        const index = params[0].dataIndex
        return `
          <div style="fontFamily:'Comic Sans MS';padding:8px;">
            <div style="font-weight:bold;color:#6d4c41;font-size:14px;">${ageGroups[index]}</div>
            <div style="color:#ff9800;margin-top:5px;">用户数：${userCounts[index].toLocaleString()} 人</div>
          </div>
        `
      },
      backgroundColor: 'rgba(255, 250, 240, 0.95)',
      borderColor: '#ffcc80',
      borderWidth: 2,
      borderRadius: 10,
      boxShadow: '0 2px 8px rgba(255, 193, 7, 0.2)'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ageGroups,
      axisLine: {
        lineStyle: {
          color: '#ffcc80'
        }
      },
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        color: '#6d4c41',
        fontFamily: 'Comic Sans MS',
        fontSize: 12,
        textShadowColor: 'rgba(255, 215, 0, 0.3)',
        textShadowBlur: 2
      }
    },
    yAxis: {
      type: 'value',
      name: '用户数',
      nameTextStyle: {
        color: '#ff9800',
        fontFamily: 'Comic Sans MS',
        fontSize: 14,
        textShadowColor: 'rgba(255, 152, 0, 0.5)',
        textShadowBlur: 3
      },
      axisLine: {
        lineStyle: {
          color: '#ffcc80'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 204, 128, 0.3)'
        }
      },
      axisLabel: {
        color: '#6d4c41',
        fontFamily: 'Comic Sans MS',
        textShadowColor: 'rgba(255, 215, 0, 0.3)',
        textShadowBlur: 2
      }
    },
    series: [
      {
        name: '阴影',
        type: 'bar',
        data: userCounts,
        barWidth: '60%',
        itemStyle: {
          color: 'rgba(220, 220, 220, 0.3)',
          borderRadius: [0, 8, 8, 0],
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10,
          shadowOffsetY: 6
        },
        z: 1
      },
      {
        name: '用户数量',
        type: 'bar',
        data: userCounts,
        barWidth: '60%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#ffecb3' },
            { offset: 0.5, color: '#ffc107' },
            { offset: 1, color: '#ffb300' }
          ]),
          borderRadius: [0, 8, 8, 0],
          borderColor: '#ff9800',
          borderWidth: 1,
          shadowColor: 'rgba(255, 152, 0, 0.4)',
          shadowBlur: 10,
          shadowOffsetY: 5
        },
        label: {
          show: true,
          position: 'top',
          color: '#6d4c41',
          fontFamily: 'Comic Sans MS',
          fontSize: 12,
          textShadowColor: 'rgba(255, 215, 0, 0.5)',
          textShadowBlur: 3
        },
        z: 2
      },
      {
        name: '高光',
        type: 'bar',
        data: userCounts.map(v => v > 0 ? 0.4 : 0),
        barWidth: '60%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: 'rgba(255, 255, 255, 0.9)' },
            { offset: 1, color: 'rgba(255, 255, 255, 0.3)' }
          ]),
          borderRadius: [0, 8, 8, 0],
          borderWidth: 0
        },
        z: 3
      }
    ]
  }

  myChart.setOption(option)
  return myChart
}


/**
 * 4. 用户画像分析（桑基图）
 */
export const initUserPortraitSankeyChart = (data) => {
  const chartDom = document.getElementById('user-portrait-chart');
  if (!chartDom) {
    console.error('用户画像桑基图容器不存在');
    return null;
  }
  const myChart = echarts.init(chartDom);

  const colorMap = {
    age: ['#ffd54f', '#ffcc80', '#ffb74d', '#ffab40', '#ff9800', '#f57f17'],
    gender: ['#f57f17', '#008000'],
    occupation: ['#8B4513', '#6d4c41', '#5d4037', '#795548', '#a1887f']
  };

  const nodeYMap = { age: [], gender: [], occupation: [] };
  data.nodes.forEach(node => {
    if (node.name.startsWith('年龄:')) nodeYMap.age.push(node);
    else if (node.name.startsWith('性别:')) nodeYMap.gender.push(node);
    else if (node.name.startsWith('职业:')) nodeYMap.occupation.push(node);
  });

  const assignNodeY = (nodes, totalHeight, type) => {
    let fixedNodeHeight = 30;
    let gap = 15;
    if (type === 'gender') {
      fixedNodeHeight = 20;
      gap = 10;
    }

    const totalOccupiedHeight = nodes.length * fixedNodeHeight + (nodes.length - 1) * gap;
    const topMargin = (totalHeight - totalOccupiedHeight) / 2;

    return nodes.map((node, index) => ({
      ...node,
      y: topMargin + index * (fixedNodeHeight + gap) + fixedNodeHeight / 2,
      height: fixedNodeHeight
    }));
  };

  const chartHeight = myChart.getDom().clientHeight || 400;
  const categorizedNodes = [
    ...assignNodeY(nodeYMap.age, chartHeight, 'age'),
    ...assignNodeY(nodeYMap.gender, chartHeight, 'gender'),
    ...assignNodeY(nodeYMap.occupation, chartHeight, 'occupation')
  ];

  const processedNodes = categorizedNodes.map(node => {
    let color = '#e0e0e0';
    if (node.name.startsWith('年龄:')) {
      const ageIndex = nodeYMap.age.findIndex(item => item.name === node.name);
      color = colorMap.age[ageIndex % colorMap.age.length];
    }
    else if (node.name.startsWith('性别:')) {
      const genderIndex = node.name.includes('女') ? 0 : 1;
      color = colorMap.gender[genderIndex];
    }
    else if (node.name.startsWith('职业:')) {
      const jobIndex = nodeYMap.occupation.findIndex(item => item.name === node.name);
      color = colorMap.occupation[jobIndex % colorMap.occupation.length];
    }
    return {
      ...node,
      itemStyle: { color, borderColor: '#fff', borderWidth: 1 }
    };
  });

  const option = {
    backgroundColor: 'transparent',
    legend: {
      show: false,
      top: '10px',
      right: '10px',
      orient: 'vertical',
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        fontSize: 12,
        color: '#6d4c41',
        fontFamily: 'Comic Sans MS'
      }
    },
    tooltip: {
      trigger: 'item',
      padding: [10, 15],
      backgroundColor: 'rgba(255, 245, 225, 0.9)',
      borderColor: '#ffcc80',
      borderWidth: 2,
      borderRadius: 8,
      textStyle: {
        color: '#6d4c41',
        fontFamily: 'Comic Sans MS',
        fontSize: 13
      },
      formatter: (params) => {
        const name = params.name.replace(/年龄:|性别:|职业:/g, '');
        const count = params.data.value || 0;
        if (params.dataType === 'link') {
          const sourceName = params.sourceName.replace(/年龄:|性别:|职业:/g, '');
          const targetName = params.targetName.replace(/年龄:|性别:|职业:/g, '');
          return `${sourceName} → ${targetName}<br/>用户数：${count}`;
        } else {
          return `${name}<br/>用户数：${count}`;
        }
      }
    },
    series: [
      {
        type: 'sankey',
        layout: 'none',
        nodeAlign: 'left',
        nodeWidth: 15,
        nodeGap: 11,
        data: processedNodes.map(node => ({
          ...node,
          x: node.category * (myChart.getDom().clientWidth || 700) / 3,
          height: node.name.startsWith('性别:') ? 20 : 30
        })),
        links: data.links.map(link => ({
          ...link,
          lineStyle: {
            color: 'gradient',
            curveness: 0.5,
            opacity: 0.7,
            width: Math.min(link.value * 1.2, 6)
          }
        })),
        emphasis: {
          focus: 'adjacency',
          itemStyle: {
            shadowBlur: 8,
            shadowColor: 'rgba(255, 204, 128, 0.5)'
          }
        },
        label: {
          show: true,
          fontSize: 12,
          fontFamily: 'Comic Sans MS',
          color: '#6d4c41',
          formatter: (params) => {
            const name = params.name.replace(/年龄:|性别:|职业:/g, '');
            return name;
          },
          position: function(params) {
            if (params.name.startsWith('年龄:')) {
              return ['-150%', '50%'];
            } else if (params.name.startsWith('性别:')) {
              return ['180%', '50%'];
            } else if (params.name.startsWith('职业:')) {
              return ['180%', '50%'];
            }
            return 'right';
          },
          padding: [2, 8, 2, 8],
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: '#ffcc80',
          borderWidth: 1,
          borderRadius: 4,
          align: function(params) {
            if (params.name.startsWith('年龄:')) {
              return 'right';
            } else {
              return 'left';
            }
          },
          verticalAlign: 'middle',
          minWidth: 40,
          overflow: 'truncate',
          textShadowColor: '#fff',
          textShadowBlur: 5,
          textShadowOffsetX: 0,
          textShadowOffsetY: 0
        }
      }
    ]
  };

  myChart.setOption(option);
  return myChart;
};

/**
 * 5. 用户观影行为图表（折线图）
 */
export const initUserBehaviorChart = (data) => {
  const chartDom = document.getElementById('user-behavior-chart')
  const myChart = echarts.init(chartDom)

  const ageSegments = [...new Set(data.map(item => item.user_age_segment))].filter(age => age)
  const movieTypes = [...new Set(data.map(item => item.movie_type))]
  const typeColors = {
    'Action': '#ff9800',
    'Comedy': '#ffb300',
    'Drama': '#8B4513',
    'Adventure': '#f57f17',
    'Animation': '#FFCC80'
  }

  const seriesData = movieTypes.map(type => {
    return {
      name: type,
      type: 'line',
      data: ageSegments.map(age => {
        const item = data.find(i => i.user_age_segment === age && i.movie_type === type)
        return item ? item.avg_view_freq : 0
      }),
      lineStyle: { color: typeColors[type], width: 2 },
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: { color: typeColors[type], borderColor: '#fff', borderWidth: 2 },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: `${typeColors[type]}80` },
          { offset: 1, color: `${typeColors[type]}10` }
        ])
      }
    }
  })

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const age = ageSegments[params[0].dataIndex]
        return `
          <div style="fontFamily:'Comic Sans MS';padding:8px;">
            <div style="font-weight:bold;color:#6d4c41;font-size:14px;">${age}岁用户</div>
            ${params.map(p => `<div style="color:${p.color};margin-top:3px;">${p.seriesName}：${p.value} 次/天</div>`).join('')}
          </div>
        `
      },
      backgroundColor: 'rgba(255, 250, 240, 0.95)',
      borderColor: '#ffcc80',
      borderWidth: 2,
      borderRadius: 10
    },
    legend: {
      data: movieTypes,
      top: '0%',
      textStyle: { color: '#6d4c41', fontFamily: 'Comic Sans MS', fontSize: 12 }
    },
    grid: { left: '8%', right: '5%', bottom: '5%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ageSegments,
      axisLine: { lineStyle: { color: '#ffcc80' } },
      axisLabel: { color: '#6d4c41', fontFamily: 'Comic Sans MS', fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      name: '平均观影频次（次/天）',
      nameTextStyle: { color: '#ff9800', fontFamily: 'Comic Sans MS', fontSize: 14 },
      axisLine: { lineStyle: { color: '#ffcc80' } },
      splitLine: { lineStyle: { color: 'rgba(255, 204, 128, 0.3)' } },
      axisLabel: { color: '#6d4c41', fontFamily: 'Comic Sans MS' }
    },
    series: seriesData
  }

  myChart.setOption(option)
  return myChart
}


/**
 * 6. 电影类型性能图表（气泡图）
 */
export const initMovieTypePerformanceChart = (data) => {
  const chartDom = document.getElementById('movie-type-performance-chart')
  const myChart = echarts.init(chartDom)

  const processedData = data.map(item => {
    const viewNum = item.total_view_num > 0 ? item.total_view_num / 10000000 : 0;
    const activeUsers = item.active_user_num / 1000000;
    const score = item.avg_score || 0;
    return {
      name: item.movie_type,
      viewNum,
      activeUsers,
      score,
      rawView: item.total_view_num,
      rawActive: item.active_user_num
    };
  });

  const customTypeColors = {
    'Action': ['rgba(255, 213, 79, 0.7)', 'rgba(255, 179, 0, 1)'],
    'Comedy': ['rgba(255, 183, 77, 0.7)', 'rgba(255, 152, 0, 0.7)'],
    'Drama': ['rgba(255, 152, 0, 0.7)', 'rgba(245, 127, 23, 0.8)'],
    'Sci-Fi': ['rgba(245, 127, 23, 0.7)', 'rgba(230, 81, 0, 0.5)'],
    'Romance': ['rgba(255, 112, 67, 0.7)', 'rgba(211, 47, 47, 0.5)']
  };

  const defaultColorList = [
    ['rgba(255, 220, 100, 0.7)', 'rgba(255, 190, 50, 0.8)'],
    ['rgba(255, 200, 80, 0.7)', 'rgba(255, 170, 30, 0.8)'],
    ['rgba(255, 180, 60, 0.7)', 'rgba(255, 150, 10, 0.8)'],
    ['rgba(240, 160, 50, 0.7)', 'rgba(230, 130, 20, 0.8)'],
    ['rgba(230, 140, 40, 0.7)', 'rgba(220, 110, 30, 0.8)'],
    ['rgba(220, 120, 30, 0.7)', 'rgba(210, 90, 40, 0.8)']
  ];

  const bubbleData = processedData.map((item, index) => {
    if (customTypeColors[item.name]) {
      return {
        name: item.name,
        value: [item.viewNum, item.activeUsers, item.score],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: customTypeColors[item.name][0] },
            { offset: 1, color: customTypeColors[item.name][1] }
          ])
        }
      };
    }
    const colorPair = defaultColorList[index % defaultColorList.length];
    return {
      name: item.name,
      value: [item.viewNum, item.activeUsers, item.score],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          { offset: 0, color: colorPair[0] },
          { offset: 1, color: colorPair[1] }
        ])
      }
    };
  });

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        const [viewNum, activeUsers, score] = params.value;
        const rawData = processedData.find(item => item.name === params.name);
        return `
          <div style="fontFamily:'Comic Sans MS';padding:8px;min-width:180px;">
            <div style="font-weight:bold;color:#6d4c41;font-size:14px;">${params.name}</div>
            <div style="color:#ff9800;margin-top:3px;">总播放量：${rawData.rawView.toLocaleString()} 次</div>
            <div style="color:#8B4513;margin-top:3px;">活跃用户：${rawData.rawActive.toLocaleString()} 人</div>
            <div style="color:#f57f17;margin-top:3px;">平均评分：${score} 分</div>
          </div>
        `;
      },
      backgroundColor: 'rgba(255, 250, 240, 0.95)',
      borderColor: '#ffcc80',
      borderWidth: 2,
      borderRadius: 10
    },
    legend: {
      data: processedData.map(item => item.name),
      top: '0%',
      textStyle: { color: '#6d4c41', fontFamily: 'Comic Sans MS', fontSize: 12 },
      itemGap: 15,
      type: 'scroll',
      orient: 'horizontal',
      bottom: '0%'
    },
    grid: {
      left: '5%',
      right: '18%',
      bottom: '10%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: '总播放量（千万次）',
      nameTextStyle: { color: '#ff9800', fontFamily: 'Comic Sans MS', fontSize: 14 },
      axisLine: { lineStyle: { color: '#ffcc80' } },
      splitLine: { lineStyle: { color: 'rgba(255, 204, 128, 0.3)' } },
      axisLabel: { color: '#6d4c41', fontFamily: 'Comic Sans MS' },
      min: function(value) { return Math.max(0, value.min * 0.8); },
      max: function(value) { return value.max * 1.2; }
    },
    yAxis: {
      type: 'value',
      name: '活跃用户（百万）',
      nameTextStyle: { color: '#ff9800', fontFamily: 'Comic Sans MS', fontSize: 14 },
      axisLine: { lineStyle: { color: '#ffcc80' } },
      splitLine: { lineStyle: { color: 'rgba(255, 204, 128, 0.3)' } },
      axisLabel: { color: '#6d4c41', fontFamily: 'Comic Sans MS' },
      min: function(value) { return Math.max(0, value.min * 0.8); },
      max: function(value) { return value.max * 1.2; }
    },
    series: [
      {
        name: '电影类型性能',
        type: 'scatter',
        data: bubbleData,
        symbolSize: function (params) {
          const score = params[2];
          return score * 8 + 10;
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(255, 152, 0, 0.7)',
            borderWidth: 3,
            borderColor: '#fff',
            opacity: 1
          },
          label: {
            show: true,
            formatter: '{b}',
            color: '#6d4c41',
            fontFamily: 'Comic Sans MS',
            fontSize: 12
          }
        },
        progressiveThreshold: 100,
        zlevel: 2
      }
    ]
  };

  myChart.setOption(option);
  window.addEventListener('resize', () => {
    myChart.resize();
  });
  return myChart;
};