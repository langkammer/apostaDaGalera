package br.com.robsonlangkammer.controller;

import br.com.robsonlangkammer.bean.EvenlopResponse;
import br.com.robsonlangkammer.model.GruposModel;
import br.com.robsonlangkammer.repository.GrupoRepository;
import br.com.robsonlangkammer.util.ResponseFactory;
import org.springframework.web.bind.annotation.*;


@RestController
public class GrupoController extends ResponseFactory {

    private final GrupoRepository grupoRepository;

    GrupoController(GrupoRepository grupoRepository) {
        this.grupoRepository = grupoRepository;

    }

    @GetMapping(path = "/grupo/list")
    public EvenlopResponse list(){
        try{
            return returnEnvelopSucesso(grupoRepository.findAll(),"Operação Realizada com Sucesso");
        }
        catch (Exception e){
            return returnEnvelopError("Erro ao realizar a Operaçãp " + e.getMessage());

        }
    }

    @PostMapping(path = "/grupo/save")
    public EvenlopResponse save(@RequestBody GruposModel g){
        try{
            return returnEnvelopSucesso(grupoRepository.save(g),"Operação Realizada com Sucesso");
        }
        catch (Exception e){
            return returnEnvelopError("Erro ao realizar a Operaçãp " + e.getMessage());

        }
    }


    @DeleteMapping(path = "/grupo/delete")
    public EvenlopResponse delete(@RequestBody GruposModel g){
        try{
            grupoRepository.delete(g);
            return returnEnvelopSucesso("","Operação Realizada com Sucesso");
        }
        catch (Exception e){
            return returnEnvelopError("Erro ao realizar a Operaçãp " + e.getMessage());

        }
    }

}
