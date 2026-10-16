package com.example.to_do.to_do.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class TaskDto {
private Integer id;
private String title;
private LocalDateTime dueDate; // YENİ: Bitiş Tarihi
private String status;       // YENİ: Görev Durumu (BEKLİYOR vb.)
private String userName;
}
