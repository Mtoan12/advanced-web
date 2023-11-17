package com.example.backend.services.user;

import com.example.backend.constants.AppConstant;
import com.example.backend.dtos.AuthenticationResponseDTO;
import com.example.backend.dtos.LoginDTO;
import com.example.backend.dtos.RegisterDTO;
import com.example.backend.entities.Role;
import com.example.backend.entities.User;
import com.example.backend.exceptions.AuthenticationErrorException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.repositories.RoleRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.token.ITokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements IUserService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ITokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AuthenticationResponseDTO login(@NonNull LoginDTO loginDTO) {

        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDTO.getEmail(),
                            loginDTO.getPassword()
                    )
            );

        } catch (Exception e) {
            throw  new AuthenticationErrorException(e.getMessage() + " - Username or Password is incorrect");
        }

        User user = userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(
                () -> new NotFoundException("User not found")
        );

            String accessToken = tokenService.generateToken(user);
            String refreshToken = tokenService.generateRefreshToken(user);

            return AuthenticationResponseDTO.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();
    }

    @Override
    public AuthenticationResponseDTO register(@NonNull RegisterDTO newUserDTO) {

        Role role = roleRepository.findByName("MEMBER").orElseThrow(
                () -> new NotFoundException("Role not found")
        );

        try {


            User user = User.builder()
                    .email(newUserDTO.getEmail())
                    .password(passwordEncoder.encode(newUserDTO.getPassword()))
                    .role(role)
                    .firstName(newUserDTO.getFirstName())
                    .lastName(newUserDTO.getLastName())
                    .gender(newUserDTO.getGender())
                    .DOB(newUserDTO.getDOB())
                    .build();

            User savedUser = userRepository.save(user);
            String accessToken = tokenService.generateToken(savedUser);
            String refreshToken = tokenService.generateRefreshToken(savedUser);

            return AuthenticationResponseDTO.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();


        } catch (Exception e) {
            throw new AuthenticationErrorException("Register failed");
        }
    }

    @Override
    public AuthenticationResponseDTO refreshToken(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response) {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith(AppConstant.TOKEN_PREFIX)) {
            throw new AuthenticationErrorException("Invalid token");
        }
        String token = authHeader.substring(AppConstant.TOKEN_PREFIX.length());
        Long userID = tokenService.extractUserId(token);
        if (userID != null ) {
            User user = userRepository.findById(userID).orElse(null);
            if (user != null && tokenService.isValidToken(token, user)) {
                String accessToken = tokenService.generateToken(user);
                return AuthenticationResponseDTO.builder()
                        .accessToken(accessToken)
                        .refreshToken(token)
                        .build();

            }
        }
        throw new AuthenticationErrorException("Invalid token");
    }
}
