package com.codeball.utils.development;

import com.codeball.utils.ContextUtils;
import com.google.common.collect.Maps;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.security.Principal;
import java.util.Collection;
import java.util.Map;

public class DevelopmentAuthentication implements Authentication, Principal {

    private DevelopmentProperties.User developmentUserProperties;

    public DevelopmentAuthentication(DevelopmentProperties developmentProperties) {
        this.developmentUserProperties = developmentProperties.getUser();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getDetails() {
        Map<String, String> details = Maps.newHashMap();
        details.put(ContextUtils.AUTH_DETAILS_EMAIL, developmentUserProperties.getEmail());
        details.put(ContextUtils.AUTH_DETAILS_GIVEN_NAME, developmentUserProperties.getFirstName());
        details.put(ContextUtils.AUTH_DETAILS_FAMILY_NAME, developmentUserProperties.getLastName());
        details.put(ContextUtils.AUTH_DETAILS_PICTURE, developmentUserProperties.getPictureUrl());
        details.put(ContextUtils.AUTH_DETAILS_ROLE, developmentUserProperties.getRole().name());
        return details;
    }

    @Override
    public Object getPrincipal() {
        return this;
    }

    @Override
    public boolean isAuthenticated() {
        return true;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        // dummy
    }

    @Override
    public String getName() {
        return developmentUserProperties.getEmail();
    }

}
