package net.javaguides.springboot.controller;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AfterDomainEventPublication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.QuerySnapshot;

import net.javaguides.springboot.account.StoryPojo;
import net.javaguides.springboot.service.storyservice;

@RestController
public class StoryController {
	@Autowired
	storyservice storyservice;
	String newStoryname;
	@PostMapping("/createStory")  
	 public void createStory() throws InterruptedException, ExecutionException {  
	 storyservice.newStory(newStoryname);  
	 }
	@PostMapping("/initStoryPojo")  
	 public void initStoryPojo(@RequestBody StoryPojo storyPojo ) throws InterruptedException, ExecutionException {  
	newStoryname = storyPojo.getStory();
	 storyservice.setStoryPojo(storyPojo);  
	 }
	@PutMapping("/writeStory")
	public String typethestory(@RequestBody String storycontent) throws InterruptedException, ExecutionException {
		return storyservice.typeIntoStory(storycontent);
	}
	@GetMapping("/mapUserStories")
	public ArrayList<String> userStories(String s) throws InterruptedException, ExecutionException{
		return storyservice.mapAllStories(s);
	}
	@GetMapping("/getStory")
	public String getStory(String s) throws InterruptedException, ExecutionException {
		return storyservice.getStory(s);
	}
	@DeleteMapping("/deleteStory")
	public String deleteStory(String s) {
		return storyservice.deleteStory(s);
	}
}
