package net.javaguides.springboot.service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;	
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.*;

import net.javaguides.springboot.account.AccountObject;
import net.javaguides.springboot.account.StoryPojo;

@Service
public class serviceimpl{
	 public static final String COL_NAME="users";  
	 public String savePatientDetails(AccountObject patient) throws InterruptedException, ExecutionException {  
	 Firestore dbFirestore = FirestoreClient.getFirestore();
	 DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(patient.getUsername());  
	 ApiFuture<DocumentSnapshot> future = documentReference.get();  
	 DocumentSnapshot document = future.get();
	 if(document.exists()) return "Exists";
	 ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(patient.getUsername()).set(patient);
	 return collectionsApiFuture.get().getUpdateTime().toString();  
	 }  
	 public AccountObject getPatientDetails(String name) throws InterruptedException, ExecutionException {  
	 Firestore dbFirestore = FirestoreClient.getFirestore();  
	 DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(name);  
	 ApiFuture<DocumentSnapshot> future = documentReference.get();  
	 DocumentSnapshot document = future.get();  
	 AccountObject patient = null;  
	 if(document.exists()) {  
	 patient = document.toObject(AccountObject.class);  
	 return patient;  
	 }else {  
	 return null;  
	 }  
	 }  
	 public String updatePatientDetails(AccountObject person) throws InterruptedException, ExecutionException {  
	 Firestore dbFirestore = FirestoreClient.getFirestore();  
	 ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(person.getUsername()).set(person);  
	 return collectionsApiFuture.get().getUpdateTime().toString();  
	 }  
	 public String deletePatient(String name) {  
	 Firestore dbFirestore = FirestoreClient.getFirestore();  
	 ApiFuture<WriteResult> writeResult = dbFirestore.collection(COL_NAME).document(name).delete();  
	 return "Document with Patient ID "+name+" has been deleted";  
	 }
}
