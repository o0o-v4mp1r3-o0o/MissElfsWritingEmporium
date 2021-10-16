package net.javaguides.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.auth.FirebaseAuthException;

import net.javaguides.springboot.account.AccountObject;
import net.javaguides.springboot.service.loginimpl;
import net.javaguides.springboot.service.serviceimpl;
import net.javaguides.springboot.service.storyservice;

@RestController
public class LoginController {
	@Autowired
	loginimpl loginimpl;
	@Autowired
	storyservice storyservice;
	@GetMapping("/validatetoken")
	public String veryifytoken(@RequestParam String s) throws FirebaseAuthException {
		boolean wasTokenSuccessful = loginimpl.login(s);
		if(wasTokenSuccessful) {
			return "Valid Token";
		}
		return "Not A Valid Token";
	}
	@PostMapping("/inject")
	public void injectaccount(@RequestBody AccountObject accountObject) {
		storyservice.setAO(accountObject);
	}
}
