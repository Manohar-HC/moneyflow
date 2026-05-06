package com.moneymanager.controller;

import com.moneymanager.model.User;
import com.moneymanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepo.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {

        Optional<User> foundUser =
                userRepo.findByEmailAndPassword(
                        user.getEmail(),
                        user.getPassword()
                );

        return foundUser.orElseThrow(
                () -> new RuntimeException("Invalid credentials")
        );
    }
}