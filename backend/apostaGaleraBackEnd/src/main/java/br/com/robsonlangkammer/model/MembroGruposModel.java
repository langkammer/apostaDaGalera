package br.com.robsonlangkammer.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.util.Date;

/**
 * Created by robson on 12/06/19.
 */
@Entity
public class MembroGruposModel {


    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private VinculosModel vinculo;

    @OneToOne
    private GruposModel grupo;

    private Date dataEntrada;



}
