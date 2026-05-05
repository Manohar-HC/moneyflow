package com.moneyflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.moneyflow.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}