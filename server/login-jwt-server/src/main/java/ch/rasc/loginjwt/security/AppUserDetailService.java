package ch.rasc.loginjwt.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import ch.rasc.loginjwt.User;
import ch.rasc.loginjwt.UserService;

@Component
public class AppUserDetailService implements UserDetailsService {

	private final UserService userService;

	public AppUserDetailService(UserService userService) {
		this.userService = userService;
	}

	@Override
	public final UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		final User user = this.userService.lookup(username);
		if (user == null) {
			throw new UsernameNotFoundException("user not found");
		}
		return new AppUserDetails(user);
	}

}