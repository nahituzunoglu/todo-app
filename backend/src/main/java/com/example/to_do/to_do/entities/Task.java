package com.example.to_do.to_do.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotBlank(message = "It's not be empty")
	private String title;
	
	//görevin son yapılma tarihi ve saatini alcaz
	private LocalDateTime dueTime;
	
	private String status = "BEKLIYOR";
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
}
