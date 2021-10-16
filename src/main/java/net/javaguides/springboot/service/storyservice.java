package net.javaguides.springboot.service;

import java.io.Console;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.function.ServerResponse.SseBuilder;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

import io.grpc.alts.internal.TsiFrameProtector.Consumer;
import net.javaguides.springboot.account.AccountObject;
import net.javaguides.springboot.account.StoryPojo;

@Service
public class storyservice {
	public static final String test="Stories"; 
	 public AccountObject accountObject;
	 public StoryPojo storyPojo;
	 public String currentstoryname;
	 public void setAO(AccountObject accountObject) {
		 this.accountObject=accountObject;
	 }
	 public void setStoryPojo(StoryPojo storyPojo) {
		 this.storyPojo=storyPojo;
	 }
	 public String newStory(String storyname) throws InterruptedException, ExecutionException {  
		 Firestore dbFirestore = FirestoreClient.getFirestore();
		 DocumentReference documentReference = dbFirestore.collection(serviceimpl.COL_NAME).document(accountObject.getUsername());  
		 ApiFuture<DocumentSnapshot> future = documentReference.get();  
		 DocumentSnapshot document = future.get();
		 //if(document.exists()) return "Can't make story of the same name.";
		 ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(serviceimpl.COL_NAME).document(accountObject.getUsername()).collection(test).document(storyname).set(storyPojo);
		 return collectionsApiFuture.get().getUpdateTime().toString();  
		 }  
	 public ArrayList<String> mapAllStories(String name) throws InterruptedException, ExecutionException {  
		 Firestore dbFirestore = FirestoreClient.getFirestore();  
		 ApiFuture<QuerySnapshot> future = dbFirestore.collection(serviceimpl.COL_NAME).document(accountObject.getUsername()).collection(test).get();  
		 ArrayList<String> ss = new ArrayList();
		 List<QueryDocumentSnapshot> documents = future.get().getDocuments();
		 for (QueryDocumentSnapshot document : documents) {
		   ss.add(document.getId());
		   System.out.println(document.getId());
		 }
		 return ss;
		 }  
	 public String getStory(String storyname) throws InterruptedException, ExecutionException {  
		 Firestore dbFirestore = FirestoreClient.getFirestore();
		 ApiFuture<DocumentSnapshot> collectionsApiFuture = dbFirestore.collection(serviceimpl.COL_NAME).document(accountObject.getUsername()).collection(test).document(storyname).get();
		 currentstoryname = storyname;
		 return collectionsApiFuture.get().getString("storycontent").toString();   
		 }  
		 public String typeIntoStory(String writing) throws InterruptedException, ExecutionException {  
		 Firestore dbFirestore = FirestoreClient.getFirestore();  
		 ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(serviceimpl.COL_NAME).document(accountObject.getUsername()).collection(test).document(currentstoryname).update("storycontent", writing);
		 return collectionsApiFuture.get().toString();  
		 }  
		 public String deleteStory(String name) {  
		 Firestore dbFirestore = FirestoreClient.getFirestore(); 
		 System.out.println(name);
		 ApiFuture<WriteResult> writeResult = dbFirestore.collection(serviceimpl.COL_NAME).document(accountObject.getUsername()).collection(test).document(name).delete();  
		 return name+" has been deleted";  
		 }
}
