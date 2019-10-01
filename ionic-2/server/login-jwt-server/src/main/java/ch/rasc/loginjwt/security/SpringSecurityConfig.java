package ch.rasc.loginjwt.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private JsonLoginHandler jsonLoginHandler;

	@Autowired
	private TokenHandler tokenHandler;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		  .csrf()
		      .disable()
		  .cors()
		      .and()
		  .sessionManagement()
		      .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		      .and()
		  .authorizeRequests()
			  .antMatchers("/quote").permitAll()
			  .antMatchers("/signup").permitAll()
			  .anyRequest().authenticated()
			  .and()
		  .formLogin()
              .successHandler(this.jsonLoginHandler)
              .failureHandler(this.jsonLoginHandler)
		      .permitAll()
		      .and()
		  //.logout()
          //    .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler())
		  //    .permitAll()
		  //    .and()
		  .exceptionHandling()
              .authenticationEntryPoint(new Http401UnauthorizedEntryPoint())
              .and()

		  .addFilterBefore(new StatelessAuthenticationFilter(this.tokenHandler),
				           UsernamePasswordAuthenticationFilter.class);
	}


}