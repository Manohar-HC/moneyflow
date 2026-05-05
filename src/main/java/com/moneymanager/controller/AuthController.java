package com.moneymanager.controller;

import com.moneymanager.model.User;
import com.moneymanager.security.JwtUtil;
import com.moneymanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User u = userService.login(user.getEmail(), user.getPassword());
        return jwtUtil.generateToken(u.getEmail()); // 🔥 return token
    }
}