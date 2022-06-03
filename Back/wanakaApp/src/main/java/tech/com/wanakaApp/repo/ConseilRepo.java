package tech.com.wanakaApp.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import tech.com.wanakaApp.model.Conseil;

public interface ConseilRepo extends JpaRepository<Conseil, Long>{

	void deleteConseilById(Long id);

	Optional<Conseil> findConseilById(Long id);
	
	Optional<List<Conseil>> findConseilsBySolutionWanaka(String businessUnit);

}
