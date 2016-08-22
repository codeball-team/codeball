package com.codeball.controllers;

import com.codeball.model.EnrollmentStatus;
import com.codeball.model.Game;
import com.codeball.model.requests.GameScoreRequest;
import com.codeball.services.GameService;
import com.codeball.utils.SecurityContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/game", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class GameController {

    @Autowired
    private GameService gameService;

    @Autowired
    private SecurityContextUtils securityContextUtils;

    @RequestMapping(value = "/{gameId}", method = RequestMethod.GET)
    public Game getGameById(@PathVariable long gameId) {
        return gameService.getGameById(gameId);
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Game> getGames() {
        return gameService.getSortedGames();
    }

    @RequestMapping(value = "/last", method = RequestMethod.GET)
    public Game getLastGame() {
        return gameService.getLastGame();
    }

    @RequestMapping(value = "/upcoming", method = RequestMethod.GET)
    public Game getUpcomingGame() {
        return gameService.getUpcomingGame();
    }

    @Transactional
    @RequestMapping(value = "/{gameId}/enrollment", method = RequestMethod.PUT)
    public Game setEnrollmentStatus(@PathVariable("gameId") long gameId, @RequestBody EnrollmentStatus status) {
        return gameService.setEnrollmentStatus(gameId, securityContextUtils.getCurrentUserId(), status);
    }

    @Transactional
    @RequestMapping(value = "/{gameId}/enrollment/{userId}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Game setEnrollmentStatus(@PathVariable("gameId") long gameId, @PathVariable("userId") long userId, @RequestBody EnrollmentStatus status) {
        return gameService.setEnrollmentStatus(gameId, userId, status);
    }

    @RequestMapping(value = "/{gameId}/finishEnrollment", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Game finishEnrollment(@PathVariable("gameId") long gameId) {
        return gameService.finishEnrollment(gameId);
    }

    @RequestMapping(value = "/{gameId}/team", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Game drawTeams(@PathVariable("gameId") long gameId) {
        return gameService.drawTeams(gameId);
    }

    @RequestMapping(value = "/{gameId}/score", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Game setGameScore(@PathVariable("gameId") long gameId, @RequestBody GameScoreRequest gameScoreRequest) {
        return gameService.updateGameScore(gameId, gameScoreRequest.getTeamAScore(), gameScoreRequest.getTeamBScore());
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Game createGame(@RequestBody Game game) {
        return gameService.createGame(game);
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/{gameId}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Game updateGame(@PathVariable long gameId, @RequestBody Game game) {
        return gameService.updateGame(gameId, game);
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/{gameId}/end", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Game endGame(@PathVariable long gameId) {
        return gameService.endGame(gameId);
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(value = "/{gameId}", method = RequestMethod.DELETE)
    public void deleteGame(@PathVariable long gameId) {
        gameService.deleteGame(gameId);
    }

}
