package ch.rasc.loginjwt;

import java.io.Serializable;

public class User implements Serializable {

	private static final long serialVersionUID = 1L;

	private String username;

	private String password;

	public User() {
		// default constructor
	}

	public User(String username, String password) {
		this.username = username;
		this.password = password;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
