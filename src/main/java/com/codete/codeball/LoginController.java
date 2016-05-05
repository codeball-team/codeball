package com.codete.codeball;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/test")
public class LoginController {

    @RequestMapping("/")
    public String hello() {
        return "Hello!";
    }

    @RequestMapping("/janusz")
    public Principal janusz(Principal principal) {
        return principal;
    }

    @RequestMapping("login")
    public String login() {
        return "You are logged in!";
    }

}
