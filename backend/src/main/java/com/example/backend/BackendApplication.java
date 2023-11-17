package com.example.backend;

import com.example.backend.entities.Role;
import com.example.backend.entities.User;
import com.example.backend.repositories.RoleRepository;
import com.example.backend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner run(RoleRepository roleRepository,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder
                          ) {
        return args -> {
            Role role = roleRepository.save(
                    Role.builder()
                            .name("MEMBER")
                            .build()
            );

            roleRepository.save(
                    Role.builder()
                            .name("TEACHER")
                            .build()
            );

            userRepository.save(
                    User.builder()
                            .email("email@example.com")
                            .password(passwordEncoder.encode("123"))
                            .role(role)
                            .build()
            );
        };
    }
}
