package com.example.to_do.to_do.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice //bütün controllerda ki hataları dinle demek.
public class GlobalExceptionHandler {

	
	@ExceptionHandler(TaskNotFoundException.class)
	public ResponseEntity<Map<String,String>> handleTaskNotFoundException(TaskNotFoundException ex){
		
		Map<String,String> errorResponse = new HashMap<>();
		errorResponse.put("hata mesajı", ex.getMessage());
		errorResponse.put("durum", "404 Not Found");
		
		return new ResponseEntity<>(errorResponse,HttpStatus.NOT_FOUND);
	}
}
