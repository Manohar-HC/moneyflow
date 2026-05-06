package com.moneymanager.model;

import jakarta.persistence.*;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}