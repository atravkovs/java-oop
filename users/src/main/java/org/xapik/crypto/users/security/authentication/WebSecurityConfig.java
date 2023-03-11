package org.xapik.crypto.users.security.authentication;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Slf4j
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {

  private final JwtRequestFilter jwtRequestFilter;
  private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

  @Autowired
  public WebSecurityConfig(
      JwtRequestFilter jwtRequestFilter,
      JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint
  ) {
    this.jwtRequestFilter = jwtRequestFilter;
    this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
    httpSecurity.cors().disable().csrf().disable()
        .authorizeRequests().antMatchers("/authenticate", "/register").permitAll()
        .anyRequest().authenticated().and()
        .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

    return httpSecurity.build();
  }

}
