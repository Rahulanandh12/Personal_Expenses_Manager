package com.example.demo.PersonalExpenseManager;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Personal_Expense_Manager")
@Getter
@Setter
public class PersonalExpenseManager {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String purpose;
    private double spent_amount;
    private String merchant_name;
    private String date;
    private String payment_method;
    private String location;
    private String description;
    
    public PersonalExpenseManager() {}
    
    public PersonalExpenseManager(String purpose,double spent_amount,String merchant_name,
    							  String date,String payment_method,String location,String description) {
    	this.purpose=purpose;
    	this.spent_amount=spent_amount;
    	this.merchant_name=merchant_name;
    	this.date=date;
    	this.payment_method=payment_method;
    	this.location=location;
    	this.description=description;
    }
}



