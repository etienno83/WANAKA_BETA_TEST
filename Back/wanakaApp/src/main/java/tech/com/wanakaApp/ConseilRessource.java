package tech.com.wanakaApp;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tech.com.wanakaApp.model.Conseil;
import tech.com.wanakaApp.service.ConseilService;

@RestController
@RequestMapping("/conseil")
public class ConseilRessource {
	
	private final ConseilService conseilService;

	public ConseilRessource(ConseilService conseilService) {
		this.conseilService = conseilService;
	}

	@GetMapping("/all")
	public ResponseEntity<List<Conseil>> getAllConseils(){
		List<Conseil> conseils = conseilService.findAllConseils();
		return new ResponseEntity<>(conseils, HttpStatus.OK);
	}
	
	@GetMapping("/find/{id}")
	public ResponseEntity<Conseil> getConseilById(@PathVariable("id") Long id){
		Conseil conseil = conseilService.findConseilById(id);
		return new ResponseEntity<>(conseil, HttpStatus.OK);
	}
	
	@GetMapping("/get/{solutionWanaka}")
	public ResponseEntity<List<Conseil>> getConseilsBySolutionWanaka(@PathVariable("solutionWanaka") String solutionWanaka){
		List<Conseil> conseils = conseilService.findConseilsBySolutionWanaka(solutionWanaka);
		return new ResponseEntity<>(conseils, HttpStatus.OK);
	}
	
	@GetMapping("/solutionsWanaka")
	public ResponseEntity<List<String>> getAllBySolutionsWanaka(){
		List<String> solutionsWanaka = conseilService.findAllSolutionWanaka();
		return new ResponseEntity<>(solutionsWanaka, HttpStatus.OK);
	}
	
	@PostMapping("/add")
	public ResponseEntity<Conseil> addConseil(@RequestBody Conseil conseil){
		Conseil newConseil = conseilService.addConseil(conseil);
		return new ResponseEntity<>(newConseil, HttpStatus.CREATED);
	}
	
	@PutMapping("/update")
	public ResponseEntity<Conseil> updateConseil(@RequestBody Conseil conseil){
		Conseil updateConseil = conseilService.updateConseil(conseil);
		return new ResponseEntity<>(updateConseil, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteConseil(@PathVariable("id") Long id){
		conseilService.deleteConseil(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
