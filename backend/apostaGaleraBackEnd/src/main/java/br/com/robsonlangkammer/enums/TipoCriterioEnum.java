package br.com.robsonlangkammer.enums;

public enum TipoCriterioEnum {


    PLACAR("P"),
    RESULTADO("R");

    private final String valor;

    TipoCriterioEnum(String valor) {

        this.valor = valor;

    }

    public String getValor() {

        return valor;

    }
}
