package com.example.demo.PersonalExpenseManagerService;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.PersonalExpenseManager.PersonalExpenseManager;
import com.example.demo.PersonalExpenseManagerRespository.PersonalExpenseManagerRepsitory;

@Service
public class PersonalExpenseManagerService {
	
	private final PersonalExpenseManagerRepsitory expenses;
	
	public PersonalExpenseManagerService(PersonalExpenseManagerRepsitory expenses) {
		this.expenses=expenses;
	}
	//Get
	public List<PersonalExpenseManager> getAllExpenses(){
		return expenses.findAll();
	}
	//Get by Id
	public PersonalExpenseManager getExpenseById(long id) {
		return expenses.findById(id).orElse(null);
	}
	//Post
	public PersonalExpenseManager saveExpenses(PersonalExpenseManager expense) {
		return expenses.save(expense);
	}
	//Put
	public PersonalExpenseManager changeExpenses(Long id,PersonalExpenseManager created) {
		PersonalExpenseManager store=expenses.findById(id).orElse(null);
		if(store!=null) {
			store.setPurpose(created.getPurpose());
			store.setSpent_amount(created.getSpent_amount());
			store.setMerchant_name(created.getMerchant_name());
			store.setDate(created.getDate());
			store.setPayment_method(created.getPayment_method());
			store.setLocation(created.getLocation());
			store.setDescription(created.getDescription());
		}
		return null;
	}
	//Delete
	public void deleteExpenses(Long id) {
		expenses.deleteById(id);
	}

}
