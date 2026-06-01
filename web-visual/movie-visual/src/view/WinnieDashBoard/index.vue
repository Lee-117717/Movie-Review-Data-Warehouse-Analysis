<template>
    <div class="honey-dashboard">
        <div class="honey-drips"></div>

        <!-- 标题栏 -->
        <div class="dashboard-header">
            <div class="header-content">
                <div class="title-wrapper">
                    <div class="winnie-icon" style="font-size: 140px; display: inline-block; vertical-align: middle;">
                        🧸
                    </div>
                    <p class="dashboard-title" style="font-size: 60px; font-weight: bold;">Winnie Bear电影数据可视化平台</p>
                    <div class="honey-icon" style="font-size: 110px; display: inline-block; vertical-align: middle;">
                        🍯
                    </div>
                </div>
                <p class="dashboard-subtitle" style="font-size: 30px; font-weight: 600;">用蜂蜜般的甜蜜数据，探索电影世界的奇妙旅程 🍯</p>
                <div class="honey-jar">
                    <!-- 3个蜂蜜水滴 -->
                    <div class="honey-drip-1"></div>
                    <div class="honey-drip-2"></div>
                    <div class="honey-drip-3"></div>
                    <div class="honey-level"></div>
                </div>
            </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="isLoading" class="dashboard-loading">
            <div class="honey-loading">
                <div class="honey-spoon">
                    <div class="spoon"></div>
                    <div class="honey-drip"></div>
                </div>
                <p>正在采集蜂蜜数据...</p>
            </div>
        </div>

        <!-- 图表网格布局 -->
        <div v-else class="dashboard-content">
            <div class="dashboard-grid">
                <!-- 1. 电影评分TOP20 -->
                <div class="chart-card chart-card-large">
                    <div class="chart-header">
                        <img src="https://cdn-icons-png.flaticon.com/512/877/877698.png" class="chart-icon" alt="小熊">
                        <div class="chart-title">电影评分TOP20</div>
                        <div class="honey-badge">🍯 好评最佳电影</div>
                    </div>
                    <div class="chart-container">
                        <div id="top20-chart" class="chart-area"></div>
                    </div>
                    <div class="chart-footer">
                        <span>Winnie推荐：选择最甜的蜂蜜（电影）</span>
                    </div>
                </div>

                <!-- 2. 电影类型分布 -->
                <div class="chart-card chart-card-medium">
                    <div class="chart-header">
                        <img src="https://cdn-icons-png.flaticon.com/512/1046/1046745.png" class="chart-icon" alt="饼图">
                        <div class="chart-title">电影类型分布</div>
                        <div class="honey-badge">🍑 不同类型占比</div>
                    </div>
                    <div class="chart-container">
                        <div id="genre-chart" class="chart-area"></div>
                    </div>
                    <div class="chart-footer">
                        <span>不同口味蜂蜜比例</span>
                    </div>
                </div>

                <!-- 3. 用户年龄分布 -->
                <div class="chart-card chart-card-medium">
                    <div class="chart-header">
                        <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" class="chart-icon" alt="用户">
                        <div class="chart-title">用户年龄分布</div>
                        <div class="honey-badge">🧑 不同年龄的电影爱好者</div>
                    </div>
                    <div class="chart-container">
                        <div id="user-chart" class="chart-area"></div>
                    </div>
                    <div class="chart-footer">
                        <span>喜欢蜂蜜的小伙伴们</span>
                    </div>
                </div>

                <!-- 4. 用户画像分析 -->
                <div class="chart-card chart-card-medium">
                    <div class="chart-header">
                        <img src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" class="chart-icon" alt="用户画像">
                        <div class="chart-title">用户画像分析（年龄-性别-职业）</div>
                        <div class="honey-badge">👨‍👩‍👧‍👦 不同人群分布</div>
                    </div>
                    <div class="chart-container">
                        <div id="user-portrait-chart" class="chart-area"></div>
                    </div>
                    <div class="chart-footer">
                        <span>不同年龄段男女各职业的蜂蜜爱好者分布</span>
                    </div>
                </div>

                <!-- 5. 用户观影行为分析 -->
                <div class="chart-card chart-card-medium">
                    <div class="chart-header">
                        <img src="https://cdn-icons-png.flaticon.com/512/3326/3326388.png" class="chart-icon" alt="观影行为">
                        <div class="chart-title">用户观影行为分析</div>
                        <div class="honey-badge">🎬 年龄-类型-频次</div>
                    </div>
                    <div class="chart-container">
                        <div id="user-behavior-chart" class="chart-area"></div>
                    </div>
                    <div class="chart-footer">
                        <span>不同年龄对各口味蜂蜜的品尝频率</span>
                    </div>
                </div>



                <!-- 6. 电影类型性能分析 -->
                <div class="chart-card chart-card-large">
                    <div class="chart-header">
                        <img src="https://cdn-icons-png.flaticon.com/512/2933/2933999.png" class="chart-icon" alt="类型性能">
                        <div class="chart-title">电影类型性能分析</div>
                        <div class="honey-badge">🌟 播放量-评分-活跃用户</div>
                    </div>
                    <div class="chart-container">
                        <div id="movie-type-performance-chart" class="chart-area"></div>
                    </div>
                    <div class="chart-footer">
                        <span>各口味蜂蜜的综合口感表现</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="decor-top-left" style="position: fixed; top: 20px; left: 20px; z-index: 5; pointer-events: none;">
            <div class="bee bee-1" style="font-size: 70px; display: block;">🐝</div>
            <div class="bee bee-2" style="font-size: 50px; position: absolute; top: 70px; left: 50px; display: block;">🐝</div>
            <div class="bee bee-3" style="font-size: 40px; position: absolute; top: 120px; left: 20px; display: block;">🐝</div>
        </div>

        <div class="decor-top-right" style="position: fixed; top: 20px; right: 20px; z-index: 5; pointer-events: none;">
            <div class="small-winnie-1" style="font-size: 60px; display: block;">🐻</div>
            <div class="small-winnie-2" style="font-size: 50px; position: absolute; top: 70px; right: 50px; display: block;">🐻</div>
            <div class="small-jar-1" style="font-size: 40px; position: absolute; top: 40px; right: 20px; display: block;">🐾</div>
        </div>

        <div class="decor-bottom-right" style="position: fixed; bottom: 100px; right: 20px; z-index: 5; pointer-events: none;">
            <div class="flower flower-1" style="font-size: 50px; display: block;">🌸</div>
            <div class="flower flower-2" style="font-size: 80px; position: absolute; bottom: 70px; right: 50px; display: block;">🌼</div>
            <div class="flower flower-3" style="font-size: 60px; position: absolute; bottom: 200px; right: 20px; display: block;">🌺</div>
        </div>

        <div class="decor-bottom-left" style="position: fixed; bottom: 20px; left: 20px; z-index: 5; pointer-events: none;">
            <div class="small-winnie-3" style="font-size: 100px; display: block;">🐻</div>
            <div class="small-jar-2" style="font-size: 60px; position: absolute; bottom: 450px; left: 20px; display: block;">🍯</div>
        </div>

        <div class="floating-winnie" style="font-size: 70px; position: fixed; bottom: 30px; right: 30px; z-index: 20; pointer-events: auto;">🐻</div>
    </div>
</template>

<script setup>
// 1. 导入Vue核心API与图表配置

import { ref, onMounted, nextTick, onUnmounted } from 'vue'

// 2. 导入外部图表JS
import {
  initTop20Chart,
  initGenreChart,
  initUserChart,
  initUserPortraitSankeyChart,
  initUserBehaviorChart,
  initMovieTypePerformanceChart
} from './chartConfig.js'

// 3. 导入外部CSS
import './style.css'

const top20Data = ref([])
const genreDistData = ref([])
const userPortraitData = ref([])
const userPortraitAnalysisData = ref([])
const userBehaviorAnalysisData = ref([])
const movieTypePerformanceData = ref([])

const isLoading = ref(true)
const chartInstances = ref({})

// 接口请求
// 并发请求6个后端接口
const fetchData = async () => {
  try {
    const [
      top20Res,
      genreDistRes,
      userAgeRes,
      userPortraitRes,
      userBehaviorRes,
      movieTypePerformanceRes
    ] = await Promise.all([
      fetch('http://localhost:8080/api/movie-top20'),
      fetch('http://localhost:8080/api/genre-distribution'),
      fetch('http://localhost:8080/api/user-age-distribution'),
      fetch('http://localhost:8080/api/user-portrait-analysis'),
      fetch('http://localhost:8080/api/user-behavior-analysis'),
      fetch('http://localhost:8080/api/movie-type-performance')
    ])

    // 数据格式化：适配图表要求
    // 1. 电影评分TOP20
    top20Data.value = (await top20Res.json()).map(item => ({
      movieName: item.moviename,
      rating: item.avg_rate,
      voteCount: item.total_rates
    }))

    // 2. 电影类型分布
    const rawGenreData = await genreDistRes.json();
    const total = rawGenreData.reduce((sum, item) => sum + item.count, 0);
    const sortedGenreData = rawGenreData.sort((a, b) => b.count - a.count);
    const topGenreData = sortedGenreData.slice(0, 10);
    const otherCount = sortedGenreData.slice(10).reduce((sum, item) => sum + item.count, 0);
    if (otherCount > 0) {
      topGenreData.push({ genre: '其他', count: otherCount });
    }
    genreDistData.value = topGenreData.map(item => ({
      name: item.genre,
      value: item.count
    }));

    // 3. 用户年龄分布
    userPortraitData.value = (await userAgeRes.json()).map(item => ({
      ageGroup: item.user_age_segment,
      userCount: item.user_count
    }))


    // 5. 用户画像桑基图分析
    //转换为nodes和links
    const rawPortraitData = await userPortraitRes.json();

    const ageTotalMap = {};
    const genderTotalMap = {};
    const occupationTotalMap = {};
    rawPortraitData.forEach(item => {
      const age = item.user_age_segment?.trim();
      const gender = item.gender?.trim();
      const occupation = item.occupation?.trim();
      const count = Number(item.user_count) || 0;

      ageTotalMap[age] = (ageTotalMap[age] || 0) + count;
      genderTotalMap[gender] = (genderTotalMap[gender] || 0) + count;
      occupationTotalMap[occupation] = (occupationTotalMap[occupation] || 0) + count;
    });

    const getUniqueNodes = (data, key, prefix, category, totalMap) => {
      const uniqueValues = [...new Set(data.map(item => item[key]?.trim()))].filter(Boolean);
      return uniqueValues.map(value => ({
        name: `${prefix}:${value}`, // 格式：年龄:0-18、性别:男
        category: category,
        value: totalMap[value] || 0
      }));
    };
    const ageNodes = getUniqueNodes(rawPortraitData, 'user_age_segment', '年龄', 0, ageTotalMap);
    const genderNodes = getUniqueNodes(rawPortraitData, 'gender', '性别', 1, genderTotalMap);
    const occupationNodes = getUniqueNodes(rawPortraitData, 'occupation', '职业', 2, occupationTotalMap);
    const nodes = [...ageNodes, ...genderNodes, ...occupationNodes];

    const ageGenderCountMap = {};
    const genderOccupationCountMap = {};
    rawPortraitData.forEach(item => {
      const age = item.user_age_segment?.trim();
      const gender = item.gender?.trim();
      const occupation = item.occupation?.trim();
      if (!age || !gender || !occupation) return;

      const ageSource = `年龄:${age}`;
      const genderTarget = `性别:${gender}`;
      const genderSource = `性别:${gender}`;
      const occupationTarget = `职业:${occupation}`;

      const ageGenderKey = `${ageSource}__${genderTarget}`;
      const genderOccupationKey = `${genderSource}__${occupationTarget}`;
      const count = Number(item.user_count) || 0;

      ageGenderCountMap[ageGenderKey] = (ageGenderCountMap[ageGenderKey] || 0) + count;
      genderOccupationCountMap[genderOccupationKey] = (genderOccupationCountMap[genderOccupationKey] || 0) + count;
    });

    const ageToGenderLinks = Object.entries(ageGenderCountMap).map(([key, value]) => {
      const [source, target] = key.split('__'); // 用"__"拆分，保留年龄段的"-"
      return { source, target, value }; // source/target为节点name，如“年龄:0-18”
    });
    const genderToOccupationLinks = Object.entries(genderOccupationCountMap).map(([key, value]) => {
      const [source, target] = key.split('__');
      return { source, target, value };
    });

    console.log('节点数据（含value）：', nodes);
    console.log('年龄→性别链路：', ageToGenderLinks);
    userPortraitAnalysisData.value = { nodes, links: [...ageToGenderLinks, ...genderToOccupationLinks] };

    // 6. 用户观影行为分析
    userBehaviorAnalysisData.value = await userBehaviorRes.json()


    // 8. 电影类型性能分析
    movieTypePerformanceData.value = await movieTypePerformanceRes.json()
  } catch (err) {
    console.error('接口请求失败:', err)
  } finally {
    isLoading.value = false
  }
}

// 初始化6大图表
const initCharts = async () => {
  await nextTick()

  setTimeout(() => {
    try {
      if (top20Data.value.length > 0) {
        chartInstances.value.top20 = initTop20Chart(top20Data.value)
      }
      if (genreDistData.value.length > 0) {
        chartInstances.value.genre = initGenreChart(genreDistData.value)
      }
      if (userPortraitData.value.length > 0) {
        chartInstances.value.user = initUserChart(userPortraitData.value)
      }

      if (userPortraitAnalysisData.value?.nodes?.length > 0) {
        try {
          chartInstances.value.userPortrait = initUserPortraitSankeyChart(userPortraitAnalysisData.value);
        } catch (err) {
          console.error('❌ 初始化用户画像桑基图失败:', err);
          showChartError('user-portrait-chart', userPortraitAnalysisData.value.nodes.length, '👨‍👩‍👧‍👦', '用户画像数据加载失败', '请检查数据结构');
        }
      } else {
        console.warn('⚠️ 用户画像数据为空或格式不正确');
        showChartError('user-portrait-chart', 0, '👨‍👩‍👧‍👦', '没有找到用户画像数据', '请检查接口返回');
      }

      if (userBehaviorAnalysisData.value.length > 0) {
        try {
          chartInstances.value.userBehavior = initUserBehaviorChart(userBehaviorAnalysisData.value)
        } catch (err) {
          console.error('❌ 初始化用户行为图表失败:', err)
          showChartError('user-behavior-chart', userBehaviorAnalysisData.value.length, '🎬', '用户行为数据加载失败', '请检查接口返回')
        }
      }


      if (movieTypePerformanceData.value.length > 0) {
        try {
          chartInstances.value.movieTypePerformance = initMovieTypePerformanceChart(movieTypePerformanceData.value)
        } catch (err) {
          console.error('❌ 初始化电影类型性能图表失败:', err)
          showChartError('movie-type-performance-chart', movieTypePerformanceData.value.length, '🌟', '性能数据加载失败', '请检查接口返回')
        }
      }

      // 初始调整图表大小
      handleResize()
    } catch (error) {
      console.error('初始化图表时发生错误:', error)
    }
  }, 100)
}

// 图表错误提示
const showChartError = (chartId, dataLength, icon, title, subtitle) => {
  const chartDom = document.getElementById(chartId)
  if (chartDom) {
    chartDom.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#cc6600;font-family:'Comic Sans MS', sans-serif;padding:20px;text-align:center;">
        <div style="font-size:40px;animation:bounce 2s infinite;">${icon}</div>
        <div style="margin-top:15px;font-size:18px;font-weight:bold;">${title}</div>
        <div style="margin-top:8px;font-size:14px;color:#996633;">${subtitle}</div>
        <div style="margin-top:15px;padding:8px 15px;background:linear-gradient(135deg,#ffcc00,#ff9900);border-radius:12px;color:#663300;font-size:13px;box-shadow:0 4px 10px rgba(204,102,0,0.3);">
          数据长度: ${dataLength}
        </div>
        <div style="margin-top:10px;font-size:12px;color:#996633;font-style:italic;">
          打开浏览器控制台查看详细数据
        </div>
      </div>
    `
  }
}

// 窗口缩放自适应
const handleResize = () => {
  Object.values(chartInstances.value).forEach(chart => {
    if (chart) {
      try {
        chart.resize()
      } catch (e) {
        console.error('图表重绘失败:', e)
      }
    }
  })
}

// 生命周期钩子：页面加载时请求数据+初始化图表。窗口缩放时适配
onMounted(async () => {
  await fetchData()
  await initCharts()
  window.addEventListener('resize', handleResize)
})

//页面卸载时销毁图表，避免内存泄露
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  // 销毁所有图表实例，防止内存泄漏
  Object.values(chartInstances.value).forEach(chart => {
    if (chart) chart.dispose()
  })
})
</script>