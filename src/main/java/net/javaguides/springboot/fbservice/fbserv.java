package net.javaguides.springboot.fbservice;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Service
public class fbserv {
	@PostConstruct
	public void initialize() throws IOException {
		FileInputStream serviceAccount;
			serviceAccount = new FileInputStream("./writing-22032-firebase-adminsdk-orekw-34dff13a57.json");
				FirebaseOptions options = new FirebaseOptions.Builder()
				  .setCredentials(GoogleCredentials.fromStream(serviceAccount))
				  .setDatabaseUrl("https://writing-22032-default-rtdb.firebaseio.com")
				  .build();

				FirebaseApp.initializeApp(options);
	}
}
