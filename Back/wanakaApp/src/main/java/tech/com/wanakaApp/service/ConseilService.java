package tech.com.wanakaApp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import tech.com.wanakaApp.exception.UserNotFoundException;
import tech.com.wanakaApp.exception.UsersNotFoundException;
import tech.com.wanakaApp.model.Conseil;
import tech.com.wanakaApp.repo.ConseilRepo;

@Service
@Transactional
public class ConseilService {

	private final ConseilRepo conseilRepo;

	@Autowired
	public ConseilService(ConseilRepo conseilRepo) {
		this.conseilRepo = conseilRepo;
	}
	
	public Conseil addConseil (Conseil conseil) {
		return conseilRepo.save(conseil);
	}

	public List<Conseil> findAllConseils(){
		return conseilRepo.findAll();
	}
	
	public Conseil updateConseil(Conseil conseil) {
		return conseilRepo.save(conseil);
	}
	
	public Conseil findConseilById(Long id) {
		return conseilRepo.findConseilById(id)
				.orElseThrow(() -> new UserNotFoundException("User by id" + id + "was not found"));
	}
	
	public List<Conseil> findConseilsBySolutionWanaka(String solutionWanaka) {
		return conseilRepo.findConseilsBySolutionWanaka(solutionWanaka)
				.orElseThrow(() -> new UsersNotFoundException("Users by id" + solutionWanaka + "were not found"));
	}
	
	public List<String> findAllSolutionWanaka(){
		List<Conseil> conseils = conseilRepo.findAll();
		List<String> solutionsWanaka = new ArrayList<String>();
		for (Conseil conseil : conseils) {
			String solutionWanaka = conseil.getSolutionWanaka(); 
			solutionsWanaka.add(solutionWanaka);
			}
		return solutionsWanaka.stream().distinct().collect(Collectors.toList());
	}

	public void deleteConseil(Long id) {
		conseilRepo.deleteConseilById(id);
	}

	
}
