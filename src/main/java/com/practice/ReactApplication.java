package com.practice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.practice")
public class ReactApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReactApplication.class, args);
	}
}
