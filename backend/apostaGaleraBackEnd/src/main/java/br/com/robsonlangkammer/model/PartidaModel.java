package br.com.robsonlangkammer.model;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by robson on 12/06/19.
 */
@Entity
public class PartidaModel {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private LigasModel liga;

    private Long numRodada;

    @OneToOne
    private TimeFutebolModel visitante;

    @OneToOne
    private TimeFutebolModel mandante;

    private Date data;

    private Integer resultadoFinalVisitante;

    private Integer resultadoFinalMandante;


}
