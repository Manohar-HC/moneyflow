package com.moneymanager.controller;

import com.moneymanager.model.User;
import com.moneymanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        User existingUser = userRepo.findByEmail(user.getEmail());

        if (existingUser != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        userRepo.save(user);

        return ResponseEntity.ok("Registered Successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User foundUser = userRepo.findByEmailAndPassword(
                user.getEmail(),
                user.getPassword()
        );

        if (foundUser == null) {
            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }

        return ResponseEntity.ok(foundUser);
    }
}