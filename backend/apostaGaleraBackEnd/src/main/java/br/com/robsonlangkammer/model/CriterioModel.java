package br.com.robsonlangkammer.model;

import br.com.robsonlangkammer.enums.TipoCriterioEnum;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by robson on 12/06/19.
 */
@Entity
public class CriterioModel {

    @Id
    @GeneratedValue
    private Long id;

    private TipoCriterioEnum tipoCriterioEnum;

    private Integer ponto;



}
