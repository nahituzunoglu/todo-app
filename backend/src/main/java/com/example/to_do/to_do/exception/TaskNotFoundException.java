package com.example.to_do.to_do.exception;

public class TaskNotFoundException extends RuntimeException{
	
	public TaskNotFoundException (String message) {
		super(message);
	}

}
