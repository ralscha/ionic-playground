package ch.rasc.loginjwt.security;

import java.util.Base64;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import ch.rasc.loginjwt.AppConfig;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public final class TokenHandler {
	private final static String BEARER_PREFIX = "Bearer ";

	private final String secret;
	private final UserDetailsService userService;

	public TokenHandler(AppConfig config, UserDetailsService userService) {
		this.secret = Base64.getEncoder().encodeToString(config.getSecret().getBytes());
		this.userService = userService;
	}

	public String createToken(String username) {
		return createTokenForUser(username);
	}

	public Authentication getAuthentication(HttpServletRequest request) {
		final String token = request.getHeader("Authorization");
		if (token != null) {
			final UserDetails user = parseUserFromToken(token);
			if (user != null) {
				return new UserAuthentication(user);
			}
		}
		return null;
	}

	private UserDetails parseUserFromToken(String token) {

		if (!token.startsWith(BEARER_PREFIX)) {
			return null;
		}

		String username = Jwts.parser().setSigningKey(this.secret)
				.parseClaimsJws(token.substring(BEARER_PREFIX.length())).getBody()
				.getSubject();
		return this.userService.loadUserByUsername(username);
	}

	private String createTokenForUser(String username) {
		Date now = new Date();
		Date expiration = new Date(now.getTime() + TimeUnit.HOURS.toMillis(1l));
		return Jwts.builder().setId(UUID.randomUUID().toString()).setSubject(username)
				.setIssuedAt(now).setExpiration(expiration)
				.signWith(SignatureAlgorithm.HS512, this.secret).compact();
	}
}