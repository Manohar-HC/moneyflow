package com.moneyflow.model;

import jakarta.persistence.*;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;
    private String type;
    private String category;

    public Long getId() { return id; }
    public double getAmount() { return amount; }
    public String getType() { return type; }
    public String getCategory() { return category; }

    public void setAmount(double amount) { this.amount = amount; }
    public void setType(String type) { this.type = type; }
    public void setCategory(String category) { this.category = category; }
}