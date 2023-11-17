package com.example.backend.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class WrongAuthenticatuionException extends RuntimeException {
    private String message;
}
