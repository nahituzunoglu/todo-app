package com.example.to_do.to_do.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

import com.example.to_do.to_do.entities.User;
import com.example.to_do.to_do.repository.UserRepository;
@Service
public class UserService {

	private UserRepository  userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	
	public User createNewUser(User user) {
		return userRepository.save(user);
	}
	
	public void deleteUser(Integer id) {
		User existingUser = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, id + " numaralı kullanıcı bulunamadı!"));
		
		userRepository.delete(existingUser);
		
	}
	
	
}
