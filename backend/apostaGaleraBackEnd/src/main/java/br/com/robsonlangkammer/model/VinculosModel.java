package br.com.robsonlangkammer.model;

import javax.persistence.*;

@Entity
@Table(name="vinculos")
public class VinculosModel {


    @Id
    @GeneratedValue
    private Long id;

    private String nome;

    private String email;

    private String authId;

    private boolean permissaoAdmin;

    public VinculosModel(){

    }

    public VinculosModel(String nome, String email, String authId, boolean permissaoAdmin) {
        this.nome = nome;
        this.email = email;
        this.authId = authId;
        this.permissaoAdmin = permissaoAdmin;
    }

    public boolean isPermissaoAdmin() {
        return permissaoAdmin;
    }

    public void setPermissaoAdmin(boolean permissaoAdmin) {
        this.permissaoAdmin = permissaoAdmin;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAuthId() {
        return authId;
    }

    public void setAuthId(String authId) {
        this.authId = authId;
    }
}
