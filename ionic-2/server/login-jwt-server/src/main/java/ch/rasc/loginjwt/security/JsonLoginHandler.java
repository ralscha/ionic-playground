package ch.rasc.loginjwt.security;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class JsonLoginHandler
		implements AuthenticationSuccessHandler, AuthenticationFailureHandler {
	private final TokenHandler tokenHandler;

	private final ObjectMapper objectMapper;

	public JsonLoginHandler(TokenHandler tokenHandler, ObjectMapper objectMapper) {
		this.tokenHandler = tokenHandler;
		this.objectMapper = objectMapper;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request,
			HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {

		response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setHeader("Access-Control-Max-Age", "3600");
		
		String token = this.tokenHandler
				.createToken(((UserDetails) authentication.getPrincipal()).getUsername());

		@SuppressWarnings("resource")
		PrintWriter writer = response.getWriter();
		writer.print(this.objectMapper
				.writeValueAsString(Collections.singletonMap("id_token", token)));
		writer.flush();
	}

	@Override
	public void onAuthenticationFailure(HttpServletRequest request,
			HttpServletResponse response, AuthenticationException exception)
			throws IOException, ServletException {
		response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setHeader("Access-Control-Max-Age", "3600");

		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Access Denied");
	}

}