package net.javaguides.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.firebase.auth.DeleteUsersResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.google.firebase.auth.UserRecord.UpdateRequest;

import net.javaguides.springboot.account.RealAccountObject;

@Service
public class accountimpl {
	public String createaccount(RealAccountObject object) throws FirebaseAuthException {
		try {
		FirebaseAuth AccountInstance = FirebaseAuth.getInstance();
		CreateRequest gRecord = new UserRecord.CreateRequest();
		gRecord.setEmail(object.getEmail());
		gRecord.setDisplayName(object.getUsername());
		gRecord.setPassword(object.getPassword());
		AccountInstance.createUser(gRecord);
		}catch(FirebaseAuthException e) {
			return "Email Exists";
		}
		return "Account Created!";
	}
	public String getaccount(String object) throws FirebaseAuthException {
		FirebaseAuth AccountInstance = FirebaseAuth.getInstance();
		return AccountInstance.getUser(object).toString();
	}

	public String editaccountusername(String object) {
		FirebaseAuth AccountInstance = FirebaseAuth.getInstance();
		UpdateRequest gRecord = new UserRecord.UpdateRequest(object);
		return "You username has been changed to " + object;
	}
	public String deleteaccount(String s) throws FirebaseAuthException {
		FirebaseAuth AccountInstance = FirebaseAuth.getInstance();
		AccountInstance.deleteUser(s);
		return "Your account has been deleted.";
	}
}
