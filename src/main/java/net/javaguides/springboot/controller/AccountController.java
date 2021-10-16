package net.javaguides.springboot.controller;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.auth.FirebaseAuthException;

import net.javaguides.springboot.account.RealAccountObject;
import net.javaguides.springboot.service.accountimpl;
import net.javaguides.springboot.service.storyservice;

@RestController
public class AccountController {
	@Autowired
	accountimpl accountImplementation;
	
	@PostMapping("/createAccount")
	public String CreateAccount(@RequestBody RealAccountObject object) throws FirebaseAuthException,InterruptedException, ExecutionException {
		System.out.println(object.getPassword());
		System.out.println(object.getUsername());
		System.out.println(object.getEmail());
		return accountImplementation.createaccount(object)=="Email Exists" ? "Failure":"Success";
	}
	@GetMapping("/getAccount")
	public String getAccount(@RequestParam String s) throws FirebaseAuthException {
		return accountImplementation.getaccount(s);
	}
	@PutMapping("/updateAccount")
	public String editAccount(@RequestBody String s) throws FirebaseAuthException{
		return accountImplementation.editaccountusername(s);
	}
	@DeleteMapping("/deleteAccount")
	public String deleteAccount(@RequestParam String s) throws FirebaseAuthException{
		return accountImplementation.deleteaccount(s);
	}
}
