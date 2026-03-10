package com.example.demo.PersonalExpenseManagerRespository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.PersonalExpenseManager.PersonalExpenseManager;

public interface PersonalExpenseManagerRepsitory extends JpaRepository<PersonalExpenseManager, Long>{

}
