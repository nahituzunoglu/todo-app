package com.example.to_do.to_do.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.to_do.to_do.dto.TaskDto;
import com.example.to_do.to_do.entities.Task;
import com.example.to_do.to_do.exception.TaskNotFoundException;
import com.example.to_do.to_do.repository.TaskRepository;

@Service
public class TaskService {
	
private TaskRepository taskRepository;

	public TaskService(TaskRepository taskRepository) {
	this.taskRepository = taskRepository;
}



	public List<Task> getAllToDoList() {
		
		return taskRepository.findAll();
	}



public Task createNewTask(Task task) { // Metot adın neyse o kalsın
		
		// YENİ: Eğer dışarıdan bir durum gelmediyse, varsayılan olarak "BEKLIYOR" yap
		if (task.getStatus() == null) {
			task.setStatus("BEKLIYOR");
		}
		
		return taskRepository.save(task);
	}



	public void deleteTask(Integer id) {
		Task existingTask = taskRepository.findById(id).orElseThrow(()-> new TaskNotFoundException(id+"numaralı kullanıcı silinemedi"));
		
		
		 taskRepository.deleteById(id);
	}



	public Task updateTask(Integer id, Task newTaskData) {
		
		Task existingTask= taskRepository.findById(id).orElseThrow(()-> new TaskNotFoundException(id + "numaralı görev bulunamadı!"));
		
		
			existingTask.setTitle(newTaskData.getTitle());
			existingTask.setStatus(newTaskData.getStatus());
			existingTask.setDueTime(newTaskData.getDueTime());
			return taskRepository.save(existingTask);
		
	}
	
	
	public List<TaskDto> findByStatus(String status) {
		List<Task> tasks = taskRepository.findByStatus(status);
		List<TaskDto> taskDtos = new ArrayList<>();
		
		for (Task task : tasks) {
			TaskDto dto = new TaskDto();
			dto.setId(task.getId());
			dto.setTitle(task.getTitle());
			dto.setDueDate(task.getDueTime());
			dto.setStatus(task.getStatus());
			dto.setUserName(task.getUser().getUser_name()); 
			
			taskDtos.add(dto);
		}
		
		return taskDtos;
	}
	
	public List<TaskDto> getTasksByUserId(Integer userId){ //CHECK ET BURAYI TAM ANLAMADIM!
		List<Task> tasks = taskRepository.findByUserId(userId);
		
		List<TaskDto> taskDtos = new ArrayList<>();
		
		for(Task task : tasks) {
			TaskDto dto = new TaskDto();
			dto.setId(task.getId());
			dto.setTitle(task.getTitle());
			dto.setDueDate(task.getDueTime());
			dto.setStatus(task.getStatus());
			dto.setUserName(task.getUser().getUser_name());
			
			taskDtos.add(dto);
		}
		return taskDtos;
	}
	
	@Scheduled(cron = "0 * * * * *") 
	public void checkExpiredTasks() {
		LocalDateTime now = LocalDateTime.now();
		
		// BURASI DEĞİŞTİ: findByStatusAndDueDateBefore yerine findByStatusAndDueTimeBefore oldu
		List<Task> expiredTasks = taskRepository.findByStatusAndDueTimeBefore("BEKLIYOR", now);
		
		for (Task task : expiredTasks) {
			task.setStatus("BAŞARISIZ");
			taskRepository.save(task); 
			System.out.println("Zamanı dolan görev iptal edildi: " + task.getTitle());
		}
	}
	
	public Task markAsCompleted(Integer id) {
		Task task = taskRepository.findById(id).orElseThrow(()-> new TaskNotFoundException(id + " numaralı görev bulunamadı!"));
		task.setStatus("TAMAMLANDI");
		return taskRepository.save(task);
	}
	
	

}
