package com.example.to_do.to_do.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.to_do.to_do.entities.Task;

public interface TaskRepository extends JpaRepository<Task, Integer>{

 //List<Task> findByComplated (boolean complated); //findBy ile başlamasaydık hata alıcaktık cunku bu Sorgu oldugunu SELECT işlemi yapıcağını anlatıyor.!!!

	// Sadece durumu belirli bir kelime olanları ("TAMAMLANDI" gibi) getir
	List<Task> findByStatus(String status);
	
	List<Task> findByUserId(Integer userId);


	List<Task> findByStatusAndDueTimeBefore(String status, LocalDateTime date);
	}
