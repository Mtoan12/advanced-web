package com.example.backend.controllers;

import com.example.backend.dtos.AuthenticationResponseDTO;
import com.example.backend.dtos.LoginDTO;
import com.example.backend.dtos.RegisterDTO;
import com.example.backend.services.user.IUserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final IUserService userService;

    @PostMapping("/register")
    public AuthenticationResponseDTO register(@RequestBody RegisterDTO newUserDTO) {
        return userService.register(newUserDTO);
    }

    @PostMapping("/login")
    public AuthenticationResponseDTO login(@RequestBody LoginDTO loginDTO) {
        System.out.println(loginDTO.getEmail());
        return userService.login(loginDTO);
    }

    @GetMapping("/refresh-token")
    public AuthenticationResponseDTO refreshToken(HttpServletRequest request,
                                                  HttpServletResponse response) {
        return userService.refreshToken(request, response);
    }
}
