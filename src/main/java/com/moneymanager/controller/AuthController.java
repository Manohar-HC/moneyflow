package com.moneymanager.controller;

import com.moneymanager.model.User;
import com.moneymanager.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
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

        User foundUser = userRepo.findByEmail(user.getEmail());

        if (foundUser == null) {

            throw new RuntimeException("User not found");
        }

        if (!foundUser.getPassword().equals(user.getPassword())) {

            throw new RuntimeException("Wrong Password");
        }

        return foundUser;
    }
}