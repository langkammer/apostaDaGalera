package br.com.robsonlangkammer.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 * Created by robson on 12/06/19.
 */
@Entity
public class ApostasModel {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private MembroGruposModel membro;

    @OneToOne
    private PartidaModel partidaModel;

    private Integer apostaMandante;

    private Integer apostaVisitante;

    @OneToOne
    private TimeFutebolModel vencedor;

}
