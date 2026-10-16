package com.example.to_do.to_do.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.to_do.to_do.dto.TaskDto;
import com.example.to_do.to_do.entities.Task;
import com.example.to_do.to_do.service.TaskService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class TaskController {

	private TaskService taskService;
	
	public TaskController(TaskService taskService) {
		this.taskService = taskService;
	}



	@GetMapping("/tasks")
	public List<Task> getAllToDoList(){
		return taskService.getAllToDoList();
	}
	
	@PostMapping("/tasks")
	public Task createNewTask(@Valid @RequestBody Task task) { //RequestBody Postmanden Json veriyi Javanın diline cevirir.
		return taskService.createNewTask(task);
	}
	
	@DeleteMapping("/tasks/{id}")
	public void deleteTask(@PathVariable ("id")  Integer id) {
		 taskService.deleteTask(id);
	}
	
	@PutMapping("/tasks/{id}")
	public Task updateTask(@PathVariable ("id") Integer id, @RequestBody Task newTaskData) {
		return taskService.updateTask(id,newTaskData);
	}
	
	@GetMapping("/tasks/filter")
	public List<TaskDto> findTasksByStatus(@RequestParam("status") String status) {
		return taskService.findByStatus(status);
	}
	@GetMapping("/tasks/user/{userId}")
	public List<TaskDto> getByUserId(@PathVariable("userId") Integer userId){
		return taskService.getTasksByUserId(userId);
	}
	@PatchMapping("/tasks/{id}/complete")
	public Task markAsCompleted(@PathVariable Integer id) {
		return taskService.markAsCompleted(id);
	}
	
}
