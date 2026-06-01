package com.example.movieanalysisbackend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MovieAnalysisBackendApplication implements CommandLineRunner {

    // 注入配置文件中的数据库配置
    @Value("${spring.datasource.username}")
    private String dbUsername;

    @Value("${spring.datasource.password}")
    private String dbPassword;

    @Value("${spring.datasource.url}")
    private String dbUrl;

    public static void main(String[] args) {
        SpringApplication.run(MovieAnalysisBackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("===== 实际加载的数据库配置 =====");
        System.out.println("URL: " + dbUrl);
        System.out.println("用户名: " + dbUsername);
        System.out.println("密码: " + dbPassword);
        System.out.println("===============================");
    }
}