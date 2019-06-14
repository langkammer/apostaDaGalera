package br.com.robsonlangkammer.repository;


import br.com.robsonlangkammer.model.VinculosModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VinculoRepository extends JpaRepository<VinculosModel, Long> {
}
