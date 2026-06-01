package com.example.movieanalysisbackend;
//类注释与依赖注入
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

//标识为rest控制器，支持跨域
@RestController
@RequestMapping("/api")             //统一接口前缀
public class MovieController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/movie-top20")
    public List<Map<String, Object>> getMovieTop20() {
        String sql = "SELECT * FROM ads_movie_top20_rating ORDER BY avg_rate DESC";
        return jdbcTemplate.queryForList(sql);
    }

    @GetMapping("/genre-distribution")
    public List<Map<String, Object>> getGenreDistribution() {
        String sql = "SELECT movie_type_main AS genre, movie_count AS count " +
                "FROM ads_movie_type_performance " +
                "WHERE movie_count > 0 " +
                "ORDER BY count DESC";
        return jdbcTemplate.queryForList(sql);
    }

    @GetMapping("/user-age-distribution")
    public List<Map<String, Object>> getUserAgeDistribution() {
        String sql = "SELECT age_bin AS user_age_segment, rating_count AS user_count, avg_rate " +
                "FROM ads_user_age_rating_density " +
                "ORDER BY age_bin";
        return jdbcTemplate.queryForList(sql);
    }

    @GetMapping("/user-portrait-analysis")
    public List<Map<String, Object>> getUserPortraitAnalysis() {
        String sql = "SELECT " +
                "user_age_segment, " +
                "user_gender_cn AS gender, " +
                "occupation, " +
                "user_count " +
                "FROM ads_user_portrait_analysis " +
                "WHERE user_age_segment IS NOT NULL AND user_gender_cn IS NOT NULL " +
                "GROUP BY user_age_segment, user_gender_cn, occupation, user_count " +
                "ORDER BY user_age_segment, gender";
        return jdbcTemplate.queryForList(sql);
    }

    @GetMapping("/user-behavior-analysis")
    public List<Map<String, Object>> getUserBehaviorAnalysis() {
        String sql = "SELECT user_age_segment, top_favorite_type AS movie_type, avg_view_freq, user_count " +
                "FROM ads_user_behavior_analysis " +
                "WHERE top_favorite_type IN ('Action', 'Comedy', 'Drama', 'Adventure') " +
                "ORDER BY user_age_segment, movie_type";
        return jdbcTemplate.queryForList(sql);
    }

    @GetMapping("/movie-type-performance")
    public List<Map<String, Object>> getMovieTypePerformance() {
        String sql = "SELECT " +
                "movie_type_main AS movie_type, " +
                "avg_score, " +
                "total_view_num, " +
                "active_user_num " +
                "FROM ads_movie_type_performance " +
                "WHERE total_view_num > 0 " +
                "ORDER BY total_view_num DESC";
        return jdbcTemplate.queryForList(sql);
    }
}