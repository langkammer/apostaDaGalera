package br.com.robsonlangkammer.controller;

import br.com.robsonlangkammer.bean.EvenlopResponse;
import br.com.robsonlangkammer.dao.VinculoDao;
import br.com.robsonlangkammer.model.VinculosModel;
import br.com.robsonlangkammer.repository.VinculoRepository;
import br.com.robsonlangkammer.util.ResponseFactory;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@CrossOrigin("*")
public class VinculoController extends ResponseFactory {

    private final VinculoRepository vinculoRepository;

    private final VinculoDao vinculoDao;

    VinculoController(VinculoRepository vinculoRepository,VinculoDao vinculoDao) {
        this.vinculoRepository = vinculoRepository;
        this.vinculoDao = vinculoDao;

    }

    @GetMapping(path = "user/list")
    public EvenlopResponse list(){
        try{
            return returnEnvelopSucesso(vinculoDao.listar(),"Operação Realizada com Sucesso");
        }
        catch (Exception e){
            return returnEnvelopError("Erro ao realizar a Operaçãp " + e.getMessage());

        }
    }



    @PostMapping(path = "user/create")
    public EvenlopResponse create(@Valid @RequestBody VinculosModel vinculo){
        try{
            vinculo.setPermissaoAdmin(false);
            return returnEnvelopSucesso(vinculoDao.salvarVincuo(vinculo),"Operação Realizada com sucesso!");
        }
        catch (Exception e){
            return returnEnvelopError("Erro ao realizar a operacao " + e.getMessage());

        }

    }

    @PostMapping(path = "user/getUserByAuthID")
    public EvenlopResponse getUserByAuthID(@RequestBody String uid){
        try{
            return returnEnvelopSucesso(vinculoDao.getUserByUid(uid),"Operação Realizada com sucesso!");
        }
        catch (Exception e){
            return returnEnvelopError("Erro ao realizar a operacao " + e.getMessage());

        }

    }





}
