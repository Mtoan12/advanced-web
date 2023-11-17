package com.example.backend.controllers;

import com.example.backend.dtos.UserDTO;
import com.example.backend.services.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getProfile(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getProfile(id));
    }

}
