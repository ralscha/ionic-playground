package ch.rasc.loginjwt.security;

import java.util.Collection;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserAuthentication implements Authentication {

	private static final long serialVersionUID = 1L;

	private final UserDetails user;
	private boolean authenticated = true;

	public UserAuthentication(UserDetails user) {
		this.user = user;
	}

	@Override
	public String getName() {
		return this.user.getUsername();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.user.getAuthorities();
	}

	@Override
	public Object getCredentials() {
		return this.user.getPassword();
	}

	@Override
	public UserDetails getDetails() {
		return this.user;
	}

	@Override
	public Object getPrincipal() {
		return this.user.getUsername();
	}

	@Override
	public boolean isAuthenticated() {
		return this.authenticated;
	}

	@Override
	public void setAuthenticated(boolean authenticated) {
		this.authenticated = authenticated;
	}
}