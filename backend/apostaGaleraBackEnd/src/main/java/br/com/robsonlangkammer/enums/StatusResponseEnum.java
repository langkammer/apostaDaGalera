package br.com.robsonlangkammer.enums;

public enum StatusResponseEnum {


    SUCESSO("s"),
    ERRO("e"),
    WARNING("w");

    private final String valor;

    StatusResponseEnum(String valor) {

        this.valor = valor;

    }

    public String getValor() {

        return valor;

    }
}
