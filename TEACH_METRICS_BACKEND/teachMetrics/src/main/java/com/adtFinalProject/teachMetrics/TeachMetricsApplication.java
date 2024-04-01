package com.adtFinalProject.teachMetrics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.event.EventListener;

import com.adtFinalProject.teachMetrics.service.RegistrationServiceImpl;

import jakarta.mail.MessagingException;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@ComponentScan(basePackages = {
	    "com.adtFinalProject.teachMetrics"
	})
public class TeachMetricsApplication {

	public static void main(String[] args) {
		SpringApplication.run(TeachMetricsApplication.class, args);
	}
	
}
