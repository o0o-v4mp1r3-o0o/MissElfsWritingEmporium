package net.javaguides.springboot.service;

import org.springframework.stereotype.Service;

import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;

import net.javaguides.springboot.FirebaseApplication;

@Service
public class loginimpl {
	
	public boolean login(String veryifypls) throws FirebaseAuthException {
		try {
		FirebaseAuth firebaseAuth = FirebaseAuth.getInstance();
		firebaseAuth.verifyIdToken(veryifypls);
		}catch(FirebaseAuthException e) {
			return false;
		}
		return true;
	}
}
