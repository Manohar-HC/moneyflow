package com.moneyflow.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.moneyflow.model.Transaction;
import com.moneyflow.repository.TransactionRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class TransactionController {

    private final TransactionRepository repo;

    public TransactionController(TransactionRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/transactions")
    public List<Transaction> getAll() {
        return repo.findAll();
    }

    @PostMapping("/transactions")
    public Transaction add(@RequestBody Transaction t) {
        return repo.save(t);
    }

    @DeleteMapping("/transactions/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}