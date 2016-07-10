package ch.rasc.loginjwt;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PostConstruct;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	private final Map<String, User> db;

	private final PasswordEncoder passwordEncoder;

	public UserService(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
		this.db = new ConcurrentHashMap<>();
	}

	public User lookup(String username) {
		return this.db.get(username);
	}

	public void save(User user) {
		this.db.put(user.getUsername(), user);
	}

	@PostConstruct
	public void dataLoad() {
		this.db.put("admin", new User("admin", this.passwordEncoder.encode("admin")));
	}

}
