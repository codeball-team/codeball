package com.codeball.config.filter;

import com.codeball.model.User;
import com.codeball.utils.SecurityContextUtils;
import com.google.common.collect.Lists;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Objects;

public abstract class UserSecurityContextFilter implements Filter {

    protected final SecurityContextUtils securityContextUtils;

    public UserSecurityContextFilter(SecurityContextUtils securityContextUtils) {
        this.securityContextUtils = securityContextUtils;
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        if (Objects.nonNull(authentication)) {
            User applicationUser = securityContextUtils.findOrCreateAppUser(authentication);
            UsernamePasswordAuthenticationToken updatedAuthentication = cloneAuthenticationWithAdditionalInfo(authentication, applicationUser);
            securityContext.setAuthentication(updatedAuthentication);
        }

        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken cloneAuthenticationWithAdditionalInfo(Authentication authentication, User applicationUser) {
        ArrayList<SimpleGrantedAuthority> userRoles = Lists.newArrayList(new SimpleGrantedAuthority(applicationUser.getRole().name()));
        UsernamePasswordAuthenticationToken updatedAuthentication = new UsernamePasswordAuthenticationToken(authentication.getPrincipal(), authentication.getCredentials(), userRoles);
        updatedAuthentication.setDetails(provideAuthenticationDetails(authentication));
        return updatedAuthentication;
    }

    protected abstract Object provideAuthenticationDetails(Authentication authentication);

    @Override
    public void destroy() {
    }

}