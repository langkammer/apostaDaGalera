package br.com.robsonlangkammer.bean;

import br.com.robsonlangkammer.enums.StatusResponseEnum;
import com.fasterxml.jackson.annotation.JsonInclude;

public class EvenlopResponse {


    private final StatusResponseEnum status;

    private String menssage;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Object data;

    public EvenlopResponse(StatusResponseEnum status, String menssage, Object data) {
        this.status = status;
        this.menssage = menssage;
        this.data = data;
    }

    public EvenlopResponse(StatusResponseEnum status, String menssage) {
        this.status = status;
        this.menssage = menssage;
    }

    public StatusResponseEnum getStatus() {
        return status;
    }

    public String getMenssage() {
        return menssage;
    }

    public void setMenssage(String menssage) {
        this.menssage = menssage;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
