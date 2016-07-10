package ch.rasc.loginjwt;

import java.util.Collections;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ch.rasc.loginjwt.security.TokenHandler;

@RestController
public class SignupController {

	private final UserService userService;

	private final TokenHandler tokenHandler;

	public SignupController(UserService userService, TokenHandler tokenHandler) {
		this.userService = userService;
		this.tokenHandler = tokenHandler;
	}

	@CrossOrigin
	@PostMapping("signup")
	public Map<String, String> signup(@RequestBody SignupRequest request) {
		User newUser = new User(request.username(), request.password());
		this.userService.save(newUser);

		String token = this.tokenHandler.createToken(newUser.getUsername());
		return Collections.singletonMap("id_token", token);
	}

}
