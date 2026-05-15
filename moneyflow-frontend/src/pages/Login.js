@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User loginUser) {

    User user = userRepository.findByEmail(loginUser.getEmail());

    if (user == null) {
        return ResponseEntity.status(401).body("User not found");
    }

    if (!user.getPassword().equals(loginUser.getPassword())) {
        return ResponseEntity.status(401).body("Invalid password");
    }

    return ResponseEntity.ok("Login Success");
}