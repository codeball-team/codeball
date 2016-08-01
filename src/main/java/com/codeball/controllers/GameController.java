package com.codeball.controllers;

import com.codeball.exceptions.EnrollmentOverException;
import com.codeball.model.requests.GameScoreRequest;
import com.codeball.utils.ContextUtils;
import com.codeball.exceptions.GameOverException;
import com.codeball.model.EnrollmentStatus;
import com.codeball.model.Game;
import com.codeball.model.TeamAssignment;
import com.codeball.model.User;
import com.codeball.repositories.GameRepository;
import com.codeball.repositories.UserRepository;
import com.codeball.services.teams.TeamAssigner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping(value = "/api/game", produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeamAssigner teamAssigner;

    @Autowired
    private ContextUtils contextUtils;

    @RequestMapping(value = "/last", method = RequestMethod.GET)
    public Game getLastGame() {
        return gameRepository.findLastGame();
    }

    @RequestMapping(value = "/upcoming", method = RequestMethod.GET)
    public Game getUpcomingGame() {
        return gameRepository.findUpcomingGame();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Game getGameById(@PathVariable long id) {
        return gameRepository.findOne(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Game> getGames() {
        return gameRepository.findAll(new Sort(Sort.Direction.DESC, "startTimestamp"));
    }

    @Deprecated
    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Game deprecatedSetEnrollmentStatus(Principal principal, @PathVariable("id") long gameId, @RequestBody EnrollmentStatus status) {
        return setEnrollmentStatus(principal, gameId, status);
    }

    @Transactional
    @RequestMapping(value = "/{id}/enrollment", method = RequestMethod.PUT)
    public Game setEnrollmentStatus(Principal principal, @PathVariable("id") long gameId, @RequestBody EnrollmentStatus status) {
        User currentUser = contextUtils.getUser(principal);
        return setEnrollmentStatus(principal, gameId, currentUser.getId(), status);
    }

    @Transactional
    @RequestMapping(value = "/{id}/enrollment/{userId}", method = RequestMethod.PUT)
    public Game setEnrollmentStatus(Principal principal, @PathVariable("id") long gameId, @PathVariable("userId") long userId, @RequestBody EnrollmentStatus status) {
        User currentUser = contextUtils.getUser(principal);
        User userToEnroll = userRepository.findOne(userId);
        Game game = gameRepository.findOne(gameId);
        if (game.isEnrollmentOver()) {
            throw new EnrollmentOverException(gameId);
        }
        game.enrollUser(userToEnroll, status, currentUser);
        return game;
    }

    @RequestMapping(value = "/{id}/team", method = RequestMethod.PUT)
    public Game drawTeams(@PathVariable("id") long gameId) {
        Game game = gameRepository.findOne(gameId);
        drawTeams(game);
        return gameRepository.save(game);
    }

    @RequestMapping(value = "/{id}/finishEnrollment", method = RequestMethod.PUT)
    public Game finishEnrollment(@PathVariable("id") long gameId) {
        Game game = gameRepository.findOne(gameId);
        game.setEnrollmentOver(true);
        drawTeams(game);
        return gameRepository.save(game);
    }

    @RequestMapping(value = "/{id}/score", method = RequestMethod.PUT)
    public Game setGameScore(@PathVariable("id") long gameId, @RequestBody GameScoreRequest gameScoreRequest) {
        Game game = gameRepository.findOne(gameId);
        game.setScore(gameScoreRequest.getTeamAScore(), gameScoreRequest.getTeamBScore());
        return gameRepository.save(game);
    }

    private void drawTeams(Game game) {
        if (game.isGameOver()) {
            throw new GameOverException(game.getId());
        }
        TeamAssignment teamAssignment = teamAssigner.assignTeams(game.getEnrolledUsers());
        game.assignTeams(teamAssignment);
    }

}
