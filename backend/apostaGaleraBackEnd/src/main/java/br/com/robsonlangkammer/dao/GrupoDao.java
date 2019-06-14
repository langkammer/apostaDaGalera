package br.com.robsonlangkammer.dao;

import br.com.robsonlangkammer.model.GruposModel;
import br.com.robsonlangkammer.model.VinculosModel;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;


@Repository
@Transactional
public class GrupoDao {

    @PersistenceContext
    private EntityManager manager;


    public List<GruposModel> listar() {


        List<GruposModel> lista = new ArrayList<GruposModel>();

//
//        if(campoPesquisado != null && pesquisa != null){
//
//            if(campoPesquisado.equals("p.id") || campoPesquisado.equals("p.vendedor.id")){
//                lista = manager.createQuery(
//                    "select distinct(p) from VinculoModel p join fetch p.vendedor where " + campoPesquisado + " = :pesquisa ", Cliente.class)
//                    .setParameter("pesquisa",Long.parseLong(pesquisa))
//                    .getResultList();
//            }
//            else {
//                lista = manager.createQuery(
//                    "select distinct(p) from Cliente p join fetch p.vendedor where  " + campoPesquisado + "  like '%"+pesquisa+"%'", Cliente.class)
//                    .getResultList();
//            }
//
//        }
//        else{
//            lista = manager.createQuery("select distinct(p) from Cliente p join fetch p.vendedor", Cliente.class)
//                .getResultList();
//        }
//

        return lista;
    }


    public VinculosModel getUserByUid(String authId){
        return null;
    }
}
