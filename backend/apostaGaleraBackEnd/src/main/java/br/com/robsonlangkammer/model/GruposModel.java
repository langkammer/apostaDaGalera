package br.com.robsonlangkammer.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 * Created by robson on 12/06/19.
 */
@Entity
public class GruposModel {


    @Id
    @GeneratedValue
    private Long id;

    private String nome;

    @OneToOne
    private LigasModel ligaModel;

    private String descritivo;

    @OneToOne
    private CriterioModel criterioPrincipal;

    private boolean bonusPorTodosAcertosPrincipal;

    @OneToOne
    private CriterioModel criterioSecundario;

    private boolean criterioSecundarioAcumulaPrincipal;

    private boolean bonusPorTodosAcertosSecundario;


}
