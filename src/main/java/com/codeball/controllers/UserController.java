package com.codeball.controllers;

import com.codeball.exceptions.GameNotFoundException;
import com.codeball.model.User;
import com.codeball.services.UserService;
import com.codeball.utils.SecurityContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class UserController {

    @Autowired
    private SecurityContextUtils securityContextUtils;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/me", method = RequestMethod.GET)
    public User getCurrentUser() {
        return securityContextUtils.getCurrentUser();
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<User> listUsers() {
        return userService.listUsers();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public User getUserById(@PathVariable long id) {
        return userService.findUserById(id).orElseThrow(() -> new GameNotFoundException(id));
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public User createUser(@Valid @RequestBody User user) {
        if (user.hasRoleUser()) {
            return userService.createNormalUser(user);
        } else {
            return userService.createAnyUser(user);
        }
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public User updateUser(@PathVariable long id, @Valid @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable long id) {
        userService.deleteUser(id);
    }

}
