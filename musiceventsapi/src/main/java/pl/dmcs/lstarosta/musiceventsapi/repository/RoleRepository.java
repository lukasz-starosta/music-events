package pl.dmcs.lstarosta.musiceventsapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dmcs.lstarosta.musiceventsapi.entity.RoleEntity;
import pl.dmcs.lstarosta.musiceventsapi.enums.RoleEnum;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    Optional<RoleEntity> findByName(RoleEnum role);
}
