package com.portfolio.api.repository;

import com.portfolio.api.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {
    List<ProjectEntity> findAllByOrderBySortOrderAscIdAsc();

    Optional<ProjectEntity> findBySlug(String slug);

    boolean existsBySlug(String slug);
}
