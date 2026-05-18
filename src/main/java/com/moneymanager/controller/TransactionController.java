package com.moneymanager.controller;

import com.moneymanager.model.Transaction;
import com.moneymanager.repository.TransactionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin("*")
public class TransactionController {

    private final TransactionRepository repository;

    public TransactionController(TransactionRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return repository.findAll();
    }

    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction transaction) {
        return repository.save(transaction);
    }
    @PutMapping("/{id}")
    public Transaction updateTransaction(
            @PathVariable Long id,
            @RequestBody Transaction updatedTransaction
    ) {

        Transaction transaction = repository.findById(id)
                .orElseThrow();

        transaction.setTitle(updatedTransaction.getTitle());
        transaction.setAmount(updatedTransaction.getAmount());
        transaction.setType(updatedTransaction.getType());
        transaction.setCategory(updatedTransaction.getCategory());

        return repository.save(transaction);
    }
    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        repository.deleteById(id);
    }
}