package com.moneymanager.controller;

import com.moneymanager.model.Transaction;
import com.moneymanager.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    private TransactionRepository repo;

    @PostMapping
    public Transaction add(@RequestBody Transaction t) {
        return repo.save(t);
    }

    @GetMapping
    public List<Transaction> getAll() {
        return repo.findAll();
    }
}