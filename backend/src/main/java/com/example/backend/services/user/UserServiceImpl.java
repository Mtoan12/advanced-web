package com.example.backend.services.user;

import com.example.backend.dtos.AuthenticationResponseDTO;
import com.example.backend.dtos.LoginDTO;
import com.example.backend.dtos.UserDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;

@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponseDTO login(@NonNull LoginDTO loginDTO) {



        return null;
    }

    @Override
    public AuthenticationResponseDTO register(@NonNull UserDTO newUserDTO) {
        return null;
    }

    @Override
    public AuthenticationResponseDTO refreshToken(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response) {
        return null;
    }
}
