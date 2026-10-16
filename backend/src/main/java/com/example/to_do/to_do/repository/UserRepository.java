package com.example.to_do.to_do.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.to_do.to_do.entities.User;

public interface UserRepository extends JpaRepository<User, Integer>{

}
