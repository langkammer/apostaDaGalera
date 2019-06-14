package br.com.robsonlangkammer.dao;

import br.com.robsonlangkammer.model.VinculosModel;
import br.com.robsonlangkammer.repository.VinculoRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;


@Repository
@Transactional
public class VinculoDao {

    @PersistenceContext
    private EntityManager manager;

    private final VinculoRepository vinculoRepository;

    VinculoDao(VinculoRepository vinculoRepository) {
        this.vinculoRepository = vinculoRepository;
    }

    public VinculosModel getUserByUid(String uid){
        VinculosModel vinculosModel = new VinculosModel();
        if(uid != null){
            try{
                TypedQuery<VinculosModel> query =
                    this.manager.createQuery("select u from VinculosModel u where u.authId = :authId", VinculosModel.class);
                query.setParameter("authId", uid);

                vinculosModel = query.getSingleResult();
            }
            catch (NoResultException nre){
                vinculosModel = null;
            }


        }

        return vinculosModel;
    }

    public VinculosModel salvarVincuo(VinculosModel vinculosModel){

        VinculosModel vinc = this.getUserByUid(vinculosModel.getAuthId());

        if(vinc != null){
            return vinc;
        }
        else{
            return vinculoRepository.save(vinculosModel);
        }
    }


    public List<VinculosModel> listar() {


        List<VinculosModel> lista = new ArrayList<VinculosModel>();

        String stringScript = "";
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


}
