package br.com.robsonlangkammer.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by robson on 12/06/19.
 */
@Entity
public class EstadioModel {

    @Id
    @GeneratedValue
    private Long id;

    private String nomeEstadio;

}