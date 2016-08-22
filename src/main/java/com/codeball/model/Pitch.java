package com.codeball.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Tolerate;

import javax.persistence.*;

@Data
@Builder
@Entity
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Pitch {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String address;
    @Enumerated(EnumType.STRING)
    private PitchType pitchType;
    private int minNumberOfPlayers;
    private int maxNumberOfPlayers;

    @Tolerate
    private Pitch() {
    }

}