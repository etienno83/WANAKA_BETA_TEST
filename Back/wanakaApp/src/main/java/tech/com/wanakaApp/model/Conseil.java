package tech.com.wanakaApp.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Conseil implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(nullable = false, updatable = false)
	private Long id;
	
	private String nomDuConseil;

	private String solutionWanaka;
	
	private String details;

	private String imageUrl;
	
	public Conseil() {
		super();
	}

	public Conseil(Long id, String nomDuConseil, String solutionWanaka, String details, String imageUrl) {
		super();
		this.id = id;
		this.nomDuConseil = nomDuConseil;
		this.solutionWanaka = solutionWanaka;
		this.details = details;
		this.imageUrl = imageUrl;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNomDuConseil() {
		return nomDuConseil;
	}

	public void setNomDuConseil(String nomDuConseil) {
		this.nomDuConseil = nomDuConseil;
	}

	public String getSolutionWanaka() {
		return solutionWanaka;
	}

	public void setSolutionWanaka(String solutionWanaka) {
		this.solutionWanaka = solutionWanaka;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	@Override
	public String toString() {
		return "Conseil [id=" + id + ", nomDuConseil=" + nomDuConseil + ", solutionWanaka=" + solutionWanaka
				+ ", details=" + details + ", imageUrl=" + imageUrl + "]";
	}
	
	
	
}